using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using GestionAlumnos.Models;
using GestionAlumnos.Data;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Authorization;
using GestionTareas.Models;

namespace GestionAlumnos.Controllers;

[Authorize]
public class TareaController : Controller


{
    private readonly ILogger<TareaController> _logger;

    private readonly ApplicationDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;
    

    public TareaController(ApplicationDbContext context, ILogger<TareaController> logger, UserManager<IdentityUser> userManager)
    {   _context = context;
        _logger = logger;
        _userManager = userManager;
    }

    public  IActionResult Index()
    {   
        var asignaturas = _context.Asignaturas.ToList();
        asignaturas.Add(new Asignatura{AsignaturaID = 0, AsignaturaNombre = "[SELECCIONAR ASIGNATURA]"});
        ViewBag.AsignaturaID = new SelectList(asignaturas.OrderBy(c => c.AsignaturaNombre), "AsignaturaID", "AsignaturaNombre");

        return View();
    }

    public JsonResult TareasBuscar(int Id = 0){

        var TareasListado = _context.Tareas?.ToList();
        if (Id > 0)
        {
            TareasListado = TareasListado?.Where(t => t.TareaID == Id).OrderBy(t =>t.AsignaturaID).ToList();

        }
        return Json(TareasListado);
    }

    }

    