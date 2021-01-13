using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Homeexchange.Services.Infrastructure
{
    public sealed class JwtAuthOptions
    {
        public const string SectionName = "JwtAuthOptions";
        public static string ISSUER = "Default"; // издатель токена
        public static string AUDIENCE = "Default"; // потребитель токена
        public static string KEY = "Default";   // ключ для шифрации
        public static int LIFETIME = 30; // время жизни токена - 10 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
