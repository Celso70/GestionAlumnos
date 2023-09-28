using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionAlumnos.Migrations
{
    public partial class CarreraNombreonAsignaturamodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CarreraNombre",
                table: "Asignaturas",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarreraNombre",
                table: "Asignaturas");
        }
    }
}
