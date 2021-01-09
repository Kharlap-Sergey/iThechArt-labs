﻿using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HomeexchangeApi.Models
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

        public bool IsResponded { get; set; } = false;

        bool IsAuthorMatch(int? authorId)
        {
            if (authorId == null || authorId == 0) return true;
            return authorId == AuthorId;
        }
        bool IsTypeMatch(List<AdType> adTypes)
        {
            if (adTypes.Count == 0) return true;
            return adTypes.Contains(this.Type);
        }
        public bool IsMatch(AdFilter filter) {
            bool isAuthorMatch = IsAuthorMatch(filter.AuthorId);
            bool isTypeMatch = IsTypeMatch(filter.Types);
            return isAuthorMatch && isTypeMatch;
        }
    }
}