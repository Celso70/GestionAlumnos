using System.ComponentModel.DataAnnotations;

namespace GestionAlumnos.Models;

public class Asignatura
{
    [Key]
    public int AsignaturaID { get; set; }
    public string? AsignaturaNombre { get; set; }
    public int CarreraID { get; set; }
    public string? CarreraNombre { get; set; }
    public bool Eliminado { get; set; }
    public virtual Carrera? Carreras { get; set; }
    public virtual Profesor? Profesores { get; set; }
 }




