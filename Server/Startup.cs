using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Net.WebSockets;
using OurLunch.Interfaces;
using OurLunch.WebSockets;

namespace OurLunch
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.AddMvc();

            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("CorsPolicy"));
            });

            services.AddSingleton(typeof(IWebSocketHandler), typeof(WebSocketHandler));
        }

        public void Configure(IApplicationBuilder app, IWebSocketHandler handler)
        {
            app.UseAuthentication();

            app.UseCors("CorsPolicy");

            app.UseWebSockets();

            app.UseMvc();

            app.Use(async (context, next) =>
            {
                if (context.WebSockets.IsWebSocketRequest)
                {
                    var webSocket = await context.WebSockets.AcceptWebSocketAsync();
                    handler.OnConnected(webSocket);
                    await handler.ListenForDisconnection(webSocket);
                }
                else
                {
                    await next();
                }
            });
        }
    }
}