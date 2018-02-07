using ContributeComponents.Domains;
using ContributeComponents.Repositories.Ef;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Contribute.Controllers
{
    public class TelegramController : Controller
    {
        private ContributeDbContext db = new ContributeDbContext();
        // GET: Telegram
        [HttpPost]
        public JsonResult Index(string ethAddress, int parentId = 0)
        {  var selectEthAddress = db.Telegrams.FirstOrDefault(t => t.EthAddress == ethAddress);
            if (selectEthAddress!=null)
            {
                return Json(new { success = false, selectEthAddress.InviteUrl, selectEthAddress.VerificationCode, msg = "钱包地址已存在！" });
            }
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
            data.InviteUrl = $"http://www.soft2b.com/telegram/index?parentId={data.Id}";
            db.SaveChanges();
            return Json(new { success = true, data.InviteUrl, data.VerificationCode,msg="注册成功！~" });
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
                return Json(new { success = false, msg = $"Verification Code：{verificationCode}  invalid，The possible reasons are as follows：\n 1.False verification code \n 2.The verifying code seems to have been used by others \n 3.You run the wrong field" },JsonRequestBehavior.AllowGet);
            }
            if (data.BindTime.HasValue)
            {
                return Json(new { success = false, msg = $"Verification Code：{verificationCode}Verified，Non repeatable validation" }, JsonRequestBehavior.AllowGet);
            }
            data.BindTime=DateTime.UtcNow;
            db.SaveChanges();
            return Json(new { success = true, msg = $"Receive verification code:{verificationCode},Verify success, quickly share the invite link to friends, each successful recommendation during the event a group of friends, you can get 2 STB!", data.InviteUrl }, JsonRequestBehavior.AllowGet);

        }
        // GET: TMe
        public ActionResult Index(int parentId=0 )
        {
            ViewBag.ParentId = parentId;
            return View();
            
        }
        public ActionResult Home()
        {
            return View();
        }
        public ActionResult Detail(string code)
        {
            var data = db.Telegrams.FirstOrDefault(t => t.VerificationCode == code);
            var list = db.Telegrams.Where(t => t.ParentId == data.Id&&t.BindTime.HasValue).ToList();
            ViewBag.TotalInviteCount = list.Count;
            ViewBag.GetStbCount = list.Count * 2;
            return View(data);
        }
        public ActionResult DetailEn(string code)
        {
            var data = db.Telegrams.FirstOrDefault(t => t.VerificationCode == code);
            var list = db.Telegrams.Where(t => t.ParentId == data.Id&& t.BindTime.HasValue).ToList();
            ViewBag.TotalInviteCount = list.Count;
            ViewBag.GetStbCount = list.Count * 2;
            return View(data);
        }
    }
}