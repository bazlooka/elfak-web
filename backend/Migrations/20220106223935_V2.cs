using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BrPolaska",
                table: "Krstarenje");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BrPolaska",
                table: "Krstarenje",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
