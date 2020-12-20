using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HomeexchangeApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeexchangeApi.Controllers
{
    [Route("[controller]/{action}")]

    public class ImgController : Controller
    {
        readonly IImgService imgService;
        public ImgController(
            IImgService imgService
            )
        {
            this.imgService = imgService;
        }

        [HttpPost]
        [Authorize]
        public IActionResult AddFileAsync(IFormCollection uploadedFiles)
        {
            IFormFile uploadedFile = uploadedFiles.Files.FirstOrDefault();
            try
            {
                var file = imgService.Save(uploadedFile, GetUserId());
                var res = file.Result.Name;
                return Json(res);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpGet("userId")]
        public IActionResult Get(int userId)
        {
            try
            {
                var file = imgService.GetPrfileImg(userId);
                return Json(file);
            }
            catch(Exception e)
            {
                return null;
            }
        }

        int GetUserId()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}