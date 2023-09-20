using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionAlumnos.Migrations
{
    public partial class RelacionVirtualConCarreras : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CarreraID",
                table: "Alumnos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CarreraNombre",
                table: "Alumnos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Alumnos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Alumnos_CarreraID",
                table: "Alumnos",
                column: "CarreraID");

            migrationBuilder.AddForeignKey(
                name: "FK_Alumnos_Carreras_CarreraID",
                table: "Alumnos",
                column: "CarreraID",
                principalTable: "Carreras",
                principalColumn: "CarreraID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Alumnos_Carreras_CarreraID",
                table: "Alumnos");

            migrationBuilder.DropIndex(
                name: "IX_Alumnos_CarreraID",
                table: "Alumnos");

            migrationBuilder.DropColumn(
                name: "CarreraID",
                table: "Alumnos");

            migrationBuilder.DropColumn(
                name: "CarreraNombre",
                table: "Alumnos");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Alumnos");
        }
    }
}
