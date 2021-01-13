using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    public interface IImageService
    {
        public Task<IFormFile> SaveAsync(IFormFile formFIle, int commiterId, string webRootPath);
        public Task<PhysicalFileResult> GetPrfileImgAsync(int targetUserId, string webRootPath);
    }
}
