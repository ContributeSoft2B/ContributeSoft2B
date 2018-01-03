using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using ContributeComponents.Helper;

namespace Contribute.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
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