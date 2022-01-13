export class PrikazLukaElement {
  constructor(container, luka, tip, prikazLuka) {
    this.container = container;
    this.luka = luka;
    this.tip = tip;
    this.prikazLuka = prikazLuka;
  }

  iscrtajElement() {
    this.icon = document.createElement("img");
    this.container.appendChild(this.icon);

    if (this.tip == "strelica") {
      this.icon.className = "prikazLukaStrelica";
      this.icon.src = "./assets/strelica.png";
    } else {
      this.icon.className = "prikazLukaOblik";
      if (this.luka != undefined) {
        this.icon.src = "./assets/" + this.tip + ".png";
        this.crtajLabele();
      } else {
        this.icon.src = "./assets/" + this.tip + "Prazna.png";
      }
      this.icon.onclick = () => this.prikaziInformacije();
    }
  }

  crtajLabele() {
    const tekst2 = document.createElement("div");
    tekst2.className = "prikazLukaLabel";
    tekst2.innerHTML = this.luka.grad;
    tekst2.style = "font-weight: bold";
    this.container.appendChild(tekst2);

    const tekst = document.createElement("div");
    tekst.className = "prikazLukaLabel";
    tekst.innerHTML = this.luka.oznaka;
    this.container.appendChild(tekst);

    const btnObrisi = document.createElement("button");
    btnObrisi.innerHTML = "Obriši";
    btnObrisi.onclick = () => {
      if (
        confirm(
          "Da li ste sigurni da želite da obrišete luku " + this.luka.oznaka
        )
      )
        this.prikazLuka.obrisiLuku(this.tip, this.luka.id);
    };

    this.container.appendChild(btnObrisi);
  }

  prikaziInformacije() {
    if (this.luka != undefined) {
      alert(
        `Luka ${this.luka.oznaka} - ${this.luka.naziv}\n${this.luka.grad}\n` +
          `${this.luka.drzava}\nVisina takse: ${this.luka.visinaTakse} din.`
      );
    }
  }
}
