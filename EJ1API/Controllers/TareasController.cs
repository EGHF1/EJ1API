using EJ1API.DTO;
using EJ1API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EJ1API.Controllers;

[ApiController]
[Route("api/v1/tareas")]
public sealed class TareasController : ControllerBase
{
    private readonly ITareaService _service;

    public TareasController(ITareaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Listar(CancellationToken cancellationToken)
    {
        var result = await _service.ListarAsync(cancellationToken);
        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> Crear(
        CreateTareaRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _service.CrearAsync(request, cancellationToken);
        if (!result.IsSuccess)
        {
            return BadRequest(new { errors = result.Errors });
        }

        return StatusCode(StatusCodes.Status201Created, result.Value);
    }
}
