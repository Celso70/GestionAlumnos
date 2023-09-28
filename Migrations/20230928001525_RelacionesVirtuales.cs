using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionAlumnos.Migrations
{
    public partial class RelacionesVirtuales : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProfesoresProfesorID",
                table: "Asignaturas",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Asignaturas_ProfesoresProfesorID",
                table: "Asignaturas",
                column: "ProfesoresProfesorID");

            migrationBuilder.AddForeignKey(
                name: "FK_Asignaturas_Profesores_ProfesoresProfesorID",
                table: "Asignaturas",
                column: "ProfesoresProfesorID",
                principalTable: "Profesores",
                principalColumn: "ProfesorID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asignaturas_Profesores_ProfesoresProfesorID",
                table: "Asignaturas");

            migrationBuilder.DropIndex(
                name: "IX_Asignaturas_ProfesoresProfesorID",
                table: "Asignaturas");

            migrationBuilder.DropColumn(
                name: "ProfesoresProfesorID",
                table: "Asignaturas");
        }
    }
}
