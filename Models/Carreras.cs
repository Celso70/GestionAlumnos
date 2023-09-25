using System.ComponentModel.DataAnnotations;

namespace GestionAlumnos.Models;

public class Carrera
{
    [Key]
    public int CarreraID { get; set; }
    public string? CarreraNombre { get; set; }
    public decimal CarreraDuracion { get; set; }

    public bool Eliminado { get; set; }
    public virtual ICollection<Alumno>? Alumnos { get; set; }
}