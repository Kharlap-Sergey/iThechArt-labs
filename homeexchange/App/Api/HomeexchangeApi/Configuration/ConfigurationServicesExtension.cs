using Homeexchange.Domain;
using Homeexchange.Domain.Abstract;
using Homeexchange.Domain.Concrete;
using Homeexchange.Models.Entities;
using Homeexchange.Services.Configuration;
using Homeexchange.Services.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Homeexchange.Api.Configuration
{
    public static class ConfigurationServicesExtension
    {
        public static IServiceCollection InjectDependencies(
            this IServiceCollection services
            )
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            List<Assembly> assemblies = new List<Assembly>();
            string path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            foreach ( string dll in Directory.GetFiles( path, "*homeexchange*.dll" ) )
                assemblies.Add( Assembly.LoadFrom( dll ) );

            services.InjectServiсes(assemblies);

            return services;
        }

        public static IServiceCollection InjectServiсes(
            this IServiceCollection services,
            List<Assembly> assemblies
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

            return services;
        }

        public static IServiceCollection AddAndConfigureAuthenticationThrowJwt(
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

            return services;
        }

        public static IServiceCollection AddAndConfigureIdentity(
            this IServiceCollection services
            )
        {
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 1;

                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                // User settings.
                options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = false;
            });

            services.AddIdentity<User, Role>()
                   .AddEntityFrameworkStores<CustomDbContext>()
                   .AddDefaultTokenProviders();

            return services;
        }
    }
}
