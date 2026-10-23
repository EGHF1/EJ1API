using System.Data;
using Dapper;
using EJ1API.DTO;
using EJ1API.Repositories;

namespace EJ1API.Infrastructure.Repositories;

public sealed class TareaRepository : BaseRepository, ITareaRepository
{
    public TareaRepository(IConfiguration configuration)
        : base(configuration)
    {
    }

    public async Task<IReadOnlyCollection<TareaDto>> ListarAsync(
        CancellationToken cancellationToken = default)
    {
        await using var connection = CreateConnection();
        var command = new CommandDefinition(
            "dbo.usp_Tarea_Listar",
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken);

        var tareas = await connection.QueryAsync<TareaDto>(command);
        return tareas.AsList();
    }

    public async Task<TareaDto> CrearAsync(
        TareaDto tarea,
        CancellationToken cancellationToken = default)
    {
        await using var connection = CreateConnection();
        var parameters = new
        {
            tarea.Titulo,
            tarea.Descripcion,
            tarea.FechaInicio,
            tarea.FechaFin,
            tarea.CategoriaId
        };
        var command = new CommandDefinition(
            "dbo.usp_Tarea_Crear",
            parameters,
            commandType: CommandType.StoredProcedure,
            cancellationToken: cancellationToken);

        var createdTarea = await connection.QuerySingleOrDefaultAsync<TareaDto>(command);
        return createdTarea ?? throw new InvalidOperationException(
            "dbo.usp_Tarea_Crear no devolvió la tarea creada.");
    }
}
