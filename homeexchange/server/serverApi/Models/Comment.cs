namespace serverApi.Models
{
    public sealed class Comment : Messages
    {
        public User Author { set; get; }
    }
}