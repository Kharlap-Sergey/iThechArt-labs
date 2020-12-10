namespace HomeexchangeApi.Models
{
    public sealed class Comment : Messages
    {
        public int Id { set; get; }
        public User Author { set; get; }
    }
}