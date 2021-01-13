using Homeexchange.Models.ViewModels;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Homeexchange.Models.Entities
{
    public sealed class ChatMessage
    {
        [Key]
        public int Id { set; get; }
        [ForeignKey("ChatId")]
        [Required]
        public int ChatId { set; get; }
        public Chat Chat { get; set; }
        [ForeignKey("UserId")]
        [Required]
        public int UserId { set; get; }
        public User User { get; set; }
        public string Content { set; get; }
        public DateTime PublicationDate { set; get; }
    }
}
