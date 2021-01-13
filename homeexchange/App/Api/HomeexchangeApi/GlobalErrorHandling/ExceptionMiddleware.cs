using Microsoft.AspNetCore.Http;
using System;
using System.Net;
using System.Threading.Tasks;
using Homeexchange.Models.Exceptions;

namespace Homeexchange.GlobalErrorHandling
{
    public sealed class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private static readonly log4net.ILog _log4net = log4net.LogManager.GetLogger(typeof(ExceptionMiddleware));
        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                ExceptionMiddleware._log4net.Error($"Processing request {ex}", ex);
                await HandleExceptionAsync(httpContext, ex);
            }
        }
        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            var statusCode = HttpStatusCode.InternalServerError;
            string message = "Somthing was incorrect";

            //code logic here
            if (exception is InvalidCredentialExeption)
            {
                var e = exception as InvalidCredentialExeption;
                message = e.Message;
                statusCode = HttpStatusCode.Unauthorized;
            }
            else if (exception is DuplicateEmailException)
            {
                var e = exception as DuplicateEmailException;
                message = "this email is already taken";
                statusCode = HttpStatusCode.Forbidden;
            }
            else if (exception is DuplicateNicknameException)
            {
                var e = exception as DuplicateEmailException;
                message = "this nickname is already taken";
                statusCode = HttpStatusCode.Forbidden;
            }
            else if (exception is UnauthorizedAccessException)
            {
                var e = exception as UnauthorizedAccessException;
                message = e.Message;
                statusCode = HttpStatusCode.Forbidden;
            }
            else if (exception is ImgNotFoundException)
            {
                var e = exception as ImgNotFoundException;
                message = e.Message;
                statusCode = HttpStatusCode.NotFound;
            }

            context.Response.StatusCode = (int)statusCode;
            return context.Response.WriteAsync(new ErrorDetails()
            {
                StatusCode = context.Response.StatusCode,
                Message = message
            }.ToString());
        }
    }
}
