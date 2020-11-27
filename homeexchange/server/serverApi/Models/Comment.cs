namespace serverApi.Models
{
    public sealed class Comment : Messages
    {
        public int ID { set; get; }
        public User Author { set; get; }
    }
}