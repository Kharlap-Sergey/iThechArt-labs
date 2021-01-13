namespace Homeexchange.Models.Requests
{
    public sealed class MessageRequest
    {
        public int ChatId { set; get; }
        public string Content { set; get; }
    }
}
