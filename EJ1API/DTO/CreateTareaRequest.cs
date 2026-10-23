namespace EJ1API.DTO;

public class CreateTareaRequest
{
    public string Titulo { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public DateTime FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
    public int CategoriaId { get; set; }
}