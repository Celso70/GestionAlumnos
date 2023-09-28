using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionAlumnos.Migrations
{
    public partial class TareasModel2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tareas",
                columns: table => new
                {
                    TareaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TareaFechaCarga = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TareaFechaVencimiento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TareaTitulo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TareaDescripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AsignaturaID = table.Column<int>(type: "int", nullable: false),
                    ProfesorID = table.Column<int>(type: "int", nullable: false),
                    Eliminado = table.Column<bool>(type: "bit", nullable: false),
                    UsuarioID = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tareas", x => x.TareaID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tareas");
        }
    }
}
