﻿using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Homeexchange.Models.Exceptions;
using Homeexchange.Services.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace Homeexchange.Services
{
    [IsServiceImplementation(typeof(IImgService), ServiceLifetime.Scoped)]
    public sealed class ImgService : IImgService
    {
        readonly IGenericRepository<Img> imgRepository;
        readonly IGenericRepository<User> userRepository;
        public ImgService(
            IGenericRepository<Img> imgRepository,
            IGenericRepository<User> userRepository
            )
        {
            this.imgRepository = imgRepository;
            this.userRepository = userRepository;
        }
        public async Task<PhysicalFileResult> GetPrfileImgAsync(int targetUserId, string webRootPath)
        {
            var user = await userRepository.GetByIdAsync(targetUserId);
            int imgId = user.ProfileImgId;
            if(imgId <= 0)
            {
                throw new ImgNotFoundException("coldn't find the profile img");
            }

            var img = (await imgRepository.GetAsync(i => i.Id == imgId)).FirstOrDefault();
            var path = img.Path;

            using (var fileStream = new FileStream(webRootPath + path, FileMode.Open))
            {
                var res = new PhysicalFileResult(webRootPath + path, "image/png");
                return res;
            }

            throw new Exception();
        }

        public async Task<IFormFile> SaveAsync(IFormFile formFIle, int commiterId, string webRootPath)
        {
            if (formFIle != null)
            {
                Directory.CreateDirectory(webRootPath + $"\\AccountFilse\\${commiterId}");
                string path = $"\\AccountFilse\\${commiterId}\\" + "profile.img";

                using (var fileStream = new FileStream(webRootPath + path, FileMode.Create))
                {
                    await formFIle.CopyToAsync(fileStream);
                }

                var imgEnt = new Img { Title = "profile", Path = path };
                var user = (await userRepository.GetAsync(u => u.Id == commiterId))
                           .FirstOrDefault();
                imgEnt = await imgRepository.CreateAsync(imgEnt);
                user.ProfileImgId = imgEnt.Id;
                await userRepository.UpdateAsync(user);
            }

            return formFIle;
        }
    }
}
