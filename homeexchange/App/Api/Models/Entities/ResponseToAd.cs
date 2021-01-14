using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Homeexchange.Models.Entities
{
    public sealed class ResponseToAd
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ResponderId")]
        [Required]
        public int ResponderId { get; set; }
        public User Responder { get; set; }

        [ForeignKey("TargetAdId")]
        [Required]
        public int TargetAdId { get; set; }
        public DateTime Date { set; get; }
        public string Message { set; get; }
    }
}