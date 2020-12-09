using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace serverApi.Models
{
    [DataContract()]
    public sealed class Account
    {
        public string Login{ get; set; }
        public string Password { get; set; }
    }
}
