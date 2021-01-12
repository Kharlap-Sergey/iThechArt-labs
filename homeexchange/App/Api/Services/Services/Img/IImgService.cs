using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Homeexchange.Services
{
    public interface IImgService
    {
        public Task<IFormFile> Save(IFormFile formFIle, int commiterId, string webRootPath);
        public PhysicalFileResult GetPrfileImg(int targetUserId, string webRootPath);
    }
}
