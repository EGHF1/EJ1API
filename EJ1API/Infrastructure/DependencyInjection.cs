using EJ1API.Infrastructure.Repositories;
using EJ1API.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace EJ1API.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<ITareaRepository, TareaRepository>();
        return services;
    }
}
