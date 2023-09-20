using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionAlumnos.Migrations
{
    public partial class ProfesoresModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Profesores",
                columns: table => new
                {
                    ProfesorID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfesorNombre = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfesorNacimiento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProfesorDireccion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfesorDNI = table.Column<int>(type: "int", nullable: false),
                    ProfesorEmail = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profesores", x => x.ProfesorID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Profesores");
        }
    }
}
