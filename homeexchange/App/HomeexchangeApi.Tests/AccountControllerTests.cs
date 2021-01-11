using HomeexchangeApi.Controllers;
using HomeexchangeApi.Exceptions;
using HomeexchangeApi.Models;
using HomeexchangeApi.Services;
using Moq;
using System;
using Xunit;

namespace HomeexchangeApi.Tests
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
