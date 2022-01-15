export class PrikazSobe {
  constructor(container, soba) {
    this.container = container;
    this.soba = soba;
  }

  crtaj() {
    let brojSobe = document.createElement("b");
    brojSobe.innerHTML = this.soba.broj;
    this.container.appendChild(brojSobe);

    this.popunjenostSobe = document.createElement("div");
    this.container.appendChild(this.popunjenostSobe);

    this.azurirajPrikaz();

    this.container.onclick = () => this.prikaziInformacije();
  }

  prikaziInformacije() {
    let msg =
      "Soba " +
      this.soba.broj +
      "\nCena noćenja: " +
      this.soba.cenaNocenja +
      " din.\nPopunjenost: " +
      this.soba.krstariSpoj.length +
      "/" +
      this.soba.kapacitet +
      "\nPutnici:";

    this.soba.krstariSpoj.forEach((p) => {
      msg +=
        `\n[ ${p.putnik.brojPasosa} ] ${p.putnik.ime} ${p.putnik.prezime} - ` +
        new Date(p.putnik.datumRodjenja).toLocaleDateString("sr-RS");
    });

    alert(msg);
  }

  azurirajPrikaz() {
    this.popunjenostSobe.innerHTML =
      this.soba.krstariSpoj.length + "/" + this.soba.kapacitet;

    if (this.soba.krstariSpoj.length == this.soba.kapacitet) {
      this.container.style.backgroundColor = "LightGray";
    } else if (this.soba.krstariSpoj.length > this.soba.kapacitet) {
      this.container.style.backgroundColor = "LightCoral";
    }
  }
}
