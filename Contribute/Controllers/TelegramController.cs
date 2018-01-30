using ContributeComponents.Repositories.Ef;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ContributeComponents.Domains;

namespace Contribute.Controllers
{
    public class TelegramController : Controller
    {
        private ContributeDbContext db = new ContributeDbContext();
        // GET: Telegram
        public ActionResult Index(string ethAddress,int parentId=0)
        {
            var telegram = new Telegrams
            {
                EthAddress= ethAddress,
                CreateTime=DateTime.UtcNow,
                InviteUrl="https://www.baidu.com",
                ParentId= parentId,
                VerificationCode= $"/code {Guid.NewGuid()}"
            };
            db.Telegrams.Add(telegram);
            db.SaveChanges();
            return Json(new {result = "注册成功"},JsonRequestBehavior.AllowGet);
        }
    }
}