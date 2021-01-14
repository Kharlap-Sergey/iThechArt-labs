namespace Homeexchange.Api.Mapper
{
    using AutoMapper;
    using Microsoft.Extensions.DependencyInjection;

    public static class MapperConfigurationExtension
    {
        public static void AddAutomapper(this IServiceCollection services)
        {
            var mapperConfig = new MapperConfiguration(mc =>
             {
                 mc.AddProfile(new MappingProfile());
             });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
        }
    }
}
