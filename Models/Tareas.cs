using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestionTareas.Models;

public class Tarea {
    [Key]

    public int TareaID { get; set; }
    public DateTime TareaFechaCarga { get; set; }
    public DateTime TareaFechaVencimiento { get; set; }
    public string? TareaTitulo { get; set; }
    public string? TareaDescripcion { get; set; }
    public int AsignaturaID { get; set; }
    public int ProfesorID { get; set; }
    public bool Eliminado { get; set; }
    public string? UsuarioID { get; set; }
}


