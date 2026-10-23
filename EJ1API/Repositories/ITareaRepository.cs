using EJ1API.DTO;

namespace EJ1API.Repositories;

public interface ITareaRepository
{
    Task<IReadOnlyCollection<TareaDto>> ListarAsync(
        CancellationToken cancellationToken = default);

    Task<TareaDto> CrearAsync(
        TareaDto tarea,
        CancellationToken cancellationToken = default);
}
