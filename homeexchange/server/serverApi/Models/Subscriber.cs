using System;

namespace serverApi.Models
{
    public class Subscriber : User
    {
        public DateTime Date { set; get; }

        public Messages Messages { set; get; }
    }
}