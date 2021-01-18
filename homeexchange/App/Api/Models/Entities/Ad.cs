using Homeexchange.Models.Shared;
using Homeexchange.Models.ViewModels;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Homeexchange.Models.Entities
{
    public sealed class Ad
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Desc { get; set; }
        public DateTime DateOfPublication { get; set; }
        public AdType Type { get; set; }
        [ForeignKey("AuthorId")]
        [Required]
        public int AuthorId { get; set; }
        public User Author { get; set; }
        public bool IsResponded { get; set; } = false;
    }
}