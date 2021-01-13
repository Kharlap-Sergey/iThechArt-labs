using System.Linq;
using System.Threading.Tasks;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]

    public class ImgController : BaseController
    {
        private readonly IImgService imgService;
        private readonly string rootPath; 
        public ImgController(
            IImgService imgService,
            IWebHostEnvironment webHostEnviroment,
            IConfiguration configuration
            )
        {
            this.imgService = imgService;
            this.rootPath = webHostEnviroment.WebRootPath + configuration["Path:img"];
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddFile(IFormCollection uploadedFiles)
        {
            IFormFile uploadedFile = uploadedFiles.Files.FirstOrDefault();
            var file = await imgService.SaveAsync(uploadedFile, GetCommitterId(), rootPath);
            var res = file.Name;
            return Json(res);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(int userId)
        {

            PhysicalFileResult file = await imgService.GetPrfileImgAsync(userId, rootPath);
            return file;
        }
    }
}