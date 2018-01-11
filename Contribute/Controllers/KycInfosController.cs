using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ContributeComponents.Domains;
using ContributeComponents.Repositories.Ef;

namespace Contribute.Controllers
{
    [Authorize(Roles = "admin")]
    public class KycInfosController : Controller
    {
        private ContributeDbContext db = new ContributeDbContext();

        // GET: KycInfos
        public ActionResult List()
        {
            return View("Index",db.KycInfos.ToList());
        }

        // GET: KycInfos/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KycInfos kycInfos = db.KycInfos.Find(id);
            if (kycInfos == null)
            {
                return HttpNotFound();
            }
            return View(kycInfos);
        }
        [AllowAnonymous]
        // GET: KycInfos/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: KycInfos/Create
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性，有关 
        // 详细信息，请参阅 http://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,FirstName,LastName,FullJobTitle,Email,Description,BtcOriginAddress,Btc")] KycInfos kycInfos, HttpPostedFileBase file)
        {
            string fileIsNullMsg = "";
            if (file == null)
            {
                ViewBag.FileIsNullMsg = "请上传文件";
            }
            else
            {
                if (ModelState.IsValid)
                {
                    string fileName = Guid.NewGuid().ToString() + ".jpg";
                    string path = System.IO.Path.Combine(Server.MapPath("~/Upload"), fileName);
                    file.SaveAs(path);
                    kycInfos.File = fileName;
                    kycInfos.CreateTime = DateTime.UtcNow;
                    db.KycInfos.Add(kycInfos);
                    db.SaveChanges();
                    return RedirectToAction("Success", "Applications");
                }

            }

            return View(kycInfos);
        }

        // GET: KycInfos/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KycInfos kycInfos = db.KycInfos.Find(id);
            if (kycInfos == null)
            {
                return HttpNotFound();
            }
            return View(kycInfos);
        }

        // POST: KycInfos/Edit/5
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性，有关 
        // 详细信息，请参阅 http://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,FirstName,LastName,FullJobTitle,Email,SocialReputation,Description,File,BtcOriginAddress,Btc,NeoOriginAddress,Neo,CreateTime")] KycInfos kycInfos)
        {
            if (ModelState.IsValid)
            {
                db.Entry(kycInfos).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("List");
            }
            return View(kycInfos);
        }

        // GET: KycInfos/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            KycInfos kycInfos = db.KycInfos.Find(id);
            if (kycInfos == null)
            {
                return HttpNotFound();
            }
            return View(kycInfos);
        }

        // POST: KycInfos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            KycInfos kycInfos = db.KycInfos.Find(id);
            db.KycInfos.Remove(kycInfos);
            db.SaveChanges();
            return RedirectToAction("List");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
