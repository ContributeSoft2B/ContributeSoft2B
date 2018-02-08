using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using ContributeComponents.Helper;
using Newtonsoft.Json;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using System.Net.Mail;
using System.Threading;
using System.IO;

namespace Contribute.Controllers
{
    public static class Bot
    {

        public static readonly TelegramBotClient Api = new TelegramBotClient(ConfigurationManager.AppSettings["token"]);
    }
    public class HomeController : Controller
    {
        protected override void OnException(ExceptionContext filterContext)
        {
            string error = Utils.GetRandomString("0123456789", 6);
            Session["errorcode"] = error;
            var context = filterContext.HttpContext;
            string data = "";
            if (context.Request.Form != null && context.Request.Form.Count > 0)
            {
                data = JsonConvert.SerializeObject(context.Request.Form);
            }
            string msg = String.Format(@"{0}
URL:{1}
REFER:{2}
USER:{3}max_connections
DATA:{4}
{5}", error,
                context.Request.Url.ToString(),
                context.Request.UrlReferrer != null ? filterContext.HttpContext.Request.UrlReferrer.ToString() : "NULL",
                context.User.Identity.IsAuthenticated ? context.User.Identity.Name : "NOT AUTH",
                data,
                Utils.ExceptionToString(filterContext.Exception));
            //发送错误日志Email
            Utils.SendErrorLogEmail(context, error, msg);
            base.OnException(filterContext);
        }
        public ActionResult Index()
        {
            return Redirect("/index.html");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        public static Queue<Update> updateQueue = new Queue<Update>();
        [HttpPost]
        public async Task<ActionResult> Post(Update update)
        {

            var req = Request.InputStream;
            req.Seek(0, SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();
            var updates = JsonConvert.DeserializeObject<Update>(json);
            //updateQueue.Enqueue(updates);//请求加入队列，然后循环回复，防止并发
            //foreach (var item in updateQueue)
            //{
            var message = updates.Message;
            string url = string.Empty;
            if (message.Chat.Id == -1001255211695)
            {
                url = $"https://www.soft2b.com/telegram/KroeaVerification?verificationCode=";
            }
            else
            {
                url = $"https://www.soft2b.com/telegram/Verification?verificationCode=";
            }
            if (message.Type == MessageType.TextMessage && message.Text.Contains("https://") &&
                !message.Text.Contains("soft2b"))
            {
                await Bot.Api.DeleteMessageAsync(message.Chat.Id, message.MessageId);
            }
            if (message.Type == MessageType.TextMessage && message.Text.StartsWith("/code"))
            {
                url = $"{url}{message.Text}";
                // Echo each Message
                using (WebClient client = new WebClient())
                {
                    client.Encoding = Encoding.UTF8;
                    var resultJson = client.DownloadString(url);
                    var result = new { Success = false, Msg = string.Empty, InviteUrl = string.Empty };
                    result = JsonConvert.DeserializeAnonymousType(resultJson, result);
                    if (result.Success == true)
                    {
                        await Bot.Api.SendTextMessageAsync(message.Chat.Id, result.Msg, ParseMode.Default, false,
                            false, message.MessageId);
                    }
                    else
                    {
                        await Bot.Api.SendTextMessageAsync(message.Chat.Id, result.Msg, ParseMode.Default, false,
                            false, message.MessageId);
                    }

                }
            }
            //}

            return Json(new { result = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login");
        }
        [HttpPost]
        public ActionResult Login(string returnUrl, string name, string password)
        {
            if (String.IsNullOrEmpty(returnUrl))
            {
                returnUrl = "/";
            }
            string pwdHash = CryptoHelper.Md5(password);
            if (name.Trim() == "ezong" && password.Trim() == "ezong@)!*")
            {

                string roles = "admin";
                FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1, name, Utils.ToLocalTime(DateTime.UtcNow), Utils.ToLocalTime(DateTime.UtcNow.AddDays(7)), false, roles, "/");
                //加密序列化验证票为字符串
                string hashTicket = FormsAuthentication.Encrypt(ticket);
                HttpCookie userCookie = new HttpCookie(FormsAuthentication.FormsCookieName, hashTicket);
                Response.Cookies.Add(userCookie);
                return Redirect(returnUrl);
            }

            return View((object)"用户名或密码不正确");
        }

    }
}