using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContributeComponents.Domains
{
   public class Applications
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string  FullJobTitle { get; set; }
        public string Email { get; set; }
        public string SocialReputation { get; set; }
        public string Description { get; set; }
        public string File { get; set; }
        public string OriginAddress  { get; set; }
        public decimal Neo { get; set; }
        public DateTime CreateTime { get; set; }
    }
}
