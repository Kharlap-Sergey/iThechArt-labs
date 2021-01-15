using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]

    public sealed class ImgController : BaseController
    {
        private readonly IImageService imgService;
        private readonly string rootPath;
        public ImgController(
            IImageService imgService,
            IWebHostEnvironment webHostEnviroment,
            IConfiguration configuration
            )
        {
            this.imgService = imgService;
            this.rootPath = webHostEnviroment.WebRootPath + configuration["Path:Imps"];
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddFile(IFormCollection uploadedFiles)
        {
            int committerId = GetCommitterId();
            IFormFile uploadedFile = 
                uploadedFiles.Files.FirstOrDefault();
            IFormFile file = 
                await imgService.SaveAsync(uploadedFile, committerId, rootPath);
            return Json(file.Name);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(int userId)
        {

            PhysicalFileResult file = 
                await imgService.GetPrfileImgAsync(userId, rootPath);
            return file;
        }
    }
}