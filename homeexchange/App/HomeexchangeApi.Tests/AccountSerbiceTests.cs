using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Exceptions;
using HomeexchangeApi.Models;
using HomeexchangeApi.Responses;
using HomeexchangeApi.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace HomeexchangeApi.Tests
{
    public class AccountSerbiceTests
    {
        public List<User> GetTestUsers()
        {
            return new List<User>
            {
                 new User{Email = "snovis@gmail.com", Password = "12345678"}
                ,new User{Email = "sergey@mail.ru", Password = "12312343"}
                ,new User{Email = "test1.ru", Password="1111111111111"}
            };
        }

        [Fact]
        public void LoginUserReturnInvalidCredentialsExceptions()
        {
            var testAccount = new Account { Login = "some", Password = "some" };
            var mockUserRepo = new Mock<IGenericRepository<User>>();
            mockUserRepo.Setup(repo => repo.Get())
                        .Returns(null as List<User>);
            var accoutService = new AccounService(mockUserRepo.Object);

            var ex = Assert.Throws<InvalidCredentialExeption>(() => 
                                    { 
                                        accoutService.Login(testAccount); 
                                    });

            Assert.Equal("The user name or password is not correct", ex.Message);
        }

        [Fact]
        public void LoginUserReturnAnswer()
        {
            var testAccount = new Account { Login = "snovis@gmail.com", Password = "12345678" };
            var mockUserRepo = new Mock<IGenericRepository<User>>();
            mockUserRepo.Setup(repo => repo.Get(It.IsAny<Func<User, bool>>()))
                        .Returns(new List<User> 
                            {
                                new User{Email = "snovis@gmail.com", Password = "12345678"}
                            });

            var accoutService = new AccounService(mockUserRepo.Object);

            var result = accoutService.Login(testAccount);

            Assert.IsType<LoginResponse>(result);
            Assert.Equal(testAccount.Login, result.User.Email);
        }
    }
}
