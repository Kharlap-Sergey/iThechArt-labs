using HomeexchangeApi.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Domain.Entities
{
    public class Rating
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
