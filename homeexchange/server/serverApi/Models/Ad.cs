using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace serverApi.Models
{
    public sealed class Ad
    {
        public enum Type
        {
            tenancy,
            toRent
        }

        [Key]
        public int ID { get; set; }

        public string Title { get; set; }

        public string Desc { get; set; }

        public DateTime DateOfPublication { get; set; }

        public Type Typ { get; set; }
        public User Author { get; set; }

        //public List<Subscriber> Subscribers { get; set; } = new List<Subscriber>();

        //public IEquatable<Comment> Comments { get; set; }
    }
}