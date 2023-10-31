using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestionTareas.Models{

public class Tarea{


    [Key]
    public int TareaID { get; set; }

    public DateTime TareaFechaCarga { get; set; }

    [NotMapped]
    public string FechaCargaString { get { return TareaFechaCarga.ToString("dd/MM/yyyy");}}

    [NotMapped]
    public string FechaCargaStringInput { get { return TareaFechaCarga.ToString("yyyy-MM-dd");} }

    public DateTime TareaFechaVencimiento { get; set; }

    [NotMapped]
    public string FechaVencimientoString { get { return TareaFechaVencimiento.ToString("dd/MM/yyyy");} }

    [NotMapped]
    public string FechaVencimientoStringInput { get { return TareaFechaVencimiento.ToString("yyyy-MM-dd");} }

    public string? TareaTitulo { get; set; }

    public string? TareaDescripcion { get; set; }

    public int AsignaturaID { get; set; }

    public bool Eliminado { get; set; }

    public string? UsuarioID { get; set; }

}

    public class VistaTarea {
        public int TareaID { get; set; }

        public DateTime TareaFechaCarga { get; set; }

        public string? FechaCargaString { get; set; }

        public string? FechaCargaStringInput { get; set; }


        public DateTime TareaFechaVencimiento { get; set; }

        public string? FechaVencimientoString { get; set; }

        public string? FechaVencimientoStringInput { get; set; }

        public string? TareaTitulo { get; set; }

        public string? TareaDescripcion { get; set; }

        public bool Eliminado { get; set; }

        public string? UsuarioID { get; set; }

        public int AsignaturaID { get; set; }

        public string? AsignaturaNombre { get; set; }
    }   

}




