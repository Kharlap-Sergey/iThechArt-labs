using Homeexchange.Api.Controllers;
using Homeexchange.Models.Exceptions;
using Homeexchange.Models.ViewModels;
using Homeexchange.Services;
using Moq;
using Xunit;

namespace Homeexchange.Tests
{
    public class AccountControllerTests
    {
        [Fact]
        public void LoginReturnNotFound()
        {
            var mockUserService = new Mock<IUserService>();
            var mockAccountSevice = new Mock<IAccounService>();
            mockAccountSevice.Setup(service => service.Login(new Account()))
                         .Returns(() =>
                         {
                             throw new InvalidCredentialExeption("The user name or password is not correct");
                         });
            var controller = new AccountController(
                        mockUserService.Object
                        ,mockAccountSevice.Object
                        );


            var result = controller.Login(new Account());

            Assert.Equal(1, 1);
        }

    }
}
