namespace Homeexchange.Services
{
    public interface IHubSubscribers
    {
        public void AddSubscriber(int userId, string connection);
        public void RemoveSubscriber(int userId);
    }
}
