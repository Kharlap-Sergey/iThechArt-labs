using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Domain.Entities;
using HomeexchangeApi.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Services
{
    public sealed class ImgService : IImgService
    {
        readonly IWebHostEnvironment appEnvironment;
        readonly IGenericRepository<Img> imgRepository;
        readonly IGenericRepository<User> userRepository;
        public ImgService(
            IWebHostEnvironment appEnvironment,
            IGenericRepository<Img> imgRepository,
            IGenericRepository<User> userRepository
            )
        {
            this.appEnvironment = appEnvironment;
            this.imgRepository = imgRepository;
            this.userRepository = userRepository;
        }
        public FileStreamResult GetPrfileImg(int targetUserId)
        {
            var user = userRepository.FindById(targetUserId);
            int? imgId = user.ProfileImgId;
            if(imgId == null)
            {
                throw new Exception("coldn't find the profile img");
            }

            var img = imgRepository.Get(i => i.Id == imgId).FirstOrDefault();
            var path = img.Path;

            using (var fileStream = new FileStream(appEnvironment.WebRootPath + path, FileMode.Open))
            {
                var res = new FileStreamResult(fileStream, "image/png");
                return res;
            }

            throw new Exception();
        }

        public async Task<IFormFile> Save(IFormFile formFIle, int commiterId)
        {
            if (formFIle != null)
            {
                Directory.CreateDirectory(appEnvironment.WebRootPath + $"\\AccountFilse\\${commiterId}");
                string path = $"\\AccountFilse\\${commiterId}\\" + "profile.img";
                string patht = appEnvironment.WebRootPath;

                using (var fileStream = new FileStream(appEnvironment.WebRootPath + path, FileMode.Create))
                {
                    await formFIle.CopyToAsync(fileStream);
                }

                var imgEnt = new Img { Title = "profile", Path = path };
                var user = userRepository.Get(u => u.Id == commiterId).FirstOrDefault();
                imgEnt = imgRepository.Create(imgEnt);
                user.ProfileImgId = imgEnt.Id;
                userRepository.Update(user);
            }

            return formFIle;
        }
    }
}
