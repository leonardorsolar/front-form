using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging; // Adicione esta importação
using MyApiProject.Data;
using MyApiProject.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MyApiProject.Controllers
{
    // [Route("api/[controller]")]
    // [Route("[controller]")] // Remove o prefixo "api"
    [Route("")] // Rota para a raiz da aplicação
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UserController> _logger; // Adicione o logger

        public UserController(ApplicationDbContext context, ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger; // Inicialize o logger
        }

        // GET: api/User
        [HttpGet]
        public IActionResult GetWelcomeMessage()
        {
            return Ok("Olá, Mundo! Bem-vindo ao .NET Core com C#!");
        }

        // POST: api/User
        [HttpPost("criar-usuario")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            // Log de entrada
            _logger.LogInformation("Tentativa de criar usuário: {@User}", user);

            if (_context.Users.Any(u => u.Email == user.Email))
            {
                _logger.LogWarning("Tentativa de cadastrar e-mail já existente: {Email}", user.Email);
                return Conflict(new { error = "E-mail já cadastrado" });
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Usuário criado com sucesso com o ID: {UserId}", user.Id);
            return CreatedAtAction(nameof(CreateUser), new { id = user.Id }, user);
        }
    }
}
