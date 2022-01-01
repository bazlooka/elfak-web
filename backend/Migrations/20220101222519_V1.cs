using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClanPosade",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrLicence = table.Column<int>(type: "int", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Cin = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClanPosade", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Kruzer",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegBroj = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    NazivBroda = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    BrojSoba = table.Column<int>(type: "int", nullable: false),
                    BrojRedova = table.Column<int>(type: "int", nullable: false),
                    GodinaProizvodnje = table.Column<int>(type: "int", nullable: false),
                    Prevoznik = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kruzer", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Luka",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Oznaka = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: false),
                    VisinaTakse = table.Column<float>(type: "real", nullable: false),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Drzava = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Grad = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Luka", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Putnik",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrojPasosa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Pol = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    DatumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Putnik", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Soba",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Broj = table.Column<int>(type: "int", nullable: false),
                    CenaNocenja = table.Column<float>(type: "real", nullable: false),
                    Kapacitet = table.Column<int>(type: "int", nullable: false),
                    Klasa = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    KruzerID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Soba", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Soba_Kruzer_KruzerID",
                        column: x => x.KruzerID,
                        principalTable: "Kruzer",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Krstarenje",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrPolaska = table.Column<int>(type: "int", nullable: false),
                    DatumPocetka = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatumZavrsetka = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KruzerID = table.Column<int>(type: "int", nullable: false),
                    PolaznaLukaID = table.Column<int>(type: "int", nullable: true),
                    OdredisnaLukaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Krstarenje", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Krstarenje_Kruzer_KruzerID",
                        column: x => x.KruzerID,
                        principalTable: "Kruzer",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Krstarenje_Luka_OdredisnaLukaID",
                        column: x => x.OdredisnaLukaID,
                        principalTable: "Luka",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Krstarenje_Luka_PolaznaLukaID",
                        column: x => x.PolaznaLukaID,
                        principalTable: "Luka",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Aktivnost",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Cena = table.Column<float>(type: "real", nullable: false),
                    KrstarenjeID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aktivnost", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Aktivnost_Krstarenje_KrstarenjeID",
                        column: x => x.KrstarenjeID,
                        principalTable: "Krstarenje",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AngazovanSpoj",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Honorar = table.Column<float>(type: "real", nullable: false),
                    ClanPosadeID = table.Column<int>(type: "int", nullable: false),
                    KrstarenjeID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AngazovanSpoj", x => x.ID);
                    table.ForeignKey(
                        name: "FK_AngazovanSpoj_ClanPosade_ClanPosadeID",
                        column: x => x.ClanPosadeID,
                        principalTable: "ClanPosade",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AngazovanSpoj_Krstarenje_KrstarenjeID",
                        column: x => x.KrstarenjeID,
                        principalTable: "Krstarenje",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KrstarenjeLuka",
                columns: table => new
                {
                    UsputnaLukaZaID = table.Column<int>(type: "int", nullable: false),
                    UsputneLukeID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KrstarenjeLuka", x => new { x.UsputnaLukaZaID, x.UsputneLukeID });
                    table.ForeignKey(
                        name: "FK_KrstarenjeLuka_Krstarenje_UsputnaLukaZaID",
                        column: x => x.UsputnaLukaZaID,
                        principalTable: "Krstarenje",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KrstarenjeLuka_Luka_UsputneLukeID",
                        column: x => x.UsputneLukeID,
                        principalTable: "Luka",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KrstariSpoj",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SobaID = table.Column<int>(type: "int", nullable: true),
                    KrstarenjeID = table.Column<int>(type: "int", nullable: true),
                    PutnikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KrstariSpoj", x => x.ID);
                    table.ForeignKey(
                        name: "FK_KrstariSpoj_Krstarenje_KrstarenjeID",
                        column: x => x.KrstarenjeID,
                        principalTable: "Krstarenje",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_KrstariSpoj_Putnik_PutnikID",
                        column: x => x.PutnikID,
                        principalTable: "Putnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_KrstariSpoj_Soba_SobaID",
                        column: x => x.SobaID,
                        principalTable: "Soba",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AktivnostClanPosade",
                columns: table => new
                {
                    AktivnostiID = table.Column<int>(type: "int", nullable: false),
                    ClanoviPosadeID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AktivnostClanPosade", x => new { x.AktivnostiID, x.ClanoviPosadeID });
                    table.ForeignKey(
                        name: "FK_AktivnostClanPosade_Aktivnost_AktivnostiID",
                        column: x => x.AktivnostiID,
                        principalTable: "Aktivnost",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AktivnostClanPosade_ClanPosade_ClanoviPosadeID",
                        column: x => x.ClanoviPosadeID,
                        principalTable: "ClanPosade",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AktivnostPutnik",
                columns: table => new
                {
                    AktivnostiID = table.Column<int>(type: "int", nullable: false),
                    PutinciID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AktivnostPutnik", x => new { x.AktivnostiID, x.PutinciID });
                    table.ForeignKey(
                        name: "FK_AktivnostPutnik_Aktivnost_AktivnostiID",
                        column: x => x.AktivnostiID,
                        principalTable: "Aktivnost",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AktivnostPutnik_Putnik_PutinciID",
                        column: x => x.PutinciID,
                        principalTable: "Putnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Aktivnost_KrstarenjeID",
                table: "Aktivnost",
                column: "KrstarenjeID");

            migrationBuilder.CreateIndex(
                name: "IX_AktivnostClanPosade_ClanoviPosadeID",
                table: "AktivnostClanPosade",
                column: "ClanoviPosadeID");

            migrationBuilder.CreateIndex(
                name: "IX_AktivnostPutnik_PutinciID",
                table: "AktivnostPutnik",
                column: "PutinciID");

            migrationBuilder.CreateIndex(
                name: "IX_AngazovanSpoj_ClanPosadeID",
                table: "AngazovanSpoj",
                column: "ClanPosadeID");

            migrationBuilder.CreateIndex(
                name: "IX_AngazovanSpoj_KrstarenjeID",
                table: "AngazovanSpoj",
                column: "KrstarenjeID");

            migrationBuilder.CreateIndex(
                name: "IX_Krstarenje_KruzerID",
                table: "Krstarenje",
                column: "KruzerID");

            migrationBuilder.CreateIndex(
                name: "IX_Krstarenje_OdredisnaLukaID",
                table: "Krstarenje",
                column: "OdredisnaLukaID");

            migrationBuilder.CreateIndex(
                name: "IX_Krstarenje_PolaznaLukaID",
                table: "Krstarenje",
                column: "PolaznaLukaID");

            migrationBuilder.CreateIndex(
                name: "IX_KrstarenjeLuka_UsputneLukeID",
                table: "KrstarenjeLuka",
                column: "UsputneLukeID");

            migrationBuilder.CreateIndex(
                name: "IX_KrstariSpoj_KrstarenjeID",
                table: "KrstariSpoj",
                column: "KrstarenjeID");

            migrationBuilder.CreateIndex(
                name: "IX_KrstariSpoj_PutnikID",
                table: "KrstariSpoj",
                column: "PutnikID");

            migrationBuilder.CreateIndex(
                name: "IX_KrstariSpoj_SobaID",
                table: "KrstariSpoj",
                column: "SobaID");

            migrationBuilder.CreateIndex(
                name: "IX_Soba_KruzerID",
                table: "Soba",
                column: "KruzerID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AktivnostClanPosade");

            migrationBuilder.DropTable(
                name: "AktivnostPutnik");

            migrationBuilder.DropTable(
                name: "AngazovanSpoj");

            migrationBuilder.DropTable(
                name: "KrstarenjeLuka");

            migrationBuilder.DropTable(
                name: "KrstariSpoj");

            migrationBuilder.DropTable(
                name: "Aktivnost");

            migrationBuilder.DropTable(
                name: "ClanPosade");

            migrationBuilder.DropTable(
                name: "Putnik");

            migrationBuilder.DropTable(
                name: "Soba");

            migrationBuilder.DropTable(
                name: "Krstarenje");

            migrationBuilder.DropTable(
                name: "Kruzer");

            migrationBuilder.DropTable(
                name: "Luka");
        }
    }
}
