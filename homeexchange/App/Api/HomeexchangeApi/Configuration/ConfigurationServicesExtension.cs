﻿namespace Homeexchange.Api.Configuration
{
    using Homeexchange.Domain.Abstract;
    using Homeexchange.Domain.Concrete;
    using Homeexchange.Services.Infrastructure;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;
    using System.Linq;
    using System.Reflection;
    using System.Threading.Tasks;

    public static class ConfigurationServicesExtension
    {
        public static void InjectDependencies(
            this IServiceCollection services,
            Assembly[] assemblies
            )
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            services.InjectServiсes(assemblies);
        }

        public static void InjectServiсes(
            this IServiceCollection services,
            Assembly[] assemblies
            )
        {
            var typesFromAssemblies = assemblies.SelectMany
                (
                    a =>
                        a.DefinedTypes
                        .Where
                        (
                            t =>
                                t.GetCustomAttribute(typeof(IsServiceImplementationAttribute)) != null
                        )
                ).ToList();

            foreach (var type in typesFromAssemblies)
            {
                IsServiceImplementationAttribute attr =
                    type.GetCustomAttribute<IsServiceImplementationAttribute>();
                services.Add(new ServiceDescriptor(attr.ServiceType, type, attr.Lifetime));
            }
        }

        public static void ConfigureAuthentication(
            this IServiceCollection services,
            IConfiguration Configuration
            )
        {
            //authorize through JWT
            IConfigurationSection section = Configuration.GetSection(JwtAuthOptions.SectionName);
            JwtAuthOptions.AUDIENCE = section["AUDIENCE"];
            JwtAuthOptions.ISSUER = section["ISSUER"];
            JwtAuthOptions.KEY = section["KEY"];
            JwtAuthOptions.LIFETIME = int.Parse(section["LIFETIME"]);

            services.AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                    .AddJwtBearer(options =>
                    {
                        options.SaveToken = true; 
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
                                string accessToken = context.Request.Query["access_token"];

                                PathString path = context.HttpContext.Request.Path;
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
