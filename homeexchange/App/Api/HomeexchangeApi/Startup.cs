using AutoMapper;
using Homeexchange.Api.Configuration;
using Homeexchange.Api.Hubs;
using Homeexchange.Api.Mapper;
using Homeexchange.Domain;
using Homeexchange.GlobalErrorHandling;
using Homeexchange.Models.Entities;
using Homeexchange.Services;
using Homeexchange.Services.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Linq;

namespace Homeexchange.Api
{
    public class Startup
    {
        private readonly IConfiguration Configuration;
        public const string CHAT_HUB_ROUTE = "/hub/chat";
        public const string NOTIFICATION_HUB_ROUTE = "/hub/notification";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            //own extension to implement DI
          
            services.InjectDependencies();

            //db connect
            string connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<CustomDbContext>(options =>
              options.UseSqlServer(connection));

            //Identity own extension
            services.AddAndConfigureIdentity();

            services.AddIdentityServer()
                // this adds the operational data from DB (codes, tokens, consents)
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = builder => builder.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
                    // this enables automatic token cleanup. this is optional.
                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 30000; // interval in seconds
                })
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients())
                .AddAspNetIdentity<User>();

            //authentication own extension
            services.AddAndConfigureAuthenticationThrowJwt(Configuration);

            services.AddAndConfigureAutoMapper();

            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });

            services.AddSignalR();
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.ConfigureExceptionHandler();
            app.UseHttpsRedirection();
            app.UseRouting();

            //include CORS
            string host = Configuration["Cors:AvailabelHosts"];
            app.UseCors(builder => builder.WithOrigins(host).AllowCredentials()
                            .AllowAnyMethod()
                            .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseIdentityServer();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotificationHub>(
                    NOTIFICATION_HUB_ROUTE,
                    options =>
                    {
                        options.Transports = HttpTransportType.ServerSentEvents;
                    });
                endpoints.MapHub<ChatHub>(
                    CHAT_HUB_ROUTE,
                    options =>
                    {
                        options.Transports = HttpTransportType.WebSockets;
                    });
            });
        }
    }
}
