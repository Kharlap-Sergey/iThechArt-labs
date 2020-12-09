using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace serverApi.Models
{
    public sealed class Ad
    {
        public enum AdType
        {
            tenancy = 1,
            toRent = 2
        }

        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        [JsonPropertyName("description")]
        public string Desc { get; set; }

        public DateTime DateOfPublication { get; set; }

        public AdType Type { get; set; }

        [ForeignKey("AuthorId")]
        [Required]
        public int AuthorId { get; set; }
        public User Author { get; set; }

        [ForeignKey("ResponseToAdId")]
       
        public int? ResponseToAdId { get; set; }
        public ResponseToAd ResponseToAd { get; set; }

        //public IEquatable<Comment> Comments { get; set; }
    }
}