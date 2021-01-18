namespace Homeexchange.Api.Exceptions
{
    public sealed class DuplicateEmailException : DuplicateUniqueValueException
    {
        public DuplicateEmailException(string message) 
            : base(message)
        {
        }
    }
}
