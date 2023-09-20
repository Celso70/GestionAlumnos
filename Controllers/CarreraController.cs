//  using System.Diagnostics;
//  using Microsoft.AspNetCore.Mvc;
//  using GestionAlumnos.Data;
//  using GestionAlumnos.Models;

//  namespace GestionAlumnos.Controllers;

//  public class CarreraController : Controller
//  {
//     private readonly ILogger<CarreraController> _logger;
//     private readonly ApplicationDbContext _context;


//      public CarreraController(ApplicationDbContext context, ILogger<CarreraController> logger)
//      {
//         _context = context;
//          _logger = logger;
//      }

//      public IActionResult Index()
//      {
//          return View();
//      }



//     //MÉTODO QUE BUSCA LAS CARRERAS EXISTENTES Y LUEGO DEVUELVE UN LISTADO:

//     //CREAMOS EL MÉTODO Y LE PASAMOS COMO PARÁMETRO EL ID DE LA CARRERA, EL CUAL LE DAMOS VALOR 0
//      public JsonResult BuscarCarreras(int carreraID = 0)
//     {
//         //CREAMOS UNA VARIABLE LLAMADA "LISTADOCARRERAS" PARA QUE SEA MAS FÁCIL Y DINÁMICO LLAMAR EL MISMO
//         var listadocarreras = _context.Carreras.ToList();

//         //SI EL ID QUE PASAMOS COMO PARAMETRO PREVIAMENTE ES MAYOR A 0:
//         if (carreraID > 0) {

//             //NOS DEVUELVE EL LISTADO DONDE: EL ID DE LA CARRERA SEA IGUAL A LOS ID QUE INGRESAN 
//             //COMO PARAMETRO Y QUE ESTAS CARRERAS SE ORDENEN SEGUN SU NOMBRE FORMANDO UN LISTADO

//             listadocarreras = listadocarreras.Where(c => c.CarreraID == carreraID).OrderBy(c => c.CarreraNombre).ToList();
//         }

//         //DEVUELVE LISTADO
//         return Json(listadocarreras);
//         //FIN
//     }

    
    

//     public JsonResult GuardarCarrera(int carreraID, string carreranombre)
//     {
//         var resultado = new ValidacionError();
//         resultado.nonError = false;
//         resultado.MsjError = "No se agrego un nombre a la carrera";
//         //SI EL NOMBRE DE LA CARRERA NO INGRESA
//         if (!string.IsNullOrEmpty(carreranombre))
//         {

//             if(carreraID == 0){
//                 var carreraexistente = _context.Carreras.Where(c => c.CarreraNombre == carreranombre).FirstOrDefault();
//                 if(carreraexistente == null){

//                         var carreraCrear = new Carrera{
//                             CarreraNombre = carreranombre,
//                             // Duracion = duracion
//                         };
//                         _context.Add(carreraCrear);
//                         _context.SaveChanges();
//                         resultado.nonError = true;

//                 }

                     
//                     }

//                     else{
//                         //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION Y DISTINTO ID DE REGISTRO AL QUE ESTAMOS EDITANDO
//                         var carreraexistente = _context.Carreras.Where(c => c.CarreraNombre == carreranombre && c.CarreraID != carreraID).FirstOrDefault();
//                         if(carreraexistente == null){
//                             //crear variable que guarde el objeto segun el id deseado
//                             var carreraEditar = _context.Carreras.Find(carreraID);
//                             if(carreraEditar != null){
//                                 carreraEditar.CarreraNombre = carreranombre;
//                                 // carreraEditar.Duracion = duracion;
//                                 _context.SaveChanges();
//                                  resultado.nonError = true;
//                             }
//                         }
                       
           
//                         }                          
//         }

//         return Json(resultado);
//     }


//     }
