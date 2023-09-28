using System.ComponentModel.DataAnnotations;

namespace GestionAlumnos.Models;

public class ProfesorAsignatura{
    public int ProfesorAsignaturaID { get; set; }
    public int ProfesorID { get; set; }
    public int AsignaturaID { get; set; }
}
