using Homeexchange.Models.ViewModels;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Homeexchange.Models.Entities
{
    public sealed class PrivateRoom
    {
        [ForeignKey("Member1Id")]
        [Required]
        public int Member1Id { set; get; }
        public User Member1 { get; set; }
        [ForeignKey("Member2Id")]
        [Required]
        public int Member2Id { set; get; }
        public User Member2 { get; set; }
        [ForeignKey("ChatId")]
        [Required]
        public int ChatId { set; get; }
        public Chat Chat { get; set; }
    }
}
