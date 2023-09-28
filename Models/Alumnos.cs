using System.ComponentModel.DataAnnotations;

namespace GestionAlumnos.Models;

public class Alumno {
    [Key]
    public int AlumnoID { get; set; }
    public string? AlumnoNombre { get; set; }
    public string? AlumnoDireccion { get; set; }
    public DateTime AlumnoNacimiento { get; set; }
    public int AlumnoDNI { get; set; }
    public string? AlumnoEmail { get; set; }
    public int CarreraID { get; set; }
    public string? CarreraNombre { get; set;}
    public bool Eliminado { get; set; }
    public virtual Carrera? Carreras { get; set; }
    
}