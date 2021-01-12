using System.ComponentModel.DataAnnotations;

namespace Homeexchange.Models.Entities
{
    public sealed class Img
    {
        [Key]
        public int Id { set; get; }
        public string Title { set; get; }
        public string Path { set; get; }
    }
}
