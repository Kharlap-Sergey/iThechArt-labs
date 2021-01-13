namespace Homeexchange.Models.Exceptions
{
    public class DuplicateNicknameException : DuplicateUniqueValueException
    {
        public DuplicateNicknameException(string message) : base(message)
        {
        }
    }
}
