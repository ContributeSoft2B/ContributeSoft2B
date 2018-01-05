using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Remoting;
using System.Text;
using System.Threading.Tasks;

namespace ContributeComponents.Domains
{
    public class Applications
    {
        public int Id { get; set; }
        [StringLength(255,ErrorMessage = "The content must not exceed 255 characters")]
        [Required(AllowEmptyStrings = false,ErrorMessage = "required")]
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
        [RegularExpression(@"^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$", ErrorMessage = "Phone is invalid or already taken")]
        [Display(Name = "Phone")]

        public string Phone { get; set; }
        [Display(Name = "Telegram")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "required")]
        public string  Telegram { get; set; }
        public DateTime CreateTime { get; set; }
    }
}
