using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Exceptions;
using Homeexchange.Models.ViewModels;
using Homeexchange.Responses;
using Homeexchange.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Xunit;

namespace Homeexchange.Tests
{
    public class AccountServiceTests
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
            mockUserRepo.Setup(repo => repo.Get(It.IsAny<Expression<Func<User, bool>>>()))
                        .Returns(new List<User>
                            {
                                new User{Email = "snovis@gmail.com", Password = "12345678"}
                            });

            var accoutService = new AccounService(mockUserRepo.Object);

            var result = accoutService.Login(testAccount);

            Assert.IsType<LoginResponse>(result);
            Assert.Equal(testAccount.Login, result.User.Email);
        }

        [Fact]
        public void ReenterUserReturnAnsver()
        {
            int userId = 1;
            var testAccount = new Account { Login = "snovis@gmail.com", Password = "12345678" };
            var testUser = new User { Email = "snovis@gmail.com", Password = "12345678" };
            var mockUserRepo = new Mock<IGenericRepository<User>>();
            mockUserRepo.Setup(repo => repo.Get(It.IsAny<Expression<Func<User, bool>>>()))
                        .Returns(new List<User>
                            {
                                testUser
                            });
            mockUserRepo.Setup(repo => repo.GetById(userId))
                      .Returns(testUser);

            var accoutService = new AccounService(mockUserRepo.Object);

            var result = accoutService.Reenter(userId);

            Assert.IsType<LoginResponse>(result);
            Assert.Equal(testAccount.Login, result.User.Email);
        }

        [Fact]
        public void ReenterUserReturnNullReferenceException()
        {
            int userId = 1;
            var testAccount = new Account { Login = "snovis@gmail.com", Password = "12345678" };
            var testUser = new User { Email = "snovis@gmail.com", Password = "12345678" };
            var mockUserRepo = new Mock<IGenericRepository<User>>();
            mockUserRepo.Setup(repo => repo.Get(It.IsAny<Expression<Func<User, bool>>>()))
                        .Returns(new List<User>());

            mockUserRepo.Setup(repo => repo.GetById(userId))
                      .Returns(null as User);

            var accoutService = new AccounService(mockUserRepo.Object);

            var ex = Assert.Throws<NullReferenceException>(() =>
            {
                var result = accoutService.Reenter(userId);
            });
        }

        [Fact]
        public void RegistrateUserRetrunDuplicateEmailException()
        {
            var testUser = new User { Email = "snovis@gmail.com", Password = "12345678" };
            var mockUserRepo = new Mock<IGenericRepository<User>>();
            var mockE = new DbUpdateException("", new Exception("fajksdfjalk;df Email"));
            mockUserRepo.Setup(repo => repo.Create(It.IsNotNull<User>()))
                        .Throws(mockE);

            var accoutService = new AccounService(mockUserRepo.Object);

            var ex = Assert.Throws<DuplicateEmailException>(() =>
            {
                var result = accoutService.Registrate(testUser);
            });
        }

        [Fact]
        public void RegistrateUserRetrunDuplicateNicknameException()
        {
            var testUser = new User { Email = "snovis@gmail.com", Password = "12345678" };
            var mockUserRepo = new Mock<IGenericRepository<User>>();
            var mockE = new DbUpdateException("", new Exception("fajksdfjalk;df Nickname"));
            mockUserRepo.Setup(repo => repo.Create(It.IsNotNull<User>()))
                        .Throws(mockE);

            var accoutService = new AccounService(mockUserRepo.Object);

            var ex = Assert.Throws<DuplicateNicknameException>(() =>
            {
                var result = accoutService.Registrate(testUser);
            });
        }
    }
}
