using AutoMapper;
using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;

namespace Homeexchange.Api.Mapper
{
    public sealed class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterUserViewModel, User>()
                .ReverseMap();
            CreateMap<UpdateUserViewModel, User>()
                .ReverseMap();
        }
    }
}
