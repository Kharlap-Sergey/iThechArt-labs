using Microsoft.AspNetCore.SignalR;
using serverApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Services
{
    public interface INotificationService
    {
        //public static Dictionary<int, string> Subscribers;
        public void Create(NotificationAboutResponseToAd notification);
        public IEnumerable<NotificationAboutResponseToAd> GetAllNotificationForUserByUserId(int userID);
 
    }
}
