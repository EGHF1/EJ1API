using EJ1API.Services;
using EJ1API.Validators;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace EJ1API.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddValidatorsFromAssemblyContaining<CreateTareaValidator>();
        services.AddScoped<ITareaService, TareaService>();
        return services;
    }
}
