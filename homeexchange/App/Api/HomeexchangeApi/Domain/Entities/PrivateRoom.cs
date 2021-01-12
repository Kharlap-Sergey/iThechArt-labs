using HomeexchangeApi.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Domain.Entities
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
