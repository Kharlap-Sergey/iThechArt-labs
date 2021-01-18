using AutoMapper;
using Homeexchange.Api.ViewModels;
using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;

namespace Homeexchange.Api.Mapper
{
    public sealed class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterUserViewModel, User>()
                .ForMember(
                    dest => dest.UserName,
                    o => o.MapFrom( src => src.Email ) )
                .ReverseMap();
            CreateMap<UpdateUserViewModel, User>()
                .ReverseMap();
            CreateMap<UpdateAdViewModel, Ad>()
                .ReverseMap();
            CreateMap<AdViewModel, Ad>()
                .ReverseMap();
            CreateMap<SetRatingViewModel, Rating>()
                .ReverseMap();
            CreateMap<Page<Ad>, AdsPageViewModel>()
                .ForMember(
                    dest => dest.Ads, 
                    o => o.MapFrom( src => src.Content ) )
                .ForMember(
                    dest => dest.HasNext, 
                    o => o.MapFrom( src => src.Info.HasNextPage ) )
                .ForMember(
                    dest => dest.HasPrevious, 
                    o => o.MapFrom( src => src.Info.HasPreviousPage ) )
                .ReverseMap();
        }
    }
}
