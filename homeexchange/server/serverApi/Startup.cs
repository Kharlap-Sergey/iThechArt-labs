using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using HomeexchangeApi.Domain;
using HomeexchangeApi.Domain.Abstract;
using HomeexchangeApi.Domain.Concrete;
using HomeexchangeApi.Hubs;
using HomeexchangeApi.Infrastructure;
using HomeexchangeApi.Models;
using HomeexchangeApi.Services;
using System.Threading.Tasks;
using HomeexchangeApi.Domain.Entities;
using System;
using System.Collections.Generic;

namespace HomeexchangeApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddScoped<IGenericRepository<User>, IGenericRepository<User>>();
            services.AddScoped<IGenericRepository<Ad>, IGenericRepository<Ad>>();
            services.AddScoped<IGenericRepository<Notification>, IGenericRepository<Notification>>();
            services.AddScoped<IGenericRepository<ResponseToAd>, IGenericRepository<ResponseToAd>>();
            services.AddScoped<IGenericRepository<Chat>, IGenericRepository<Chat>>();
            services.AddScoped<IGenericRepository<ChatMessage>, IGenericRepository<ChatMessage>>();
            services.AddScoped<IGenericRepository<ChatMember>, IGenericRepository<ChatMember>>();
            services.AddScoped<IGenericRepository<PrivateRoom>, IGenericRepository<PrivateRoom>>();
            services.AddScoped<IGenericRepository<Rating>, IGenericRepository<Rating>>();


            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IChatService, ChatService>();
            services.AddScoped<IAdService, AdService>();
            services.AddScoped<IAccounService, AccounService>();
            services.AddScoped<IRatingService, RatingService>();
            //db connect
            string connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<CustomDbContext>(options =>
              options.UseSqlServer(connection));

            //auth trow jwt
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        //будет ли использоваться ssl !!!!! только для тестирования
                        options.RequireHttpsMetadata = false;

                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            // укзывает, будет ли валидироваться издатель при валидации токена
                            ValidateIssuer = true,
                            // строка, представляющая издателя
                            ValidIssuer = AuthOptions.ISSUER,
                            // будет ли валидироваться потребитель токена
                            ValidateAudience = true,
                            // установка потребителя токена
                            ValidAudience = AuthOptions.AUDIENCE,
                            // будет ли валидироваться время существования
                            ValidateLifetime = true,
                            // установка ключа безопасности
                            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                            // валидация ключа безопасности
                            ValidateIssuerSigningKey = true,
                        };

                        options.Events = new JwtBearerEvents
                        {
                            OnMessageReceived = context =>
                            {
                                var accessToken = context.Request.Query["access_token"];

                                // если запрос направлен хабу
                                var path = context.HttpContext.Request.Path;
                                if (!string.IsNullOrEmpty(accessToken) &&
                                    (path.StartsWithSegments("/hub/notification")
                                    | path.StartsWithSegments("/hub/chat"))
                                    )
                                {
                                    // получаем токен из строки запроса
                                    context.Token = accessToken;
                                }
                                return Task.CompletedTask;
                            }
                        };
                    });

            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });

            services.AddSignalR();
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseHttpsRedirection();

            app.UseRouting();
            //include CORS
            app.UseCors(builder => builder.WithOrigins("http://localhost:3000").AllowCredentials()
                            .AllowAnyMethod()
                            .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotificationHub>("/hub/notification",
                    options =>
                    {
                        options.Transports = HttpTransportType.ServerSentEvents;
                    });
                endpoints.MapHub<ChatHub>("/hub/chat",
                    options =>
                    {
                        options.Transports = HttpTransportType.WebSockets;
                    });
            });
        }
    }
}
