using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace serverApi.Models
{
    public class ResponseToAd
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("AuthorId")]
        [Required]
        public int AuthorId { get; set; }
        public User Author { get; set; }
        public DateTime Date { set; get; }
        public string Message { set; get;}
    }
}