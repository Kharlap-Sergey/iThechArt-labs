using AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace Homeexchange.Api.Mapper
{
    public static class MapperConfigurationExtension
    {
        public static IServiceCollection AddAndConfigureAutoMapper(this IServiceCollection services)
        {
            var mapperConfig = new MapperConfiguration(mc =>
             {
                 mc.AddProfile(new MappingProfile());
             });

            services.AddAutoMapper(typeof(MappingProfile));

            return services;
        }
    }
}
