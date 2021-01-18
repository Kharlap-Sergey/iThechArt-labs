namespace Homeexchange.Api.Exceptions
{
    public sealed class DuplicateNicknameException : DuplicateUniqueValueException
    {
        public DuplicateNicknameException(string message) 
            : base(message)
        {
        }
    }
}
