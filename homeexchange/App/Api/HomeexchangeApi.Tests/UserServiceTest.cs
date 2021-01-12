using Homeexchange.Domain.Abstract;
using Homeexchange.Exceptions;
using Homeexchange.Models;
using Homeexchange.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Homeexchange.Tests
{
    public class UserServiceTest
    {
        [Fact]
        public void GetProfileReturnNullReferenceException()
        {
            var testUser = new User
            {
                Id = 1,
                City = "Minsk",
                Country = "Belarus",
                Nickname = "sergey",
                Email = "snovis@gmail.com",
                Password = "12345678",
                Name = "Sergey",
                Lastname = "Kharlap",
                Languages = "Ru En",
            };
            var mockUserRepo = new Mock<IGenericRepository<User>>();
            mockUserRepo.Setup(repo => repo.GetById(testUser.Id))
                        .Returns(null as User);

            var userService = new UserService(mockUserRepo.Object);

            var ex = Assert.Throws<NullReferenceException>(() =>
            {
                var result = userService.GetProfile(testUser.Id);
            });
        }

        [Fact]
        public void GetProfileReturnAnswer()
        {
            var testUser = new User
            {
                Id = 1,
                City = "Minsk",
                Country = "Belarus",
                Nickname = "sergey",
                Email = "snovis@gmail.com",
                Password = "12345678",
                Name = "Sergey",
                Lastname = "Kharlap",
                Languages = "Ru En",
            };
            var mockUserRepo = new Mock<IGenericRepository<User>>();
            mockUserRepo.Setup(repo => repo.GetById(testUser.Id))
                        .Returns(testUser);

            var userService = new UserService(mockUserRepo.Object);
            User result = userService.GetProfile(testUser.Id);

            Assert.Equal(null as string, result.Password);
            Assert.Same(testUser, result);
        }

        [Fact]
        public void UpdateReturnPermissionException()
        {
            var testUser = new User
            {
                Id = 1,
                City = "Minsk",
                Country = "Belarus",
                Nickname = "sergey",
                Email = "snovis@gmail.com",
                Password = "12345678",
                Name = "Sergey",
                Lastname = "Kharlap",
                Languages = "Ru En",
            };
            var testCommitterId = 0;
            var mockUserRepo = new Mock<IGenericRepository<User>>();
            var userService = new UserService(mockUserRepo.Object);

            Assert.Throws<PermissionException>(() =>
            {
                userService.Update(testUser, testCommitterId);
            });
        }

        [Fact]
        public void UpdateReturnNullReferencException()
        {
            var testCommitterId = 0;
            var mockUserRepo = new Mock<IGenericRepository<User>>();
            var userService = new UserService(mockUserRepo.Object);

            Assert.Throws<NullReferenceException>(() =>
            {
                userService.Update(null as User, testCommitterId);
            });
        }

        [Fact]
        public void UpdateReturnAnswer()
        {
            var testUser = new User
            {
                Id = 1,
                City = "Minsk",
                Country = "Belarus",
                Nickname = "sergey",
                Email = "snovis@gmail.com",
                Password = "12345678",
                Name = "Sergey",
                Lastname = "Kharlap",
                Languages = "Ru En",
            };
            var testCommitterId = testUser.Id;
            var mockUserRepo = new Mock<IGenericRepository<User>>();
            mockUserRepo.Setup(repo => repo.Get(It.IsAny< Func<User, bool> >()))
                        .Returns(new List<User>
                        {
                            testUser,
                        });
            mockUserRepo.Setup(repo => repo.Update(It.IsAny<User>()))
                        .Returns(testUser);
            
            var userService = new UserService(mockUserRepo.Object);
            var result = userService.Update(testUser, testCommitterId);

            Assert.Same(testUser, result);
        }
    }
}
