﻿using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Exceptions;
using HomeexchangeApi.GlobalErrorHandling.Exceptions;
using HomeexchangeApi.Infrastructure;
using HomeexchangeApi.Models;
using HomeexchangeApi.Responses;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HomeexchangeApi.Services
{
    public class AccounService : IAccounService
    {
        IGenericRepository<User> userRepository;
        public AccounService(
            IGenericRepository<User> userRepository
            )
        {
            this.userRepository = userRepository;
        }

        public LoginResponse Login(Account account)
        {
            ClaimsIdentity identity;
            identity = GetIdentity(account);
           
            // создаем JWT-токен
            var encodedJwt = CustomJWTCreator.CreateJWT(identity);
            User user = userRepository.Get(u => u.Email == account.Login).FirstOrDefault();

            var response = new LoginResponse
            {
                JWT = encodedJwt,
                User = user
            };
            return response;
        }

        public User Registrate(User user)
        {
            try
            {
                return userRepository.Create(user);
            }
            catch (DbUpdateException e)
            {
                if (e.InnerException.Message.Contains("Email"))
                {
                    throw new DuplicateEmailException("try to registrate user");
                }else if (e.InnerException.Message.Contains("Nickname"))
                {
                    throw new DuplicateNicknameException("try to registrate user");
                }
                throw e;
            }
        }

        private ClaimsIdentity GetIdentity(Account account)
        {
            var person = userRepository.Get(u => u.Email == account.Login
            && u.Password == account.Password).FirstOrDefault();
            if (person == null)
            {
                throw new InvalidCredentialExeption("The user name or password is not correct");
            }

            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Id.ToString()),
                };

            ClaimsIdentity claimsIdentity =
            new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
    }
}