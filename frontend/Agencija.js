import {
  dodajNoviDiv,
  dodajNoviInput,
  dodajNoviElement,
  dodajNoviP,
  ADR_SERVERA,
} from "./helper.js";
import { iscrtajUnosLuka } from "./unos/UnosLuka.js";
import { iscrtajUnosKruzera } from "./unos/UnosKruzera.js";
import { iscrtajUnosPutnika } from "./unos/UnosPutnika.js";
import { iscrtajUnosClanovaPosada } from "./unos/UnosClanovaPosade.js";
import { iscrtajEditorKrstarenja } from "./EditorKrstarenja.js";

export class Agencija {
  constructor(container) {
    this.container = container;
  }

  iscrtajFormu() {
    this.pocetniEkran = dodajNoviDiv(this.container, "pocetniEkran");
    this.glavniEditor = dodajNoviDiv(this.container, "glavniEditor");
    this.unosi = dodajNoviDiv(this.container, "unosi");

    this.iscrtajPocetniEkran(this.pocetniEkran);

    let dugme = document.createElement("button");
    dugme.innerHTML = "Izmena podataka";
    dugme.className = "dugme";
    dugme.onclick = () => this.iscrtajUnose(this.unosi, dugme);
    this.container.appendChild(dugme);
  }

  iscrtajPocetniEkran(kontejner) {
    let pic = document.createElement("img");
    pic.src = "./assets/cruiser.png";
    pic.className = "imgPocetak";
    kontejner.appendChild(pic);

    let naslov = document.createElement("h1");
    naslov.innerHTML = "Agencija za organizovanje krstarenja";
    kontejner.appendChild(naslov);

    let a = document.createElement("p");
    a.innerHTML = "Za početak, izaberite postojeću turu ili kreirajte novu:";
    a.className = "obavestenje";
    kontejner.appendChild(a);

    let btnD = document.createElement("div");
    btnD.className = "izaberiTuru";
    let selectBox = document.createElement("select");
    selectBox.name = "lalal";
    selectBox.id = "lal";

    btnD.appendChild(selectBox);

    fetch(ADR_SERVERA + "Krstarenje/PreuzmiListu").then((p) => {
      p.json().then((json) => {
        json.forEach((el) => {
          a = document.createElement("option");
          a.innerHTML = el.naziv;
          a.value = el.id;
          selectBox.appendChild(a);
        });
      });
    });

    let btn = document.createElement("button");
    btn.innerHTML = "Izaberi turu";
    btnD.appendChild(btn);
    kontejner.appendChild(btnD);

    btnD = document.createElement("div");
    btnD.className = "kreirajNovu";
    btn = document.createElement("button");
    btn.innerHTML = "Kreiraj novu";
    btn.onclick = () => this.iscrtajUnosNovogKrstarenja(kontejner);
    btnD.appendChild(btn);
    kontejner.appendChild(btnD);
  }

  iscrtajUnosNovogKrstarenja(div) {
    let dodaj = dodajNoviDiv(div);

    let a = dodajNoviP(dodaj, "boldiraniTekst");
    a.innerHTML = "Kreiraj novu turu:";

    dodajNoviInput(dodaj, "Datum početka*:", "vrsta", "date");
    dodajNoviInput(dodaj, "Datum završetka*:", "vrsta", "date");
    dodajNoviInput(dodaj, "Registracioni broj kruzera*:", "vrsta");

    let btn = document.createElement("button");
    btn.innerHTML = "Kreiraj";
    btn.className = "dugme";
    dodaj.appendChild(btn);

    div.removeChild(div.querySelector(".obavestenje"));
    div.removeChild(div.querySelector(".izaberiTuru"));
    div.removeChild(div.querySelector(".kreirajNovu"));
  }

  iscrtajUnose(kontejner, dugme) {
    iscrtajUnosLuka(dodajNoviDiv(kontejner, "unos"));
    iscrtajUnosKruzera(dodajNoviDiv(kontejner, "unos"));
    iscrtajUnosPutnika(dodajNoviDiv(kontejner, "unos"));
    iscrtajUnosClanovaPosada(dodajNoviDiv(kontejner, "unos"));
    this.container.removeChild(dugme);
  }
}
