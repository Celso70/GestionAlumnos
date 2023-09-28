using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionAlumnos.Migrations
{
    public partial class CamposenAlumnos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AlumnoDNI",
                table: "Alumnos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "AlumnoDireccion",
                table: "Alumnos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AlumnoEmail",
                table: "Alumnos",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlumnoDNI",
                table: "Alumnos");

            migrationBuilder.DropColumn(
                name: "AlumnoDireccion",
                table: "Alumnos");

            migrationBuilder.DropColumn(
                name: "AlumnoEmail",
                table: "Alumnos");
        }
    }
}
