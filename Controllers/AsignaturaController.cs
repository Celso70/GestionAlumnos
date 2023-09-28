using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using GestionAlumnos.Models;
using GestionAlumnos.Data;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authorization;

namespace GestionAlumnos.Controllers;

[Authorize]
public class AsignaturaController : Controller
{
    private readonly ILogger<AsignaturaController> _logger;
    private readonly ApplicationDbContext _context;

    public AsignaturaController(ApplicationDbContext context, ILogger<AsignaturaController> logger)
    {
        _context = context;
        _logger = logger;
    }

    public IActionResult Index()
    {
    
        return View();
    }








    }
    
    