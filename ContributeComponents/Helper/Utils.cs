using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ContributeComponents.Helper
{
    public class Utils
    {
        static TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("China Standard Time");

        private static string storageUrl = "";
        private static string hostUrl = "";
   
   
        public static DateTime ToUtcTime(DateTime local)
        {
            return TimeZoneInfo.ConvertTimeToUtc(local, tzi);
        }

        public static DateTime ToLocalTime(DateTime utc)
        {
            return TimeZoneInfo.ConvertTimeFromUtc(utc, tzi);
        }

    
        public static string ExceptionToString(Exception exp)
        {
            if (exp == null)
            {
                return "";
            }
            string msg = exp.ToString();
            if (exp.InnerException != null)
            {
                msg += "\r\n" + ExceptionToString(exp.InnerException);
            }

            return msg;
        }

        public static DateTime MinDateTime { get { return DateTime.Parse("1970-1-1"); } }
        public static DateTime MaxDateTime { get { return DateTime.Parse("2049-1-1"); } }

        public static string UploadData(string url, string postData)
        {
            using (WebClient client = new WebClient())
            {
                return Encoding.UTF8.GetString(client.UploadData(url, Encoding.UTF8.GetBytes(postData)));
            }
        }
        public static string UploadFile(string url, string filepath)
        {
            using (WebClient client = new WebClient())
            {
                return Encoding.UTF8.GetString(client.UploadFile(url, filepath));
            }
        }
        public static string GetData(string url)
        {
            using (WebClient client = new WebClient())
            {
                client.Encoding = Encoding.UTF8;
                return client.DownloadString(url);
            }
        }
  
        

        internal static string GenerateBillingNumber()
        {
            return "BN" + Utils.ToLocalTime(DateTime.UtcNow).ToString("yyyyMMddHHmmss") + GetRandomString("0123456789", 6);
        }
        

        public static void CalcPager(int index, int size, out int from, out int to)
        {
            from = (index - 1) * size + 1;
            to = index * size;
        }
        private static Random random = new Random();

        public static string GetRandomString()
        {
            return GetRandomString("abcdefghijklmnopqrstuvwxyz0123456789", 8);
        }

        public static string GetOrderNumber()
        {
            return "CO" + Utils.ToLocalTime(DateTime.UtcNow).ToString("yyyyMMddHHmmss") + GetRandomString("0123456789", 6);
        }

        public static string GetChargeNumber(int userId)
        {
            return "CZ" + Utils.ToLocalTime(DateTime.UtcNow).ToString("yyyyMMddHHmmss") + GetRandomString("0123456789", 6) + "U" + userId;
        }

        public static string GetPayNumber()
        {
            return "ZF" + Utils.ToLocalTime(DateTime.UtcNow).ToString("yyyyMMddHHmmss") + GetRandomString("0123456789", 6);
        }

        public static string GetBonusNumber(int clsId, int userId)
        {
            return String.Format("CB{0}Z{1}Z{2}", clsId, userId, Utils.ToLocalTime(DateTime.UtcNow).ToString("yyyyMMddHHmmss"));
        }
        public static string GetClassGroupNumber(int clsId, int userId)
        {
            return String.Format("CG{0}Z{1}Z{2}", clsId, userId, Utils.ToLocalTime(DateTime.UtcNow).ToString("yyyyMMddHHmmss"));
        }
        public static string GetCashOutNumber()
        {
            return "TX" + Utils.ToLocalTime(DateTime.UtcNow).ToString("yyyyMMddHHmmss") + GetRandomString("0123456789", 6);
        }
        public static string GetRandomString(string range, int length)
        {
            int strlen = range.Length;
            string str = "";
            for (int i = 0; i < length; i++)
            {
                str += range[random.Next(0, strlen)].ToString();
            }

            return str;
        }
        public static string GenerateNumber()
        {
            var dt = Utils.ToLocalTime(DateTime.UtcNow);
            return dt.ToString("yyyyMMddHHmmssttt") + GetRandomString("0123456789", 6);
        }

    
   
        //相对路径转换成服务器本地物理路径  
        public static string urlTolocal(string imagesurl1)
        {
            //string tmpRootDir = HttpContext.Current.Server.MapPath(HttpContext.Current.Request.ApplicationPath.ToString());//获取程序根目录  
            string imagesurl2 = imagesurl1.Replace(@"/", @"\"); //转换成绝对路径  
            return imagesurl2;
        }

        public static bool CheckClientIsMobile()
        {
            //判断是否是移动端访问
            System.Web.HttpBrowserCapabilities myBrowserCaps = HttpContext.Current.Request.Browser;
            bool isMobileDevice = ((System.Web.Configuration.HttpCapabilitiesBase)myBrowserCaps).IsMobileDevice;
            return isMobileDevice;
        }
        public static string AjaxDeCode(string str)
        {
            str = str.Replace("{￥bai￥}", "%");
            str = str.Replace("{￥dan￥}", "'");
            str = str.Replace("{￥shuang￥}", "\"");
            str = str.Replace("{￥kong￥}", " ");
            str = str.Replace("{￥zuojian￥}", "<");
            str = str.Replace("{￥youjian￥}", ">");
            str = str.Replace("{￥and￥}", "&");
            str = str.Replace("{￥tab￥}", "\t");
            str = str.Replace("{￥jia￥}", "+");
            return str;
        }

        /// <summary>
        /// 发生异常时发送异常详情到个人邮箱
        /// </summary>
        /// <param name="context">请求上下文</param>
        /// <param name="error">错误码</param>
        /// <param name="msg">错误详情</param>
        public static void SendErrorLogEmail(HttpContextBase context, string error, string msg)
        {
            var mg = new MailMessage();
            mg.To.Add("372364996@qq.com");
            mg.From = new MailAddress("372364996@qq.com", "Soft" + error, System.Text.Encoding.UTF8);
            mg.Subject = "Soft异常发生URL:" + context.Request.Url;//邮件标题 
            mg.SubjectEncoding = Encoding.UTF8;//邮件标题编码 
            mg.Body = msg;//邮件内容 
            mg.BodyEncoding = Encoding.UTF8;//邮件内容编码 
            mg.IsBodyHtml = false;//是否是HTML邮件 
            mg.Priority = MailPriority.High;//邮件优先级
            var client = new SmtpClient
            {
                Credentials = new System.Net.NetworkCredential("372364996@qq.com", "guyuwei3614"),
                Host = "smtp.qq.com"
            };
            try
            {
                
                client.Send(mg);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        /// <summary>
        /// Base64加密
        /// </summary>
        /// <param name="encode">加密采用的编码方式</param>
        /// <param name="source">待加密的明文</param>
        /// <returns></returns>
        public static string EncodeBase64(Encoding encode, string source)
        {
            string enString = "";
            byte[] bytes = encode.GetBytes(source);
            try
            {
                enString = Convert.ToBase64String(bytes);
            }
            catch
            {
                enString = source;
            }
            return enString;
        }

        /// <summary>
        /// Base64解密
        /// </summary>
        /// <param name="encode">解密采用的编码方式，注意和加密时采用的方式一致</param>
        /// <param name="result">待解密的密文</param>
        /// <returns>解密后的字符串</returns>
        public static string DecodeBase64(Encoding encode, string result)
        {
            string decode = "";
            byte[] bytes = Convert.FromBase64String(result);
            try
            {
                decode = encode.GetString(bytes);
            }
            catch
            {
                decode = result;
            }
            return decode;
        }
    }
}
