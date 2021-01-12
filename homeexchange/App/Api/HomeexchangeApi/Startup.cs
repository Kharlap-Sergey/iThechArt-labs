using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Homeexchange.Domain;
using Homeexchange.Domain.Abstract;
using Homeexchange.Domain.Concrete;
using Homeexchange.Api.Hubs;
using Homeexchange.Services;
using System.Threading.Tasks;
using Homeexchange.GlobalErrorHandling;
using Homeexchange.Models.ViewModels;
using Homeexchange.Models.Entities;
using Homeexchange.Services.Infrastructure;

namespace Homeexchange.Api
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

            services.AddScoped<IGenericRepository<User>, GenericRepository<User>>();
            services.AddScoped<IGenericRepository<Ad>, GenericRepository<Ad>>();
            services.AddScoped<IGenericRepository<Notification>, GenericRepository<Notification>>();
            services.AddScoped<IGenericRepository<ResponseToAd>, GenericRepository<ResponseToAd>>();
            services.AddScoped<IGenericRepository<Chat>, GenericRepository<Chat>>();
            services.AddScoped<IGenericRepository<ChatMessage>, GenericRepository<ChatMessage>>();
            services.AddScoped<IGenericRepository<ChatMember>, GenericRepository<ChatMember>>();
            services.AddScoped<IGenericRepository<PrivateRoom>, GenericRepository<PrivateRoom>>();
            services.AddScoped<IGenericRepository<Rating>, GenericRepository<Rating>>();
            services.AddScoped<IGenericRepository<Img>, GenericRepository<Img>>();


            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IChatService, ChatService>();
            services.AddScoped<IAdService, AdService>();
            services.AddScoped<IAccounService, AccounService>();
            services.AddScoped<IRatingService, RatingService>();
            services.AddScoped<IImgService, ImgService>();
            //db connect
            string connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<CustomDbContext>(options =>
              options.UseSqlServer(connection));

            //auth trow jwt
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        //����� �� �������������� ssl !!!!! ������ ��� ������������
                        options.RequireHttpsMetadata = false;

                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            // ��������, ����� �� �������������� �������� ��� ��������� ������
                            ValidateIssuer = true,
                            // ������, �������������� ��������
                            ValidIssuer = AuthOptions.ISSUER,
                            // ����� �� �������������� ����������� ������
                            ValidateAudience = true,
                            // ��������� ����������� ������
                            ValidAudience = AuthOptions.AUDIENCE,
                            // ����� �� �������������� ����� �������������
                            ValidateLifetime = true,
                            // ��������� ����� ������������
                            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                            // ��������� ����� ������������
                            ValidateIssuerSigningKey = true,
                        };

                        options.Events = new JwtBearerEvents
                        {
                            OnMessageReceived = context =>
                            {
                                var accessToken = context.Request.Query["access_token"];

                                // ���� ������ ��������� ����
                                var path = context.HttpContext.Request.Path;
                                if (!string.IsNullOrEmpty(accessToken) &&
                                    (path.StartsWithSegments("/hub/notification")
                                    | path.StartsWithSegments("/hub/chat"))
                                    )
                                {
                                    // �������� ����� �� ������ �������
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
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.ConfigureExceptionHandler();
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
