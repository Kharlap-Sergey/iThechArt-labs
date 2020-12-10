using HomeexchangeApi.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HomeexchangeApi.Domain.Entities
{
    public sealed class ChatMember
    {

        [ForeignKey("ChatId")]
        [Required]
        public int ChatId { set; get; }
        public Chat Chat { get; set; }

        [ForeignKey("UserId")]
        [Required]
        public int UserId { set; get; }
        public User User { get; set; }
    }
}
