using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Domain.Entities;
using HomeexchangeApi.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
        public Task<IFormFile> GetPrfileImg(int targetUserId)
        {
            throw new NotImplementedException();
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
