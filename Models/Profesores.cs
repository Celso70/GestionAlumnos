using System.ComponentModel.DataAnnotations;

namespace GestionAlumnos.Models;

public class Profesor{
    [Key]
    public int ProfesorID { get; set; }
    public string? ProfesorNombre { get; set; }
    public DateTime ProfesorNacimiento { get; set; }
    public string? ProfesorDireccion { get; set; }
    public int ProfesorDNI { get; set; }
    public string? ProfesorEmail { get; set; }
}