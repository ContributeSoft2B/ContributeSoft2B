using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContributeComponents.Domains
{
    public class KycInfos
    {
        public int Id { get; set; }
        [StringLength(255, ErrorMessage = "内容不得超过255个字符")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "必填项")]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [StringLength(255, ErrorMessage = "内容不得超过255个字符")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "必填项")]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        [StringLength(255, ErrorMessage = "内容不得超过255个字符")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "必填项")]
        [Display(Name = "Full Job Title")]
        public string FullJobTitle { get; set; }
        [StringLength(255, ErrorMessage = "内容不得超过255个字符")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "必填项")]
        [RegularExpression(@"^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$", ErrorMessage = "请输入正确的Email")]
        [Display(Name = "Email")]
        public string Email { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "必填项")]
        [Display(Name = "Social Reputation")]
        [StringLength(255, ErrorMessage = "内容不得超过255个字符")]
        public string SocialReputation { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "必填项")]
        [Display(Name = "Describe yourself & how you can help as a community member")]
        [StringLength(255, ErrorMessage = "内容不得超过255个字符")]
        public string Description { get; set; }
        [Display(Name = "Upload ID file")]
        public string File { get; set; }
        [StringLength(255, ErrorMessage = "内容不得超过255个字符")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "必填项")]
        [Display(Name = "Origin Address - The BTC address you are contributing from")]
        public string BtcOriginAddress { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "必填项")]
        [Display(Name = "How much do you want to contribute in BTC")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "请输入数字")]
        public int Btc { get; set; }
        [StringLength(255, ErrorMessage = "内容不得超过255个字符")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "必填项")]
        [Display(Name = "Origin Address - The NEO address you are contributing from")]
        public string NeoOriginAddress { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "必填项")]
        [Display(Name = "How much do you want to contribute in NEO")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "请输入数字")]
        public int Neo { get; set; }
        public DateTime CreateTime { get; set; }
    }
}
