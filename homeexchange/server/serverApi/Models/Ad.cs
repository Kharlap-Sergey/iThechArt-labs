using System;
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
        [JsonIgnore]
        public int ID { get; set; }

        public string Title { get; set; }

        public string Desc { get; set; }

        public DateTime DateOfPublication { get; set; }

        public Type Typ { get; set; }

        public User Author { get; set; }

        public IEquatable<Subscriber> Subscribers { get; set;}

        public IEquatable<Comment> Comments { get; set; }
    }
}