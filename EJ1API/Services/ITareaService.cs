using EJ1API.DTO;

namespace EJ1API.Services;

public interface ITareaService
{
    Task<Result<IReadOnlyCollection<TareaDto>>> ListarAsync(
        CancellationToken cancellationToken = default);

    Task<Result<TareaDto>> CrearAsync(
        CreateTareaRequest request,
        CancellationToken cancellationToken = default);
}
