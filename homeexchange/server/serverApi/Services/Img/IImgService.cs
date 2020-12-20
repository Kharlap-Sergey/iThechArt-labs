using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Services
{
    public interface IImgService
    {
        public Task<IFormFile> Save(IFormFile formFIle, int commiterId);
        public Task<IFormFile> GetPrfileImg(int targetUserId);
    }
}
