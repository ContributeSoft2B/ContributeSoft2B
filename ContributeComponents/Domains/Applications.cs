using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContributeComponents.Domains
{
    public class Applications
    {
        public int Id { get; set; }
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        [Display(Name = "Full Job Title")]
        public string FullJobTitle { get; set; }
        [Display(Name = "Email")]
        public string Email { get; set; }
        [Display(Name = "Social Reputation")]
        public string SocialReputation { get; set; }
        [Display(Name = "Describe yourself & how you can help as a community member")]
        public string Description { get; set; }
        [Display(Name = "Upload ID file")]
        public string File { get; set; }
        [Display(Name = "Origin Address - The BTC address you are contributing from")]
        public string BtcOriginAddress { get; set; }
        [Display(Name = "How much do you want to contribute in BTC")]
        public decimal Btc { get; set; }
        [Display(Name = "Origin Address - The NEO address you are contributing from")]
        public string NeoOriginAddress { get; set; }
        [Display(Name = "How much do you want to contribute in NEO")]
        public decimal Neo { get; set; }
        public DateTime CreateTime { get; set; }
    }
}
