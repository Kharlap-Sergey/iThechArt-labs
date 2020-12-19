﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeexchangeApi.Controllers
{
    [Route("[controller]/{action}")]

    public class ImgController : Controller
    {
        readonly IWebHostEnvironment appEnvironment;
        public ImgController(
            IWebHostEnvironment appEnvironment
            )
        {
            this.appEnvironment = appEnvironment;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddFile(IFormFile uploadedFile)
        {
            if (uploadedFile != null)
            {
                // путь к папке Files
                string path = "/Files/" + uploadedFile.FileName;
                // сохраняем файл в папку Files в каталоге wwwroot
                using (var fileStream = new FileStream(appEnvironment.WebRootPath + path, FileMode.Create))
                {
                    await uploadedFile.CopyToAsync(fileStream);
                }
                //load to db
                //FileModel file = new FileModel { Name = uploadedFile.FileName, Path = path };
                //_context.Files.Add(file);
                //_context.SaveChanges();
            }

            return Ok();
        }

        int GetUserId()
        {
            return int.Parse(User.Identity.Name);
        }
    }
}