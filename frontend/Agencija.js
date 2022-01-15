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
import { EditorKrstarenja } from "./editor/EditorKrstarenja.js";

export class Agencija {
  constructor(container) {
    this.container = container;
  }

  iscrtajFormu() {
    this.pocetniEkran = dodajNoviElement(
      this.container,
      "pocetniEkran",
      "section"
    );
    this.glavniEditor = dodajNoviElement(
      this.container,
      "glavniEditor",
      "section"
    );
    this.unosi = dodajNoviElement(this.container, "unosi", "section");

    this.iscrtajPocetniEkran();
    this.zatvoriUnose();
  }

  iscrtajPocetniEkran() {
    const pic = document.createElement("img");
    pic.src = "./assets/cruiser.png";
    pic.className = "imgPocetak";
    this.pocetniEkran.appendChild(pic);

    const naslov = document.createElement("h1");
    naslov.innerHTML = "Agencija za organizovanje krstarenja";
    this.pocetniEkran.appendChild(naslov);

    let a = document.createElement("p");
    a.innerHTML = "Za početak, izaberite postojeću turu ili kreirajte novu:";
    a.className = "obavestenje";
    this.pocetniEkran.appendChild(a);

    let btnDiv = document.createElement("div");
    btnDiv.className = "izaberiTuru";

    let selectBox = document.createElement("select");
    selectBox.name = "lalal";
    selectBox.id = "lal";
    btnDiv.appendChild(selectBox);

    let btn = document.createElement("button");
    btn.innerHTML = "Izaberi turu";
    btn.onclick = () => {
      const id = selectBox.value;
      this.izaberiKrstarenje(id);
    };
    btnDiv.appendChild(btn);

    this.pocetniEkran.appendChild(btnDiv);

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

    btnDiv = document.createElement("div");
    btnDiv.className = "kreirajNovu";

    btn = document.createElement("button");
    btn.innerHTML = "Kreiraj novu";
    btn.onclick = () => this.iscrtajUnosNovogKrstarenja(this.pocetniEkran);
    btnDiv.appendChild(btn);
    this.pocetniEkran.appendChild(btnDiv);
  }

  iscrtajUnosNovogKrstarenja(container) {
    let dodaj = dodajNoviDiv(container);

    let a = dodajNoviP(dodaj, "boldiraniTekst");
    a.innerHTML = "Kreiraj novu turu:";

    dodajNoviInput(dodaj, "Datum početka*:", "datumPocetka", "date");
    dodajNoviInput(dodaj, "Datum završetka*:", "datumZavrsetka", "date");

    const labelaKruzeri = dodajNoviP(dodaj);
    labelaKruzeri.innerHTML = "Kruzer*:";

    const selectBoxDiv = dodajNoviDiv(dodaj);

    let selectBox = document.createElement("select");
    selectBox.className = "selectKruzer";
    selectBox.name = "listaKruzera";
    selectBox.id = "listaKruzera";
    selectBoxDiv.appendChild(selectBox);

    fetch(ADR_SERVERA + "Kruzer/PreuzmiListu").then((p) => {
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
    btn.innerHTML = "Kreiraj";
    btn.className = "dugme";
    btn.onclick = () => this.kreirajNovoKrstarenje(container);
    dodaj.appendChild(btn);

    container.removeChild(container.querySelector(".obavestenje"));
    container.removeChild(container.querySelector(".izaberiTuru"));
    container.removeChild(container.querySelector(".kreirajNovu"));
  }

  iscrtajUnose() {
    iscrtajUnosLuka(dodajNoviDiv(this.unosi, "unos"));
    iscrtajUnosKruzera(dodajNoviDiv(this.unosi, "unos"));
    iscrtajUnosPutnika(dodajNoviDiv(this.unosi, "unos"));
    iscrtajUnosClanovaPosada(dodajNoviDiv(this.unosi, "unos"));

    let backButton = document.createElement("button");
    backButton.innerHTML = "Zatvori unose";
    backButton.className = "zatvoriUnoseDugme";
    backButton.onclick = () => this.zatvoriUnose();
    this.container.appendChild(backButton);
    this.container.removeChild(
      this.container.querySelector(".otvoriUnoseDugme")
    );
  }

  zatvoriUnose() {
    this.unosi.innerHTML = "";
    let dugme = document.createElement("button");
    dugme.innerHTML = "Izmena podataka";
    dugme.className = "otvoriUnoseDugme";
    dugme.onclick = () => this.iscrtajUnose();
    this.container.appendChild(dugme);
    const dugmeZaZatvaranje =
      this.container.querySelector(".zatvoriUnoseDugme");
    if (dugmeZaZatvaranje != undefined) {
      this.container.removeChild(dugmeZaZatvaranje);
    }
  }

  izaberiKrstarenje(id) {
    fetch(ADR_SERVERA + "Krstarenje/Preuzmi/" + id).then((res) => {
      res.json().then((json) => {
        this.ucitajGlavniEditor(json);
      });
    });
  }

  kreirajNovoKrstarenje(container) {
    const krstarenje = new Object();
    krstarenje.datumPocetka = container.querySelector(".datumPocetka").value;
    krstarenje.datumZavrsetka =
      container.querySelector(".datumZavrsetka").value;
    const idKruzera = container.querySelector(".selectKruzer").value;

    fetch(ADR_SERVERA + "Krstarenje/Kreiraj/" + idKruzera, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(krstarenje),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.text();
        }
      })
      .then((msg) => {
        if (typeof msg == "string") {
          alert(msg);
        } else {
          this.ucitajGlavniEditor(msg);
        }
      });
  }

  ucitajGlavniEditor(json) {
    console.log(json);

    const editor = new EditorKrstarenja(json, this.glavniEditor, this);
    this.pocetniEkran.innerHTML = "";
    editor.iscrtajEditorKrstarenja();
  }
}
