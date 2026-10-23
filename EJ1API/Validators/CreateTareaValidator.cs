using FluentValidation;
using EJ1API.DTO;

namespace EJ1API.Validators;

public sealed class CreateTareaValidator : AbstractValidator<CreateTareaRequest>
{
    public CreateTareaValidator()
    {
        RuleFor(request => request.Titulo)
            .NotEmpty()
            .MinimumLength(3)
            .MaximumLength(150);

        RuleFor(request => request.FechaFin)
            .GreaterThanOrEqualTo(request => request.FechaInicio)
            .When(request => request.FechaFin.HasValue);
    }
}
