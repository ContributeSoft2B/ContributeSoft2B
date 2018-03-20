using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContributeComponents.Domains
{
    public class Telegrams
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 以太坊地址
        /// </summary>
        public string EthAddress { get; set; }
        /// <summary>
        /// 验证码
        /// </summary>
        public string VerificationCode { get; set; }
        /// <summary>
        /// 邀请链接
        /// </summary>
        public string InviteUrl { get; set; }
        /// <summary>
        /// 邀请人Id
        /// </summary>
        public int ParentId { get; set; }
        /// <summary>
        /// 绑定时间
        /// </summary>
        public DateTime? BindTime { get; set; }

        /// <summary>
        /// 邀请总人数
        /// </summary>
        public int InvitedTotalCount { get; set; }
        /// <summary>
        /// 币种名称
        /// </summary>
        public string ChainName { get; set; }
        /// <summary>
        /// 来自于国家
        /// </summary>
        public Country Country { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }
    }

    public enum Country
    {
        Us,
        Korea
    }
}
