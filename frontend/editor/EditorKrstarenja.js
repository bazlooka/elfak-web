import { PrikazAktivnosti } from "./PrikazAktivnosti.js";
import { PrikazBroda } from "./PrikazBroda.js";
import { PrikazLuka } from "./PrikazLuka.js";
import { PrikazObracuna } from "./PrikazObracuna.js";

export class EditorKrstarenja {
  constructor(krstarenje, container, agencija) {
    this.krstarenje = krstarenje;
    this.container = container;
    this.agencija = agencija;
  }

  iscrtajEditorKrstarenja() {
    //Naslov

    const datPocetka = new Date(
      this.krstarenje.datumPocetka
    ).toLocaleDateString("sr-RS");
    const datZavrsetka = new Date(
      this.krstarenje.datumZavrsetka
    ).toLocaleDateString("sr-RS");

    const naslov = document.createElement("h1");
    naslov.innerHTML = `Krstarenje ${datPocetka} - ${datZavrsetka}`;
    naslov.className = "";
    this.container.appendChild(naslov);

    //Prikaz luka

    const prikazLukaDiv = document.createElement("div");
    prikazLukaDiv.className = "prikazLukaForma";
    this.container.appendChild(prikazLukaDiv);

    const prikazLuka = new PrikazLuka(
      prikazLukaDiv,
      this.krstarenje.polaznaLuka,
      this.krstarenje.odredisnaLuka,
      this.krstarenje.usputneLuke,
      this.krstarenje.id
    );
    prikazLuka.crtajPrikazLuka();

    //Prikaz broda

    const prikazBrodaDiv = document.createElement("div");
    prikazBrodaDiv.className = "prikazBrodaForma";
    this.container.appendChild(prikazBrodaDiv);

    const prikazBroda = new PrikazBroda(
      prikazBrodaDiv,
      this.krstarenje.kruzer,
      this.krstarenje
    );
    prikazBroda.crtaj();

    //Prikaz aktivnosti

    const prikazAktivnostiDiv = document.createElement("div");
    prikazAktivnostiDiv.className = "prikazAktivnostiForma";
    this.container.appendChild(prikazAktivnostiDiv);

    const prikazAktivnosti = new PrikazAktivnosti(
      prikazAktivnostiDiv,
      this.krstarenje
    );
    prikazAktivnosti.crtaj();

    //Prikaz obračuna

    const prikazObracunaDiv = document.createElement("div");
    prikazObracunaDiv.className = "prikazObracunaForma";
    this.container.appendChild(prikazObracunaDiv);

    const prikazObracuna = new PrikazObracuna(
      prikazObracunaDiv,
      this.krstarenje
    );
    prikazObracuna.crtaj();

    //Dugme za zatvaranje editora

    const backButton = document.createElement("button");
    backButton.innerHTML = "Zatvori";
    backButton.onclick = () => {
      this.container.innerHTML = "";
      this.agencija.iscrtajPocetniEkran();
    };
    this.container.appendChild(backButton);
  }
}
