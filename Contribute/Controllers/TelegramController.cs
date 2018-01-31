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
        public ActionResult Index(string ethAddress, int parentId = 0)
        {
            var telegram = new Telegrams
            {
                EthAddress = ethAddress,
                CreateTime = DateTime.UtcNow,
                ParentId = parentId,
                InviteUrl = "",
                VerificationCode = $"/code {Guid.NewGuid()}"
            };
           
            db.Telegrams.Add(telegram);
            db.SaveChanges();
            var data = db.Telegrams.FirstOrDefault(t => t.EthAddress == ethAddress);
            data.InviteUrl = $"http://www.soft2b.com/telegram/invite?parentId= {data.Id}";
            db.SaveChanges();
            return Json(new { success = true, data.InviteUrl, data.VerificationCode,msg="注册成功！~" }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 验证码是否存在，如果存在，和ETH地址绑定
        /// </summary>
        /// <param name="verificationCode"></param>
        /// <returns></returns>
        public ActionResult Verification(string verificationCode)
        {
            
            var data = db.Telegrams.FirstOrDefault(t => t.VerificationCode == verificationCode.Trim());
            if (data == null)
            {
                return Json(new { success = false, msg = "验证失败，验证码无效" },JsonRequestBehavior.AllowGet);
            }
            data.BindTime=DateTime.UtcNow;
            db.SaveChanges();
            return Json(new { success = true, msg = "验证成功", data.InviteUrl }, JsonRequestBehavior.AllowGet);

        }
    }
}