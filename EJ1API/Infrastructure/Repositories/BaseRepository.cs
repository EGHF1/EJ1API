using Microsoft.Data.SqlClient;

namespace EJ1API.Infrastructure.Repositories;

public abstract class BaseRepository
{
    private readonly string _connectionString;

    protected BaseRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException(
                "No se encontró la cadena de conexión 'DefaultConnection'.");
    }

    protected SqlConnection CreateConnection() =>
        new(_connectionString);
}
