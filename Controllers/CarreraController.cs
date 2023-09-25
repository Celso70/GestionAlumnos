 using System.Diagnostics;
 using Microsoft.AspNetCore.Mvc;
 using GestionAlumnos.Data;
 using GestionAlumnos.Models;

 namespace GestionAlumnos.Controllers;

 public class CarreraController : Controller
 {
    private readonly ILogger<CarreraController> _logger;
    private readonly ApplicationDbContext _context;


     public CarreraController(ApplicationDbContext context, ILogger<CarreraController> logger)
     {
        _context = context;
         _logger = logger;
     }

     public IActionResult Index()
     {
         return View();
     }

    public JsonResult CarrerasBuscar(int Id = 0)
    {
        var CarrerasListado = _context.Carreras?.ToList();
        if (Id > 0)
        {
            CarrerasListado = CarrerasListado?.Where(c => c.CarreraID == Id).OrderBy(c =>c.CarreraNombre).ToList();
        }
        return Json(CarrerasListado);
    }
     public JsonResult CarreraGuardar(int id, string nombre, decimal duracion){
        

        var error = new ValidacionError();
        error.nonError = false;
        error.MsjError = "No se pudo guardar la carrera";
        //SI HAY NOMBRE//
        if (!string.IsNullOrEmpty(nombre))
        {   //PONELO EN MAYUSCULA
            nombre = nombre.ToUpper();
            //SI ESTAMOS CREANDO UNA CARRERA NUEVA
            if (id == 0)
            {   
                //PRIMERO VERIFICAMOS SI YA EXISTE EN EL CONTEXTO UNA CARRERA 
                //CON EL NOMBRE QUE ESTAMOS POR INGRESAR
                var CarreraYaExiste = _context.Carreras?.Where(c => c.CarreraNombre == nombre).FirstOrDefault();
                if (CarreraYaExiste == null)
                {   //SI NO EXISTE GUARDAMOS LA CARRERA
                    var CarreraGuardar = new Carrera
                    {
                        CarreraNombre = nombre,
                        CarreraDuracion = duracion,
                    };
                    _context.Add(CarreraGuardar);
                    _context.SaveChanges();
                    error.nonError = true;
                }
                //SI EXISTE UNA CARRERA SALTA ESTE ERROR
                else
                {
                    error.nonError = false;
                    error.MsjError = "Ya existe una carrera con ese nombre";
                }
            }
            //SI ESTAMOS EDITANDO UNA CARRERA
            else
            {   //COMPROBAMOS SI YA HAY UNA CARRERA CREADA CON EL MISMO NOMBRE
                var CarreraYaExiste = _context.Carreras?.Where(c => c.CarreraNombre == nombre && c.CarreraID != id).FirstOrDefault();
                //SI NO LA HAY
                if (CarreraYaExiste == null)
                {   //CREAMOS LA VARIABLE DE CARRERA EDITAR
                    var CarreraEditar = _context.Carreras?.Find(id);
                    //SI SE ENCUENTRA
                    if (CarreraEditar != null)
                    {   //LA GUARDA
                        CarreraEditar.CarreraNombre = nombre;
                        CarreraEditar.CarreraDuracion = duracion;
                        _context.SaveChanges();
                        error.nonError = true;
                    }
                    //VERIFICAMOS SI HAY ALUMNOS RELACIONADOS CON ESTA CARRERA
                    var AlumnosRelacionados =_context.Alumnos?.Where(a => a.CarreraID == id).ToList();
                    if (AlumnosRelacionados != null)
                    {   //SI LOS HAY SE LES CAMBIA AUTOMATICAMENTE EL NOMBRE DE LA CARRERA
                        //TAMBIÉN
                        AlumnosRelacionados?.ForEach(a => a.CarreraNombre = nombre);
                        _context.SaveChanges();
                    }
                }
                //SI YA HAY UNA CARRERA CREADA CON EL MISMO NOMBRE:
                else
                {   //TIRAMOS MENSAJE DE ERROR
                    error.nonError = false;
                    error.MsjError = "Imposible editar, ya existe una carrera con el mismo nombre";
                }
            }
        }
        return Json(error);
     }


public JsonResult CarreraEliminar(int id)
{
    var error = new ValidacionError();
    error.nonError = false;
    error.MsjError = "No se seleccionó ninguna carrera";
    //si existe una carrera
    if (id != 0)
    {   

        var CarreraYaExiste = _context.Carreras.Find(id);
        if (CarreraYaExiste?.Eliminado == false)//SI NO ESTA DESHABILITADA SE LA DESHABILITA
        {   //se verifica si posee alumnos relacionados y los cuenta
            var AlumnoExiste = _context.Alumnos.Where(A => A.CarreraID == id && A.Eliminado == false).Count();
            //si no existen alumnos relacionados
            if (AlumnoExiste == 0)
            {   //el estado de la carrera pasa a estar en deshabilitado
                CarreraYaExiste.Eliminado = true;
                _context.SaveChanges();
                error.nonError = true;
            }
            else //si existen alumnos se notifica
            {
                error.nonError = false;
                error.MsjError = "Hay alumnos existentes en esta Carrera";
            }
        }
        else // SI ESTA DESHABILITADA SE LA HABILITA
        {
            CarreraYaExiste.Eliminado = false;
            _context.SaveChanges();
            error.nonError= true;
        }
    }
    return Json(error);
}
 

public JsonResult CarreraRemover(int ID){
    var error = new ValidacionError();
    error.nonError = false;
    error.MsjError = "No se selecciono ninguna Carrera";
    if (ID > 0)
    {
        var carreraremover = _context.Carreras?.Find(ID);
        var AlumnoExiste = _context.Alumnos?.Where(a => a.Carreras == carreraremover).ToList();
        if (AlumnoExiste.Count() == 0)
        {
            _context.Remove(carreraremover);
            _context.SaveChanges();
            error.nonError = true;
            error.MsjError = "La carrera se eliminó correctamente";
            return Json(error);
        }

    }
    return Json(error);
}
}



