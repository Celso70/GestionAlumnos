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
        var Carrera = _context.Carreras?
        .Where(c => c.Eliminado == false)
        .ToList();
        ViewBag.CarreraID = new SelectList(Carrera?.OrderBy(a => a.CarreraNombre), "CarreraID", "CarreraNombre");
        return View();
    }

    public JsonResult AsignaturasBuscar(int id = 0)
    {
        var AsignaturasListado = _context.Asignaturas?.ToList();
         if (id > 0)
        {
            AsignaturasListado = AsignaturasListado?
            .Where(a => a.AsignaturaID ==id )
            .OrderBy(a => a.CarreraNombre)
            .ThenBy(a => a.AsignaturaNombre)
            .ToList();
        }
        else{
            AsignaturasListado = AsignaturasListado?
            .OrderBy(a =>a.CarreraNombre)
            .ThenBy(a => a.AsignaturaNombre)
            .ToList();
        }
        return Json(AsignaturasListado);
    }

    public JsonResult AsignaturaGuardar(int id, string asignaturanombre, int carreraid){
        
        
        var error = new ValidacionError();
        error.nonError = false;
        error.MsjError = "No se seleccionó ninguna Asignatura";

        if (!string.IsNullOrEmpty(asignaturanombre) && carreraid > 0)
        {
            asignaturanombre = asignaturanombre.ToUpper();
            var CarreraYaExiste = _context.Carreras?.Where(c => c.CarreraID == carreraid).FirstOrDefault();
            if (CarreraYaExiste != null)
            {
                error.nonError = true;
                error.MsjError = "Existe Carrera";

                if (id == 0)
                {
                    var AsignaturaExiste = _context.Asignaturas?.Where(a => a.AsignaturaNombre == asignaturanombre).FirstOrDefault();
                    if (AsignaturaExiste == null)
                    {
                        var Asignatura = new Asignatura{
                            AsignaturaNombre = asignaturanombre,
                            CarreraID = CarreraYaExiste.CarreraID,
                            CarreraNombre = CarreraYaExiste.CarreraNombre,
                            Eliminado = false
                        };
                        _context.Add(Asignatura);
                        _context.SaveChanges();
                        error.nonError = true;
                    }
                    else
                    {
                        error.nonError = false;
                        error.MsjError = "Ya existe una Asignatura con ese Nombre";
                    }
                }
                else
                {
                    var AsignaturaExiste = _context.Asignaturas?.Where(a => a.AsignaturaNombre == asignaturanombre && a.AsignaturaID != id).FirstOrDefault();
                    if (AsignaturaExiste == null)
                    {
                        var Asignatura = _context.Asignaturas?.Find(id);
                        if (Asignatura != null)
                        {
                            Asignatura.AsignaturaNombre = asignaturanombre;
                            Asignatura.CarreraID = CarreraYaExiste.CarreraID;
                            _context.SaveChanges();
                            error.nonError = true;
                            error.MsjError = "Asignatura editada correctamente";
                        }
                    }
                    else
                    {
                        error.nonError = false;
                        error.MsjError = "Para editar debe ingresar una asignatura no existente!";
                    }
                }
            }
            
        }
        return Json(error);

    }

    public JsonResult AsignaturaEliminar(int id){
        var error = new ValidacionError();
        error.nonError = false;
        error.MsjError = "No se seleccionó ninguna Asignatura";

        if (id != 0)
        {   
            
            var AsignaturaExiste = _context.Asignaturas?.Find(id);
            if (AsignaturaExiste?.Eliminado == false)
            {
                AsignaturaExiste.Eliminado = true;
                _context.SaveChanges();
                error.nonError = true;
                error.MsjError = "Asignatura Deshabilitada";
            }
            else{
                AsignaturaExiste.Eliminado = false;
                _context.SaveChanges();
                error.nonError = true;
                error.MsjError = "Alumno Habilitado";
            }
        }
        return Json(error); 
    }

    public JsonResult AsignaturaRemover(int id){
        var error = new ValidacionError();
        error.nonError = false;
        error.MsjError = "No se seleccionó ninguna Asignatura";

        if (id > 0)
        {   
            var AsignaturaRemover = _context.Asignaturas?.Find(id);
            
            _context.Remove(AsignaturaRemover);
            _context.SaveChanges();
            error.nonError = true;
            error.MsjError = "Asignatura eliminada correctamente";
            return Json(error);
            
        }
        return Json(error);
    }
    }




    
    
    