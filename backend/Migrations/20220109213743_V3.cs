using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aktivnost_Krstarenje_KrstarenjeID",
                table: "Aktivnost");

            migrationBuilder.DropForeignKey(
                name: "FK_Krstarenje_Kruzer_KruzerID",
                table: "Krstarenje");

            migrationBuilder.DropColumn(
                name: "Klasa",
                table: "Soba");

            migrationBuilder.RenameColumn(
                name: "BrojSoba",
                table: "Kruzer",
                newName: "BrojSobaPoRedu");

            migrationBuilder.AlterColumn<int>(
                name: "KruzerID",
                table: "Krstarenje",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "KrstarenjeID",
                table: "Aktivnost",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<float>(
                name: "Honorar",
                table: "Aktivnost",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddForeignKey(
                name: "FK_Aktivnost_Krstarenje_KrstarenjeID",
                table: "Aktivnost",
                column: "KrstarenjeID",
                principalTable: "Krstarenje",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Krstarenje_Kruzer_KruzerID",
                table: "Krstarenje",
                column: "KruzerID",
                principalTable: "Kruzer",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aktivnost_Krstarenje_KrstarenjeID",
                table: "Aktivnost");

            migrationBuilder.DropForeignKey(
                name: "FK_Krstarenje_Kruzer_KruzerID",
                table: "Krstarenje");

            migrationBuilder.DropColumn(
                name: "Honorar",
                table: "Aktivnost");

            migrationBuilder.RenameColumn(
                name: "BrojSobaPoRedu",
                table: "Kruzer",
                newName: "BrojSoba");

            migrationBuilder.AddColumn<string>(
                name: "Klasa",
                table: "Soba",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "KruzerID",
                table: "Krstarenje",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "KrstarenjeID",
                table: "Aktivnost",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Aktivnost_Krstarenje_KrstarenjeID",
                table: "Aktivnost",
                column: "KrstarenjeID",
                principalTable: "Krstarenje",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Krstarenje_Kruzer_KruzerID",
                table: "Krstarenje",
                column: "KruzerID",
                principalTable: "Kruzer",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
