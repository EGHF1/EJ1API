using EJ1API.DTO;
using EJ1API.Repositories;
using FluentValidation;

namespace EJ1API.Services;

public sealed class TareaService : ITareaService
{
    private readonly ITareaRepository _repository;
    private readonly IValidator<CreateTareaRequest> _validator;

    public TareaService(
        ITareaRepository repository,
        IValidator<CreateTareaRequest> validator)
    {
        _repository = repository;
        _validator = validator;
    }

    public async Task<Result<IReadOnlyCollection<TareaDto>>> ListarAsync(
        CancellationToken cancellationToken = default)
    {
        var tareas = await _repository.ListarAsync(cancellationToken);
        return Result<IReadOnlyCollection<TareaDto>>.Success(tareas);
    }

    public async Task<Result<TareaDto>> CrearAsync(
        CreateTareaRequest request,
        CancellationToken cancellationToken = default)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            return Result<TareaDto>.Failure(
                validationResult.Errors.Select(error => error.ErrorMessage));
        }

        var tarea = new TareaDto
        {
            Titulo = request.Titulo,
            Descripcion = request.Descripcion,
            FechaInicio = request.FechaInicio,
            FechaFin = request.FechaFin,
            CategoriaId = request.CategoriaId
        };

        var createdTarea = await _repository.CrearAsync(tarea, cancellationToken);
        return Result<TareaDto>.Success(createdTarea);
    }
}
