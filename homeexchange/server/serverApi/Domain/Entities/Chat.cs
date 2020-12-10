using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Domain.Entities
{
    public sealed class Chat
    {
        [Key]
        public int Id { set; get; }

        public string Title { set; get; }
    }
}
