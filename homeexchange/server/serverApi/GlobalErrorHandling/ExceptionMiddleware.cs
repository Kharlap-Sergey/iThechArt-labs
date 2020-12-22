using HomeexchangeApi.Exceptions;
using HomeexchangeApi.GlobalErrorHandling.Models;
using HomeexchangeApi.Logger;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Authentication;
using System.Threading.Tasks;

namespace HomeexchangeApi.GlobalErrorHandling
{
    public sealed class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILoggerFactory loggerFactory;
        public ExceptionMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            _next = next;
            this.loggerFactory = loggerFactory;
        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                loggerFactory.AddFile(Path.Combine(Directory.GetCurrentDirectory(), "logger.txt"));
                var logger = loggerFactory.CreateLogger("FileLogger");
                logger.LogInformation("Processing request {0}", ex);
                var t = ex.GetType();
                await HandleExceptionAsync(httpContext, ex);
            }
        }
        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            int statusCode = (int)HttpStatusCode.InternalServerError;
            string message = "Internal Server Error from the custom middleware.";

            //code logic here
            if (exception is InvalidCredentialExeption)
            {
                var t = 1;
            }

            context.Response.StatusCode = statusCode;
            return context.Response.WriteAsync(new ErrorDetails()
            {
                StatusCode = context.Response.StatusCode,
                Message = message
            }.ToString());
        }
    }
}
