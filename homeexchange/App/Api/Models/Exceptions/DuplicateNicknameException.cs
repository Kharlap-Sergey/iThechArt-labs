namespace Homeexchange.Models.Exceptions
{
    public sealed class DuplicateNicknameException : DuplicateUniqueValueException
    {
        public DuplicateNicknameException(string message) 
            : base(message)
        {
        }
    }
}
