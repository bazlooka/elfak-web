import { ADR_SERVERA } from "../helper.js";
import { PrikazLukaElement } from "./PrikazLukaElement.js";

export class PrikazLuka {
  constructor(
    container,
    polaznaLuka,
    odredisnaLuka,
    usputneLuke,
    idKrstarenja
  ) {
    this.container = container;
    this.polaznaLuka = polaznaLuka;
    this.odredisnaLuka = odredisnaLuka;
    this.usputneLuke = usputneLuke;
    this.idKrstarenja = idKrstarenja;
  }

  crtajPrikazLuka() {
    this.container.innerHTML = "";

    const naslov = document.createElement("h2");
    naslov.innerHTML = "Podešavanja luka";
    naslov.className = "";
    this.container.appendChild(naslov);

    const sema = document.createElement("div");
    sema.className = "prikazLukaContainer";
    this.container.appendChild(sema);

    let div = document.createElement("div");
    div.className = "prikazLukaElement";
    sema.appendChild(div);

    let el = new PrikazLukaElement(div, this.polaznaLuka, "polaznaLuka", this);
    el.iscrtajElement();

    if (this.usputneLuke !== undefined && this.usputneLuke !== null) {
      this.usputneLuke.forEach((element) => {
        div = document.createElement("div");
        div.className = "prikazLukaElement";
        sema.appendChild(div);

        el = new PrikazLukaElement(div, undefined, "strelica", this);
        el.iscrtajElement();

        div = document.createElement("div");
        div.className = "prikazLukaElement";
        sema.appendChild(div);

        el = new PrikazLukaElement(div, element, "usputnaLuka", this);
        el.iscrtajElement();
      });
    }

    div = document.createElement("div");
    div.className = "prikazLukaElement";
    sema.appendChild(div);

    el = new PrikazLukaElement(div, undefined, "strelica", this);
    el.iscrtajElement();

    div = document.createElement("div");
    div.className = "prikazLukaElement";
    sema.appendChild(div);

    el = new PrikazLukaElement(div, this.odredisnaLuka, "odredisnaLuka", this);
    el.iscrtajElement();

    //  Dodavanje luka

    const dodajLuku = document.createElement("p");
    dodajLuku.className = "boldiraniTekst";
    dodajLuku.innerHTML = "Postavi luku:";
    this.container.appendChild(dodajLuku);

    const listaLuka = document.createElement("select");
    listaLuka.className = "listaLuka";
    listaLuka.name = "listaLuka";
    this.container.appendChild(listaLuka);

    fetch(ADR_SERVERA + "Luka/PreuzmiListu").then((p) => {
      p.json().then((json) => {
        json
          .filter((p) => {
            if (this.polaznaLuka != undefined && p.id == this.polaznaLuka.id)
              return false;
            if (
              this.odredisnaLuka != undefined &&
              p.id == this.odredisnaLuka.id
            )
              return false;
            if (
              this.usputneLuke != undefined &&
              this.usputneLuke.find((q) => q.id == p.id) != undefined
            )
              return false;

            return true;
          })
          .forEach((el) => {
            let a = document.createElement("option");
            a.innerHTML = el.naziv;
            a.value = el.id;
            listaLuka.appendChild(a);
          });
      });
    });

    const divRb = document.createElement("div");
    divRb.className = "radioBoxUnosLuka";

    let opcija = document.createElement("input");

    opcija.type = "radio";
    opcija.name = "dodajLukuUListu";
    opcija.value = "pocetna";

    let labela = document.createElement("label");
    labela.className = "radioLabel";
    labela.innerHTML = "Početna";
    divRb.appendChild(opcija);
    divRb.appendChild(labela);

    opcija = document.createElement("input");
    opcija.type = "radio";
    opcija.name = "dodajLukuUListu";
    opcija.value = "usputna";

    labela = document.createElement("label");
    labela.className = "radioLabel";
    labela.innerHTML = "Usputna";

    divRb.appendChild(opcija);
    divRb.appendChild(labela);

    opcija = document.createElement("input");
    opcija.type = "radio";
    opcija.name = "dodajLukuUListu";
    opcija.value = "odredisna";

    labela = document.createElement("label");
    labela.className = "radioLabel";
    labela.innerHTML = "Odredišna";

    divRb.appendChild(opcija);
    divRb.appendChild(labela);

    this.container.appendChild(divRb);

    const btnDodaj = document.createElement("button");
    btnDodaj.innerHTML = "Dodaj";
    btnDodaj.onclick = () => this.dodajLukuUPrikaz();
    this.container.appendChild(btnDodaj);

    const btnSacuvaj = document.createElement("button");
    btnSacuvaj.innerHTML = "Sačuvaj";
    btnSacuvaj.onclick = () => this.sacuvajLuke();
    this.container.appendChild(btnSacuvaj);
  }

  dodajLukuUPrikaz() {
    let idLuke = this.container.querySelector(".listaLuka").value;

    let polCB = this.container.querySelector(
      "input[name='dodajLukuUListu']:checked"
    );
    if (polCB == undefined) {
      alert("Morate da izaberete gde dodajete luku!");
      return;
    }
    if (polCB.value == "pocetna" && this.polaznaLuka != undefined) {
      alert("Već postoji početna luka!");
      return;
    }
    if (polCB.value == "odredisna" && this.odredisnaLuka != undefined) {
      alert("Već postoji početna luka!");
      return;
    }
    if (
      polCB.value == "usputna" &&
      this.usputneLuke != undefined &&
      this.usputneLuke.length >= 5
    ) {
      alert("Nije moguće dodati više od 5 usputnih luka!");
      return;
    }

    fetch(ADR_SERVERA + "Luka/Preuzmi/" + idLuke).then((res) => {
      res.json().then((json) => {
        if (polCB.value == "pocetna") this.polaznaLuka = json;
        else if (polCB.value == "odredisna") this.odredisnaLuka = json;
        else this.usputneLuke.push(json);
        this.crtajPrikazLuka();
      });
    });
  }

  obrisiLuku(tip, id) {
    switch (tip) {
      case "polaznaLuka":
        this.polaznaLuka = undefined;
        break;
      case "odredisnaLuka":
        this.odredisnaLuka = undefined;
        break;
      case "usputnaLuka":
        this.usputneLuke = this.usputneLuke.filter((p) => p.id != id);
        break;
    }
    this.crtajPrikazLuka();
  }

  sacuvajLuke() {
    let query = "?";

    if (this.polaznaLuka != undefined)
      query += `idPolazneLuke=${this.polaznaLuka.id}&`;

    if (this.odredisnaLuka != undefined)
      query += `idOdredisneLuke=${this.odredisnaLuka.id}&`;

    if (this.usputneLuke != undefined) {
      this.usputneLuke.forEach((p) => {
        query += `idUsputneLuke=${p.id}&`;
      });
    }

    query = query.slice(0, -1);

    fetch(ADR_SERVERA + "Krstarenje/PostaviLuke/" + this.idKrstarenja + query, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      resp.text().then((msg) => alert(msg));
    });
  }
}
