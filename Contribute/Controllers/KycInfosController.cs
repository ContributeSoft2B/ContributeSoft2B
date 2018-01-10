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
    public class KycInfosController : Controller
    {
        private ContributeDbContext db = new ContributeDbContext();

        // GET: KycInfos
        public ActionResult Index()
        {
            return View(db.KycInfos.ToList());
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

        // GET: KycInfos/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: KycInfos/Create
        // 为了防止“过多发布”攻击，请启用要绑定到的特定属性，有关 
        // 详细信息，请参阅 http://go.microsoft.com/fwlink/?LinkId=317598。
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,FirstName,LastName,FullJobTitle,Email,SocialReputation,Description,File,BtcOriginAddress,Btc,NeoOriginAddress,Neo")] KycInfos kycInfos)
        {
            if (ModelState.IsValid)
            {
                kycInfos.CreateTime = DateTime.UtcNow;
                db.KycInfos.Add(kycInfos);
                db.SaveChanges();
                return RedirectToAction("Index");
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
                return RedirectToAction("Index");
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
            return RedirectToAction("Index");
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
