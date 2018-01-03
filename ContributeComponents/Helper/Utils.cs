using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContributeComponents.Helper
{
    public class Utils
    {
        static TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("China Standard Time");
        public static DateTime ToUtcTime(DateTime local)
        {
            return TimeZoneInfo.ConvertTimeToUtc(local, tzi);
        }

        public static DateTime ToLocalTime(DateTime utc)
        {
            return TimeZoneInfo.ConvertTimeFromUtc(utc, tzi);
        }

    }
}
