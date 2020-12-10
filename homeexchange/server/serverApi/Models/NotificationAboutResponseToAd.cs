using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Models
{
    public sealed class NotificationAboutResponseToAd
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("TargetUserId")]
        [Required]
        public int TargetUserId{ get; set; }
        public User TargetUser { get; set; }

        [ForeignKey("ResponseToAdId")]
        [Required]
        public int ResponseToAdId { get; set; }
        public ResponseToAd ResponseToAd { get; set; }
    }
}
