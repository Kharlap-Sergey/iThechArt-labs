using System.ComponentModel.DataAnnotations;

namespace HomeexchangeApi.Domain.Entities
{
    public sealed class Chat
    {
        [Key]
        public int Id { set; get; }

        public string Title { set; get; }
    }
}
