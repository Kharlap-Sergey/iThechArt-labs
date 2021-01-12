using Homeexchange.Domain.Abstract;
using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Homeexchange.Models.Exceptions;

namespace Homeexchange.Services
{
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
        public PhysicalFileResult GetPrfileImg(int targetUserId, string webRootPath)
        {
            var user = userRepository.GetByIdAsync(targetUserId);
            int imgId = user.ProfileImgId;
            if(imgId <= 0)
            {
                throw new ImgNotFoundException("coldn't find the profile img");
            }

            var img = imgRepository.GetAsync(i => i.Id == imgId).FirstOrDefault();
            var path = img.Path;

            using (var fileStream = new FileStream(webRootPath + path, FileMode.Open))
            {
                var res = new PhysicalFileResult(webRootPath + path, "image/png");
                return res;
            }

            throw new Exception();
        }

        public async Task<IFormFile> Save(IFormFile formFIle, int commiterId, string webRootPath)
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
                var user = userRepository.GetAsync(u => u.Id == commiterId).FirstOrDefault();
                imgEnt = imgRepository.CreateAsync(imgEnt);
                user.ProfileImgId = imgEnt.Id;
                userRepository.Update(user);
            }

            return formFIle;
        }
    }
}
