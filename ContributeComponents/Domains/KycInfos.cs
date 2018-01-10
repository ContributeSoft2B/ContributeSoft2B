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
        [StringLength(255, ErrorMessage = "The content must not exceed 255 characters")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "required")]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [StringLength(255, ErrorMessage = "The content must not exceed 255 characters")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "required")]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
        [StringLength(255, ErrorMessage = "The content must not exceed 255 characters")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "required")]
        [Display(Name = "Full Job Title")]
        public string FullJobTitle { get; set; }
        [StringLength(255, ErrorMessage = "The content must not exceed 255 characters")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "required")]
        [RegularExpression(@"^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$", ErrorMessage = "Email is invalid or already taken")]
        [Display(Name = "Email")]
        public string Email { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "required")]
        [Display(Name = "Social Reputation")]
        [StringLength(255, ErrorMessage = "The content must not exceed 255 characters")]
        public string SocialReputation { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "required")]
        [Display(Name = "Describe yourself & how you can help as a community member")]
        [StringLength(255, ErrorMessage = "The content must not exceed 255 characters")]
        public string Description { get; set; }
        [Display(Name = "Upload ID file")]
        public string File { get; set; }
        [StringLength(255, ErrorMessage = "The content must not exceed 255 characters")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "required")]
        [Display(Name = "Origin Address - The ETH address you are contributing from")]
        public string BtcOriginAddress { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "required")]
        [Display(Name = "How much do you want to contribute in ETH")]
        [RegularExpression(@"^[0-9]*$", ErrorMessage = "Input Number")]
        public int Btc { get; set; }
        
        public DateTime CreateTime { get; set; }
    }
}
