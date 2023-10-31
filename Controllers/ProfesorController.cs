using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using GestionAlumnos.Models;
using GestionAlumnos.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace GestionAlumnos.Controllers;

[Authorize]
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
        var Asignatura = _context.Asignaturas?
        .ToList();
        ViewBag.AsignaturaID
         = new SelectList (Asignatura?
         .OrderBy(p => p.AsignaturaNombre),
         "AsignaturaID",
         "AsignaturaNombre");

    return View();
    }
    ///////PROFESORESASIGNATURAS-INICIO/////////////
        public JsonResult ProfesoresAsignaturasBuscar(int ProfesorAsignaturaID = 0){
        
        List<DetalleProfesorAsignatura> detalleprofesorasignatura = new List<DetalleProfesorAsignatura>();

        var asignaturas = _context.ProfesoresAsignaturas.Where(p => p.ProfesorID == ProfesorAsignaturaID).ToList();


        foreach (var asignatura in asignaturas.OrderBy(a => a.AsignaturaID).ToList())
        {
            var asignaturanombre = _context.Asignaturas.Where(c => c.AsignaturaID == asignatura.AsignaturaID).Select(c => c.AsignaturaNombre).SingleOrDefault();

            var detalleProfesorAsignatura = new DetalleProfesorAsignatura
                {
                    ProfesorID = asignatura.ProfesorID,
                    AsignaturaID = asignatura.AsignaturaID,
                    ProfesorAsignaturaID = asignatura.ProfesorAsignaturaID,
                    AsignaturaNombre = asignaturanombre,
                };
            detalleprofesorasignatura.Add(detalleProfesorAsignatura);
        }
        return Json(detalleprofesorasignatura);
    }

    public JsonResult ProfesoresAsignaturasGuardar(int ProfesorID, int AsignaturaID)
    {
        bool resultado = false;

        var asignaturaencontrar = _context.ProfesoresAsignaturas.Where(p => p.AsignaturaID == AsignaturaID).Count();
        if (asignaturaencontrar == 0)
        {
            var profesorasignaturaguardar = new ProfesorAsignatura
            {
                ProfesorID = ProfesorID,
                AsignaturaID = AsignaturaID,
            };
            _context.Add(profesorasignaturaguardar);
            _context.SaveChanges();
            resultado = true;
        }
        return Json(resultado);

    }
    public JsonResult ProfesoresAsignaturasEliminar(int ProfesorAsignaturaID)
    {
        bool resultado = false;

        var profesorasignaturaeliminar = _context.ProfesoresAsignaturas.FirstOrDefault(p => p.ProfesorAsignaturaID == ProfesorAsignaturaID);

        if (profesorasignaturaeliminar != null)
        {
            _context.ProfesoresAsignaturas.Remove(profesorasignaturaeliminar);
            _context.SaveChanges();
            resultado = true;
        }
        return Json(resultado);
    }
 ///////PROFESORESASIGNATURAS-FIN/////////////
 
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