using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ContributeComponents.Helper
{
    public class CryptoHelper
    {
        public static string SHA1(params object[] args)
        {
            Array.Sort(args);
            string temp = String.Join("", args);
            using (SHA1Managed sha1 = new SHA1Managed())
            {
                var hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(temp));
                return BitConverter.ToString(hash).Replace("-", "");
            }
        }

        public static string Md5(string source)
        {
            byte[] buffer = MD5.Create().ComputeHash(System.Text.Encoding.UTF8.GetBytes(source));
            StringBuilder sb = new StringBuilder();
            foreach (byte b in buffer)
            {
                sb.Append(b.ToString("x2"));
            }
            return sb.ToString();
        }
    }
}
