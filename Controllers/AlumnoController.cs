using System.Diagnostics;
 using Microsoft.AspNetCore.Mvc;
 using GestionAlumnos.Data;
 using GestionAlumnos.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace GestionAlumnos.Controllers;

 public class AlumnoController : Controller
 {
    private readonly ILogger<AlumnoController> _logger;
    private readonly ApplicationDbContext _context;


     public AlumnoController(ApplicationDbContext context, ILogger<AlumnoController> logger)
     {
        _context = context;
         _logger = logger;
     }

     public IActionResult Index()
     {
         var Carrera = _context.Carreras?.Where(c => c.Eliminado == false).ToList();
        ViewBag.CarreraID = new SelectList(Carrera?.OrderBy(a => a.CarreraNombre), "CarreraID", "CarreraNombre");
         return View();
        
     }


    public JsonResult AlumnosBuscar(int Id = 0)
    {
        var AlumnosListado = _context.Alumnos?.ToList();
        if (Id > 0)
        {
            AlumnosListado = AlumnosListado?.Where(a => a.AlumnoID ==Id ).OrderBy(a =>a.AlumnoNombre).ToList();
        }
        return Json(AlumnosListado);
    }


    public JsonResult AlumnoGuardar(int Id, string alumnonombre, DateTime alumnonacimiento, int carreraid)
    {
        var error = new ValidacionError();
        error.nonError = false;
        error.MsjError = "Completar todos los campos";
        if (!string.IsNullOrEmpty(alumnonombre) && carreraid > 0)
        {
            alumnonombre = alumnonombre.ToUpper();
            error.nonError = false;
            error.MsjError = "Carrera no Encontrada";
            var CarreraYaExiste = _context.Carreras?.Where(c => c.CarreraID == carreraid).FirstOrDefault();
            if (CarreraYaExiste != null)
            {
                error.nonError = true;
                error.MsjError = "Alumno Creado Correctamente";
                if (Id == 0)
                {
                    var Alumno = new Alumno{
                        AlumnoNombre = alumnonombre,
                        AlumnoNacimiento = alumnonacimiento,
                        CarreraID = CarreraYaExiste.CarreraID,
                        CarreraNombre = CarreraYaExiste.CarreraNombre,
                        Eliminado = false
                    };
                    _context.Alumnos.Add(Alumno);
                    _context.SaveChanges();
                }else{
                    var Alumno = _context.Alumnos.Where(a => a.AlumnoID == Id).FirstOrDefault();
                    if (Alumno != null)
                    {
                        Alumno.AlumnoNombre = alumnonombre;
                        Alumno.AlumnoNacimiento = alumnonacimiento;
                        Alumno.CarreraID = CarreraYaExiste.CarreraID;
                        Alumno.CarreraNombre = CarreraYaExiste.CarreraNombre;
                        _context.SaveChanges();
                    }
                }
            }
            
        }
        return Json(error);
    }

    public JsonResult AlumnoEliminar(int id){
        var error = new ValidacionError();
        error.nonError = false;
        error.MsjError = "No se seleccionó ningún Alumno";

        if (id != 0)
        {   
            
            var AlumnoExiste = _context.Alumnos?.Find(id);
            if (AlumnoExiste?.Eliminado == false)
            {
                AlumnoExiste.Eliminado = true;
                _context.SaveChanges();
                error.nonError = true;
                error.MsjError = "Alumno Deshabilitado";
            }
            else{
                AlumnoExiste.Eliminado = false;
                _context.SaveChanges();
                error.nonError = true;
                error.MsjError = "Alumno Habilitado";
            }
        }
        return Json(error);
    }

    public JsonResult AlumnoRemover(int id){
        var error = new ValidacionError();
        error.nonError = false;
        error.MsjError = "No se seleccionó ningún Alumno";

        if (id > 0)
        {   
            var AlumnoRemover = _context.Alumnos?.Find(id);
            
            _context.Remove(AlumnoRemover);
            _context.SaveChanges();
            error.nonError = true;
            error.MsjError = "Alumno eliminado correctamente";
            return Json(error);
            
        }
        return Json(error);
    }
    
     }