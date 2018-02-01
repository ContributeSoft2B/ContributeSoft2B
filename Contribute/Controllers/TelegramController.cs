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
                return Json(new { success = false, msg = "钱包地址已存在！" });
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
                return Json(new { success = false, msg = $"验证码：{verificationCode}无效，可能的原因如下：\n 1.错误的验证码 \n 2.该验证码好像已经被别人用过 \n 3.您跑错场了" },JsonRequestBehavior.AllowGet);
            }
            data.BindTime=DateTime.UtcNow;
            db.SaveChanges();
            return Json(new { success = true, msg = $"收到验证码:{verificationCode},恭喜你验证成功，赶快把邀请链接分享给好友，活动期间每成功推荐一个好友入群，即可获得2个STB!", data.InviteUrl }, JsonRequestBehavior.AllowGet);

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

            return View(data);
        }
        public ActionResult DetailEn(string code)
        {
            var data = db.Telegrams.FirstOrDefault(t => t.VerificationCode == code);
            return View(data);
        }
    }
}