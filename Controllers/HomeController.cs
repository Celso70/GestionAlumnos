using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using GestionAlumnos.Models;
using GestionAlumnos.Data;
namespace GestionAlumnos.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    private readonly ApplicationDbContext _context;
    private readonly RoleManager<IdentityRole> _rolManager;

    public HomeController(ApplicationDbContext context, ILogger<HomeController> logger,RoleManager<IdentityRole> rolManager)
    {   _context = context;
        _logger = logger;
        _rolManager = rolManager;
    }

    public async Task <IActionResult> Index()
    {   
        await IniciarRoles();
        return View();
    }

    public async Task <JsonResult> IniciarRoles()
    {
        bool Creado = false;
        var profesorexiste = _context.Roles.Where(p => p.Name == "Profesores").SingleOrDefault();
        if (profesorexiste == null)
        {
            var profesorcreado = await _rolManager.CreateAsync(new IdentityRole("Profesores")); 
        }

        var estudianteexiste = _context.Roles.Where(e => e.Name == "Estudiantes").SingleOrDefault();
        if (estudianteexiste == null)
        {
            var estudiantecreado = await _rolManager.CreateAsync(new IdentityRole("Estudiantes")); 
        }

        var adminexiste = _context.Roles.Where(a => a.Name == "Administrador").SingleOrDefault();
        if (adminexiste == null)
        {
            var admincreado = await _rolManager.CreateAsync(new IdentityRole("Administrador")); 
        }
        return Json(Creado);
    }
    
    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
