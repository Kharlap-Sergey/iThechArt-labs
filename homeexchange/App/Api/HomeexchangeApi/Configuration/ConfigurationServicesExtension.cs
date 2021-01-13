using Homeexchange.Domain.Abstract;
using Homeexchange.Domain.Concrete;
using Homeexchange.Models.Entities;
using Homeexchange.Models.ViewModels;
using Homeexchange.Services;
using Homeexchange.Services.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Homeexchange.Api.Configuration
{
    public static class ConfigurationServicesExtension
    {
        public static void InjectDependencies(this IServiceCollection services, Assembly[] assemblies)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            var typesFromAssemblies = assemblies.SelectMany(a => a.DefinedTypes.Where(t => t.GetCustomAttribute(typeof (IsServiceInterfaceAttribute))  != null )).ToList();
            foreach(Type type in typesFromAssemblies)
            {
                services.RegisterType(type, assemblies);
            }
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IChatService, ChatService>();
            services.AddScoped<IAdService, AdService>();
            //services.AddScoped<IAccounService, AccounService>();
            services.AddScoped<IRatingService, RatingService>();
            services.AddScoped<IImgService, ImgService>();
        }

        public static void RegisterType(this IServiceCollection services, Type t, Assembly[] assemblies,
               ServiceLifetime lifetime = ServiceLifetime.Transient)
        {
            var typesFromAssemblies = assemblies.SelectMany(a => a.DefinedTypes.Where(x => x.GetInterfaces().Contains(t)));
            foreach (var type in typesFromAssemblies)
                services.AddScoped(t, type);
        }
        public static void RegisterAllTypes<T>(this IServiceCollection services, Assembly[] assemblies,
               ServiceLifetime lifetime = ServiceLifetime.Transient)
        {
            var typesFromAssemblies = assemblies.SelectMany(a => a.DefinedTypes.Where(x => x.GetInterfaces().Contains(typeof(T))));
            foreach (var type in typesFromAssemblies)
                services.Add(new ServiceDescriptor(typeof(T), type, lifetime));
        }

        public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration Configuration)
        {
            //auth through jwt
            var section = Configuration.GetSection(JwtAuthOptions.SectionName);
            JwtAuthOptions.AUDIENCE = section["AUDIENCE"];
            JwtAuthOptions.ISSUER = section["ISSUER"];
            JwtAuthOptions.KEY = section["KEY"];
            JwtAuthOptions.LIFETIME = int.Parse(section["LIFETIME"]);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;

                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidIssuer = JwtAuthOptions.ISSUER,
                            ValidateAudience = true,
                            ValidAudience = JwtAuthOptions.AUDIENCE,
                            ValidateLifetime = true,
                            IssuerSigningKey = JwtAuthOptions.GetSymmetricSecurityKey(),
                            ValidateIssuerSigningKey = true,
                        };

                        options.Events = new JwtBearerEvents
                        {
                            OnMessageReceived = context =>
                            {
                                var accessToken = context.Request.Query["access_token"];

                                var path = context.HttpContext.Request.Path;
                                if (!string.IsNullOrEmpty(accessToken) &&
                                    (path.StartsWithSegments(Startup.NOTIFICATION_HUB_ROUTE)
                                    | path.StartsWithSegments(Startup.CHAT_HUB_ROUTE))
                                    )
                                {
                                    context.Token = accessToken;
                                }
                                return Task.CompletedTask;
                            }
                        };
                    });
        }
    }
}
