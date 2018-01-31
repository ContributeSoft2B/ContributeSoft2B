using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Contribute.Controllers
{
    public class TelegramController : Controller
    {
        // GET: TMe
        public ActionResult Index(string lang)
        {
            if (lang == "en")
            {
                return RedirectToAction("Home");
            }
            else
            {
                return View();
            }
        }
        public ActionResult Home() {

            return View();
        }
        public ActionResult Detail()
        {
            return View();
        }
        public ActionResult DetailEn()
        {
            return View();
        }
    }
}