using System;
using System.Collections.Generic;
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

namespace Contribute.Controllers
{
    public static class Bot
    {
        public static readonly TelegramBotClient Api = new TelegramBotClient("397035878:AAFKtZ_Ox1njEn6dtuAY0PQIB8nsJodCzjc");
    }
    public class HomeController : Controller
    {
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
        public async Task<ActionResult> Telegram(Update update)
        {

            var message = update.Message;
            string url = string.Empty;
            if (message.Type == MessageType.TextMessage && message.Text.StartsWith("/code"))
            {
                url = $"https://www.soft2b.com/telegram/Verification?verificationCode= {message.Text}";

                // Echo each Message
                using (WebClient client = new WebClient())
                {
                    client.Encoding = Encoding.UTF8;
                    var resultJson = client.DownloadString(url);
                    var result = new { Success = false, Msg = string.Empty, InviteUrl = string.Empty };
                    result = JsonConvert.DeserializeAnonymousType(resultJson, result);
                    if (result.Success == true)
                    {
                        await Bot.Api.SendTextMessageAsync(message.Chat.Id, "@" + message.From.Username + "\n" + result.Msg);
                    }
                    else
                    {
                        await Bot.Api.SendTextMessageAsync(message.Chat.Id, "@" + message.From.Username + "\n" + result.Msg);
                    }

                }
            }
            if (message.Type == MessageType.TextMessage && message.Text.StartsWith("/zc"))
            {
                url = $"https://www.soft2b.com/telegram/index?ethAddress= {message.Text}";

                // Echo each Message
                using (WebClient client = new WebClient())
                {
                    client.Encoding = Encoding.UTF8;
                    var resultJson = client.DownloadString(url);
                    var result = new
                    {
                        Success = false,
                        Msg = string.Empty,
                        InviteUrl = string.Empty,
                        VerificationCode = string.Empty
                    };
                    result = JsonConvert.DeserializeAnonymousType(resultJson, result);
                    if (result.Success == true)
                    {
                        await Bot.Api.SendTextMessageAsync(message.Chat.Id,
                          "@"+message.From.Username + "\n" + result.Msg + "\n" + $"邀请链接：{result.InviteUrl}" + "\n" + $"验证码：{result.VerificationCode}");
                    }
                    else
                    {
                        await Bot.Api.SendTextMessageAsync(message.Chat.Id, "@" + message.From.Username + "\n" + result.Msg);
                    }

                }
            }
            //var me = await Bot.Api.GetMeAsync();

            //string text = $"Hello members of channel IG-YdxFTOWY4ClXnikb4CA";

            //Message message = await Bot.Api.SendTextMessageAsync(
            //    chatId: "-290666854",
            //    text: text
            //);

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