using System.Linq;
using System.Threading.Tasks;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Homeexchange.Api.Controllers
{
    [Route("[controller]/{action}")]

    public class ImgController : BaseController
    {
        readonly IImgService imgService;
        readonly IWebHostEnvironment webHostEnviroment; 
        public ImgController(
            IImgService imgService,
            IWebHostEnvironment webHostEnviroment
            )
        {
            this.imgService = imgService;
            this.webHostEnviroment = webHostEnviroment;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddFile(IFormCollection uploadedFiles)
        {
            IFormFile uploadedFile = uploadedFiles.Files.FirstOrDefault();
            var file = await imgService.SaveAsync(uploadedFile, GetCommitterId(), webHostEnviroment.WebRootPath);
            var res = file.Name;
            return Json(res);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(int userId)
        {

            PhysicalFileResult file = await imgService.GetPrfileImgAsync(userId, webHostEnviroment.WebRootPath);
            return file;
        }
    }
}