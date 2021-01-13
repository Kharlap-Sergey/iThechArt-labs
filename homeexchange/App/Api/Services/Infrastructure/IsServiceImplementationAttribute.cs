using Microsoft.Extensions.DependencyInjection;
using System;

namespace Homeexchange.Services.Infrastructure
{
    public class IsServiceImplementationAttribute : Attribute
    {
        public Type ServiceType { get; private set; }
        public ServiceLifetime Lifetime { get; private set; }
        public IsServiceImplementationAttribute(
            Type serviceType,
            ServiceLifetime lifetime = ServiceLifetime.Transient)
        {
            ServiceType = serviceType;
            Lifetime = lifetime;
        }
    }
}
