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
        public JsonResult Index(string ethAddress, int parentId = 0,Country country= Country.Us)
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
                VerificationCode = $"/code {Guid.NewGuid()}",
                Country = country
            };
           
            db.Telegrams.Add(telegram);
            db.SaveChanges();
            var data = db.Telegrams.FirstOrDefault(t => t.EthAddress == ethAddress);
            data.InviteUrl = $"https://www.soft2b.com/telegram/index?parentId={data.Id}";
            db.SaveChanges();
            return Json(new { success = true, data.InviteUrl, data.VerificationCode,msg="注册成功！~" });
        }
        [HttpPost]
        public JsonResult KoreaIndex(string ethAddress, int parentId = 0, Country country = Country.Korea)
        {
            var selectEthAddress = db.Telegrams.FirstOrDefault(t => t.EthAddress == ethAddress);
            if (selectEthAddress != null)
            {
                return Json(new { success = false, selectEthAddress.InviteUrl, selectEthAddress.VerificationCode, msg = "에틸렌 주소 지갑 주소 이미 존재합니다！" });
            }
            var telegram = new Telegrams
            {
                EthAddress = ethAddress,
                CreateTime = DateTime.UtcNow,
                ParentId = parentId,
                InviteUrl = "",
                VerificationCode = $"/code {Guid.NewGuid()}",
                Country=country
            };

            db.Telegrams.Add(telegram);
            db.SaveChanges();
            var data = db.Telegrams.FirstOrDefault(t => t.EthAddress == ethAddress);
            data.InviteUrl = $"https://www.soft2b.com/telegram/IndexKP?parentId={data.Id}";
            db.SaveChanges();
            return Json(new { success = true, data.InviteUrl, data.VerificationCode, msg = "등록 성공！~" });
        }
        /// <summary>
        /// 验证码是否存在，如果存在，和ETH地址绑定
        /// </summary>
        /// <param name="verificationCode"></param>
        /// <returns></returns>
        public ActionResult Verification(string verificationCode)
        {
            
            //var data = db.Telegrams.FirstOrDefault(t => t.VerificationCode == verificationCode.Trim());
            //if (data == null)
            //{
            //    return Json(new { success = false, msg = $"Verification Code：{verificationCode}  invalid，The possible reasons are as follows：\n 1.False verification code \n 2.The verifying code seems to have been used by others \n 3.You run the wrong field" },JsonRequestBehavior.AllowGet);
            //}
            //if (data.BindTime.HasValue)
            //{
            //    return Json(new { success = false, msg = $"Verification Code：{verificationCode}Verified，Non repeatable validation" }, JsonRequestBehavior.AllowGet);
            //}
            //data.BindTime=DateTime.UtcNow;
            //db.SaveChanges();
            //return Json(new { success = true, msg = $"Receive verification code:{verificationCode},Verify success, quickly share the invite link to friends, each successful recommendation during the event a group of friends, you can get 2 STB!", data.InviteUrl }, JsonRequestBehavior.AllowGet);

            var data = db.Telegrams.FirstOrDefault(t => t.VerificationCode == verificationCode.Trim());
            if (data == null)
            {
                return Json(new { success = false, msg = $"验证码：{verificationCode}无效，可能的原因如下：\n 1.错误的验证码 \n 2.该验证码好像已经被别人用过 \n 3.您跑错场了 \n Verification Code：{verificationCode}  invalid，The possible reasons are as follows：\n 1.False verification code \n 2.The verifying code seems to have been used by others \n 3.You run the wrong field" }, JsonRequestBehavior.AllowGet);
            }
            if (data.BindTime.HasValue)
            {
                return Json(new { success = false, msg = $"验证码：{verificationCode}已验证，不可重复验证 \n Verification Code：{verificationCode}Verified，Non repeatable validation" }, JsonRequestBehavior.AllowGet);
            }
            data.BindTime = DateTime.UtcNow;

            if (data.ParentId != 0)
            {
                var parent = db.Telegrams.FirstOrDefault(t => t.Id == data.ParentId);
                if (parent != null) parent.InvitedTotalCount++;
            }
            data.ChainName = "DCA";
            db.SaveChanges();
            return Json(new { success = true, msg = $"收到验证码:{verificationCode},恭喜你验证成功，赶快把邀请链接分享给好友，每成功推荐一个好友入群，即可获得2个DCA! \n Receive verification code:{verificationCode},Verify success, quickly share the invite link to friends, each successful recommendation during the event a group of friends, you can get 2 DCA!", data.InviteUrl }, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 验证码是否存在，如果存在，和ETH地址绑定（韩国)
        /// </summary>
        /// <param name="verificationCode"></param>
        /// <returns></returns>
        public ActionResult KroeaVerification(string verificationCode)
        {

            //var data = db.Telegrams.FirstOrDefault(t => t.VerificationCode == verificationCode.Trim());
            //if (data == null)
            //{
            //    return Json(new { success = false, msg = $"Verification Code：{verificationCode}  invalid，The possible reasons are as follows：\n 1.False verification code \n 2.The verifying code seems to have been used by others \n 3.You run the wrong field" },JsonRequestBehavior.AllowGet);
            //}
            //if (data.BindTime.HasValue)
            //{
            //    return Json(new { success = false, msg = $"Verification Code：{verificationCode}Verified，Non repeatable validation" }, JsonRequestBehavior.AllowGet);
            //}
            //data.BindTime=DateTime.UtcNow;
            //db.SaveChanges();
            //return Json(new { success = true, msg = $"Receive verification code:{verificationCode},Verify success, quickly share the invite link to friends, each successful recommendation during the event a group of friends, you can get 2 STB!", data.InviteUrl }, JsonRequestBehavior.AllowGet);

            var data = db.Telegrams.FirstOrDefault(t => t.VerificationCode == verificationCode.Trim());
            if (data == null)
            {
                return Json(new { success = false, msg = $"패스워드：{verificationCode}무효，가능한 이유는 다음과 같습니다. \n 1. 잘못된 인증 코드 \n 2. 이 검증 야드 마치 이미 남의 쓰던 \n 3. 당신이 잘못 들었다면 번" }, JsonRequestBehavior.AllowGet);
            }
            if (data.BindTime.HasValue)
            {
                return Json(new { success = false, msg = $"패스워드：{verificationCode}이미 반복 검증 검증 안 된다." }, JsonRequestBehavior.AllowGet);
            }
            data.BindTime = DateTime.UtcNow;
            db.SaveChanges();
            return Json(new { success = true, msg = $"받은 인증 코드:{verificationCode},축하해, 인증 성공, 어서 초대 연결 공유 친구, 활동 기간 동안 매 성공 - 한 친구 입사 군, 받을 수 있다 STB 2 개!", data.InviteUrl }, JsonRequestBehavior.AllowGet);
        }
        
        // GET: TMe
        public ActionResult Index(int parentId=0 )
        {
            ViewBag.ParentId = parentId;
            return View();
            
        }
        public ActionResult Home(int parentId = 0)
        {
            ViewBag.ParentId = parentId;
            return View();
        }
        public ActionResult IndexKP(int parentId = 0) {

            ViewBag.ParentId = parentId;
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
        public ActionResult DetailKP(string code)
        {
            var data = db.Telegrams.FirstOrDefault(t => t.VerificationCode == code);
            var list = db.Telegrams.Where(t => t.ParentId == data.Id && t.BindTime.HasValue).ToList();
            ViewBag.TotalInviteCount = list.Count;
            ViewBag.GetStbCount = list.Count * 2;
            return View(data);
        }
    }
}