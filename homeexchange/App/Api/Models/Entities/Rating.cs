using Homeexchange.Models.ViewModels;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Homeexchange.Models.Entities
{
    public sealed class Rating
    {
        [Key]
        public int Id { set; get; }
        [ForeignKey("TargetId")]
        [Required]
        public int TargetId { set; get; }
        public User Target { set; get; }
        [ForeignKey("CommitterId")]
        [Required]
        public int CommitterId { set; get; }
        public User Committer { set; get; }
        [Required]
        public int Mark { set; get; }
    }
}
