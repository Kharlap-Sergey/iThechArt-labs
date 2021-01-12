using System.Linq;
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
        public IActionResult AddFileAsync(IFormCollection uploadedFiles)
        {
            IFormFile uploadedFile = uploadedFiles.Files.FirstOrDefault();
            var file = imgService.SaveAsync(uploadedFile, GetCommitterId(), webHostEnviroment.WebRootPath);
            var res = file.Result.Name;
            return Json(res);
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {

            PhysicalFileResult file = imgService.GetPrfileImgAsync(userId, webHostEnviroment.WebRootPath);
            return file;
        }
    }
}