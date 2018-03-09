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
using log4net;

namespace Contribute.Controllers
{
    public static class Bot
    {

        public static readonly TelegramBotClient Api = new TelegramBotClient(ConfigurationManager.AppSettings["token"]);
    }
    public class HomeController : Controller
    {
        protected static ILog logger = LogManager.GetLogger(typeof(HomeController));
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
            //记录错误日志Email
            logger.Debug(msg);
            base.OnException(filterContext);
        }
        public ActionResult Index()
        {
            logger.Debug("访问首页");
            return Redirect("/index.html");
        }

        public ActionResult About()
        {
            logger.Debug("访问关于我们");
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
        public async Task<ActionResult> Telegram(Update update)
        {

            var req = Request.InputStream;

            req.Seek(0, SeekOrigin.Begin);
            string json = new StreamReader(req).ReadToEnd();
            logger.Debug($"接收到的消息:{json}");
            var updates = JsonConvert.DeserializeObject<Update>(json);
            var message = updates.Message;

            logger.Debug($"消息发送时间：{message.Date.ToString()}");
            logger.Debug($"当前时间：{DateTime.Now.ToString()}");
            //只处理30分钟内的消息
            if (message.Date.AddMinutes(30) < DateTime.Now)
            {
                logger.Debug($"消息{message.MessageId}已过期！~");
                return new HttpStatusCodeResult(200, "已处理");
            }
            string url = string.Empty;
            if (message.Chat.Id == -1001221163930)
            {
                url = $"https://www.soft2b.com/telegram/KroeaVerification?verificationCode=";
            }
            else
            {
                url = $"https://www.soft2b.com/telegram/Verification?verificationCode=";
            }
            if (message.From.Username == "liuhao_blockchain" || message.From.FirstName.Contains("STB") || message.From.Id == 496472712)
            {
                logger.Debug($"管理员消息{message.MessageId}处理完毕！~");
                return new HttpStatusCodeResult(200, "已处理");
            }
            if (message.Type == MessageType.TextMessage && message.Text.Contains("http") &&
                !message.Text.Contains("soft2b"))
            {
                var deleteMessageResult = await Bot.Api.DeleteMessageAsync(message.Chat.Id, message.MessageId);
                if (!deleteMessageResult)
                {
                    logger.Debug($"消息{message.MessageId}不存在，删除失败！~");
                    return new HttpStatusCodeResult(200, "删除失败");
                }
                logger.Debug($"消息{message.MessageId}删除成功！~");
                return new HttpStatusCodeResult(200, "删除成功");
            }
            if (message.Type == MessageType.TextMessage && message.Text.Contains("www") &&
                !message.Text.Contains("soft2b"))
            {

                var deleteMessageResult = await Bot.Api.DeleteMessageAsync(message.Chat.Id, message.MessageId);
                if (!deleteMessageResult)
                {
                    logger.Debug($"消息{message.MessageId}不存在，删除失败！~");
                    return new HttpStatusCodeResult(200, "删除失败");
                }
                logger.Debug($"消息{message.MessageId}删除成功！~");
                return new HttpStatusCodeResult(200, "删除成功");
            }
            if (message.Type == MessageType.TextMessage && message.Text.Contains("t.me") &&
                !message.Text.Contains("soft2b"))
            {
                var deleteMessageResult = await Bot.Api.KickChatMemberAsync(message.Chat.Id, message.From.Id);
                if (!deleteMessageResult)
                {
                    logger.Debug($"消息{message.MessageId}不存在，踢出失败！~");
                    return new HttpStatusCodeResult(200, "踢出失败");
                }
                logger.Debug($"消息{message.MessageId}踢出成功！~");
                return new HttpStatusCodeResult(200, "踢出成功");
            }
            if (message.Type == MessageType.PhotoMessage)
            {
                //await Bot.Api.DeleteMessageAsync(message.Chat.Id, message.MessageId);
                var deleteMessageResult = await Bot.Api.KickChatMemberAsync(message.Chat.Id, message.From.Id);
                if (!deleteMessageResult)
                {
                    logger.Debug($"消息{message.MessageId}不存在，踢出失败！~");
                    return new HttpStatusCodeResult(200, "踢出失败");
                }
                logger.Debug($"消息{message.MessageId}踢出成功！~");
                return new HttpStatusCodeResult(200, "踢出成功");
            }
            //if (message.Type == MessageType.TextMessage && message.Text.StartsWith("/code"))
            //{
            //    url = $"{url}{message.Text}";
            //    // Echo each Message
            //    using (WebClient client = new WebClient())
            //    {
            //        client.Encoding = Encoding.UTF8;
            //        var resultJson = client.DownloadString(url);
            //        var result = new { Success = false, Msg = string.Empty, InviteUrl = string.Empty };
            //        result = JsonConvert.DeserializeAnonymousType(resultJson, result);
            //        if (result.Success == true)
            //        {
            //            await Bot.Api.SendTextMessageAsync(message.Chat.Id, result.Msg, ParseMode.Default, false,
            //                false, message.MessageId);
            //        }
            //        else
            //        {
            //            await Bot.Api.SendTextMessageAsync(message.Chat.Id, result.Msg, ParseMode.Default, false,
            //                false, message.MessageId);
            //        }

            //    }
            //}
            logger.Debug($"消息{message.MessageId}处理完毕！~");
            return new HttpStatusCodeResult(200, "已处理");
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