using AutoMapper;
using Homeexchange.Api.ViewModels;
using Homeexchange.Models.Entities;
using Homeexchange.Models.Requests;
using Homeexchange.Models.Shared;
using Homeexchange.Models.ViewModels;
using Homeexchange.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Homeexchange.Api.Controllers
{
    [Route( "[controller]/{action}" )]
    public sealed class AdController : BaseController
    {
        private readonly IAdService adService;
        private readonly IMapper mapper;

        public AdController(
            IAdService adService,
            IMapper mapper
            )
        {
            this.adService = adService;
            this.mapper = mapper;
        }

        [HttpGet( "{id}" )]
        public async Task<IActionResult> Get( int id )
        {
            Ad ad = await adService.FindByIdAsync(id);
            return Json( ad );
        }

        [HttpPost]
        public async Task<IActionResult> GetAdsPage( 
            [FromBody] GetPageRequest<AdFilter> request 
            )
        {
            Page<Ad> page = await adService.GetAdsPageAsync(request.Page, request.Filter);
            var adsPage = mapper.Map<AdsPageViewModel>(page);

            return Json( adsPage );
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create( 
            [FromBody] AdViewModel model 
            )
        {
            int authorId = GetCommitterId();
            Ad ad = mapper.Map<Ad>(model);
            ad = await adService.CreateAsync( ad, authorId );
            return Json( ad );
        }

        [Authorize]
        [HttpPost( "{adId}" )]
        public async Task<IActionResult> Reply( int adId )
        {
            int userId = GetCommitterId();
            Ad ad = await adService.FindByIdAsync(adId);
            return Json( await adService.ReplyOnAdAsync( ad, userId ) );
        }

        [Authorize]
        [HttpDelete( "{adId}" )]
        public async Task<IActionResult> Delete( int adId )
        {
            int userId = GetCommitterId();
            await adService.DeleteAsync( adId, userId );
            return Ok();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Update( 
            [FromBody] UpdateAdViewModel model
            )
        {
            int userId = GetCommitterId();
            Ad ad = mapper.Map<Ad>(model);
            await adService.UpdateAsync( ad, userId );

            return Ok();
        }
    }
}
