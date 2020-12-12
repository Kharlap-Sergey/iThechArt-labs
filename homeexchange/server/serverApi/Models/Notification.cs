using HomeexchangeApi.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Models
{
    public sealed class Notification
    {
        public enum NotificationType
        {
            NewMessage = 1,
            NewResponse = 2,
        }

        [Key]
        public int Id { get; set; }

        [ForeignKey("TargetUserId")]
        [Required]
        public int TargetUserId{ get; set; }
        public User TargetUser { get; set; }

        [ForeignKey("ChatId")]
        [Required]
        public int ChatId { get; set; }
        public Chat Chat { get; set; }

        public NotificationType Type { get; set; }
    }
}
