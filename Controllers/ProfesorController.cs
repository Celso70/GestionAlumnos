using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using GestionAlumnos.Models;
using GestionAlumnos.Data;

namespace GestionAlumnos.Controllers;

public class ProfesorController : Controller
{
    private readonly ILogger<ProfesorController> _logger;
    private readonly ApplicationDbContext _context;

    public ProfesorController(ApplicationDbContext context, ILogger<ProfesorController> logger)
    {
        _context = context;
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public JsonResult ProfesoresBuscar(int Id = 0)
    {
        var ProfesoresListado = _context.Profesores?.ToList();
        if (Id > 0)
        {
            ProfesoresListado = ProfesoresListado?.Where(p => p.ProfesorID == Id).OrderBy(p =>p.ProfesorNombre).ToList();
        }
        return Json(ProfesoresListado);
    }

    public JsonResult ProfesorGuardar(int id, string profesornombre, DateTime profesornacimiento, int profesordni, string profesordireccion, string profesoremail)
    {
        var error = new ValidacionError();
        error.nonError = false;
        error.MsjError = "No se seleccionó ningún Profesor";

        if (!string.IsNullOrEmpty(profesornombre))
        {
            profesornombre = profesornombre.ToUpper();
            if (id == 0)
            {
                var ProfesorYaExiste = _context.Profesores?.Where(p => p.ProfesorDNI == profesordni).FirstOrDefault();
                if (ProfesorYaExiste == null)
                {
                    var ProfesorGuardar = new Profesor{
                        ProfesorNombre = profesornombre,
                        ProfesorNacimiento = profesornacimiento,
                        ProfesorDNI = profesordni,
                        ProfesorDireccion = profesordireccion,
                        ProfesorEmail = profesoremail
                    };
                    _context.Add(ProfesorGuardar);
                    _context.SaveChanges();
                    error.nonError = true;
                }
                else
                {
                    error.nonError = false;
                    error.MsjError = "Ya existe un profesor con ese DNI";
                }
            }
            else{
                var ProfesorYaExiste = _context.Profesores?.Where(p => p.ProfesorDNI == profesordni && p.ProfesorID != id).FirstOrDefault();
                if (ProfesorYaExiste == null)
                {
                    var ProfesorEditar = _context.Profesores?.Find(id);
                    if (ProfesorEditar != null)
                    {
                        ProfesorEditar.ProfesorNombre = profesornombre;
                        ProfesorEditar.ProfesorNacimiento = profesornacimiento;
                        ProfesorEditar.ProfesorDNI = profesordni;
                        ProfesorEditar.ProfesorDireccion = profesordireccion;
                        ProfesorEditar.ProfesorEmail = profesoremail;
                        _context.SaveChanges();
                        error.nonError = true;
                    }
                }
                else{
                    error.nonError = false;
                    error.MsjError = "Imposible editar, ya existe un profesor con ese dni";
                }
            }
        }
        return Json(error);
    }

public JsonResult ProfesorEliminar(int id)
{
    var error = new ValidacionError();
    error.nonError = false;
    error.MsjError= "No se seleccionó ningún Profesor";

    if (id != 0)
    {
        var ProfesorYaExiste = _context.Profesores.Find(id);
        if (ProfesorYaExiste?.Eliminado ==false)
        {
            ProfesorYaExiste.Eliminado = true;
            _context.SaveChanges();
            error.nonError = true;
        }
        else{
            ProfesorYaExiste.Eliminado = false;
            _context.SaveChanges();
            error.nonError = true;
        }
    }
    return Json(error);
}
    

    public JsonResult ProfesorRemover(int id){
        var error = new ValidacionError();
        error.nonError = false;
        error.MsjError = "No se seleccionó ningun profesor";
        if (id > 0)
        {
            var ProfesorRemover = _context.Profesores?.Find(id);
            _context.Remove(ProfesorRemover);
            _context.SaveChanges();
            error.nonError = true;
            error.MsjError = "Profesor eliminado correctamente";
            
        }
        return Json(error);
    }  
    }