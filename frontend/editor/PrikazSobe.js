export class PrikazSobe {
  constructor(container, soba) {
    this.container = container;
    this.soba = soba;
  }

  crtaj() {
    let brojSobe = document.createElement("div");
    brojSobe.innerHTML = "<b>" + this.soba.broj + "<b>";
    this.container.appendChild(brojSobe);

    let popunjenostSobe = document.createElement("div");
    popunjenostSobe.innerHTML =
      this.soba.krstariSpoj.length + "/" + this.soba.kapacitet;
    this.container.appendChild(popunjenostSobe);

    this.container.onclick = () => this.prikaziInformacije();
  }

  prikaziInformacije() {
    let msg =
      "Soba " +
      this.soba.broj +
      "\nCena noćenja: " +
      this.soba.cenaNocenja +
      " din." +
      "\nPopunjenost: " +
      this.soba.krstariSpoj.length +
      "/" +
      this.soba.kapacitet +
      "\nPutnici:";

    this.soba.krstariSpoj.forEach((p) => {
      msg +=
        "\n[" +
        p.putnik.brojPasosa +
        "] " +
        p.putnik.ime +
        " " +
        p.putnik.prezime +
        " - " +
        new Date(p.putnik.datumRodjenja).toLocaleDateString("sr-RS");
    });

    alert(msg);
  }
}
