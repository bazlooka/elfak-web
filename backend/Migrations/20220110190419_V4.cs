using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class V4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GodinaProizvodnje",
                table: "Kruzer");

            migrationBuilder.DropColumn(
                name: "Prevoznik",
                table: "Kruzer");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GodinaProizvodnje",
                table: "Kruzer",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Prevoznik",
                table: "Kruzer",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: true);
        }
    }
}
