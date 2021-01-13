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

            services.InjectServiсes(assemblies);
        }

        public static void InjectServiсes(this IServiceCollection services,Assembly[] assemblies)
        {
            var typesFromAssemblies = assemblies.SelectMany(a => a.DefinedTypes).ToList();
            typesFromAssemblies = typesFromAssemblies.Where(t => t.CustomAttributes.ToList().Count > 0).ToList();
            var T = typeof(IsServiceImplementationAttribute);
            var typesFromAssemblies1 = typesFromAssemblies.Select(t => new { t, atr = t.GetCustomAttribute(typeof(IsServiceImplementationAttribute)) }).ToList();
            foreach (var type in typesFromAssemblies)
            {
                IsServiceImplementationAttribute attr = type.GetCustomAttribute<IsServiceImplementationAttribute>();
                services.Add(new ServiceDescriptor(attr.ServiceType, type, attr.Lifetime));
            }
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
