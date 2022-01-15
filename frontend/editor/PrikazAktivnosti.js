import {
  dodajNoviDiv,
  dodajNoviP,
  dodajNoviInput,
  ADR_SERVERA,
} from "../helper.js";
import { EditorAktivnosti } from "./EditorAktivnosti.js";

export class PrikazAktivnosti {
  constructor(container, krstarenje) {
    this.container = container;
    this.aktivnosti = krstarenje.aktivnosti;
    this.krstarenje = krstarenje;
  }

  crtaj() {
    const naslov = document.createElement("h2");
    naslov.innerHTML = "Aktivnosti";
    this.container.appendChild(naslov);

    const divSelectAktivnost = dodajNoviDiv(
      this.container,
      "selektujAktivnost"
    );
    const aktivnosti = document.createElement("select");
    aktivnosti.className = "aktivnostiSelect";
    divSelectAktivnost.appendChild(aktivnosti);

    const select = this.container.querySelector(".aktivnostiSelect");
    this.aktivnosti.forEach((el, i) => {
      let op = document.createElement("option");
      op.value = i;
      op.innerHTML = el.naziv;
      select.appendChild(op);
    });

    select.onclick = () => {
      this.editorAktivnosti.crtaj(this.aktivnosti[select.value]);
    };

    const editorAktivnostiDiv = dodajNoviDiv(
      this.container,
      "editorAktivnosti"
    );
    this.editorAktivnosti = new EditorAktivnosti(
      editorAktivnostiDiv,
      this.krstarenje
    );

    this.editorAktivnosti.crtaj(this.aktivnosti[0]);

    this.crtajUnosAktivnosti(dodajNoviDiv(this.container, "unosi"));
  }
  //  DODAVANJE AKTIVNOSTI

  crtajUnosAktivnosti(cont) {
    //Forma za dodavanje aktivnosti

    const dodaj = dodajNoviDiv(cont, "unos");

    let a = dodajNoviP(dodaj, "boldiraniTekst");
    a.innerHTML = "Dodaj aktivnost:";

    dodajNoviInput(dodaj, "Ime*:", "imeAktivnost");
    dodajNoviInput(dodaj, "Cena*:", "cenaAktivnosti", "number");
    dodajNoviInput(dodaj, "Zarada*:", "zaradaAktivnosti", "number");

    let btn = document.createElement("button");
    btn.innerHTML = "Dodaj";
    btn.className = "dugme";
    btn.onclick = () => this.dodajNovuAktivnost(dodaj);
    dodaj.appendChild(btn);

    cont.appendChild(dodaj);
  }

  dodajNovuAktivnost(cont) {
    const naziv = cont.querySelector(".imeAktivnost").value;
    if (naziv === null || naziv === undefined || naziv == "") {
      alert("Morate da uneste naziv aktivnosti!");
      return;
    }

    const cena = cont.querySelector(".cenaAktivnosti").value;
    if (cena === null || cena === undefined || cena == "") {
      alert("Morate da uneste cenu aktivnosti!");
      return;
    }

    const honorar = cont.querySelector(".zaradaAktivnosti").value;
    if (honorar === null || honorar === undefined || honorar == "") {
      alert("Morate da uneste honorar aktivnosti!");
      return;
    }

    if (this.aktivnosti.find((el) => el.naziv == naziv) != undefined) {
      alert("Aktivnost sa tim imenom već postoji na krstarenju!");
      return;
    }

    fetch(
      ADR_SERVERA +
        `Aktivnost/Dodaj/${this.krstarenje.id}/${naziv}/${cena}/${honorar}`,
      {
        method: "POST",
      }
    ).then((resp) => {
      if (resp.ok) {
        resp.json().then((json) => {
          this.aktivnosti.push(json);

          const select = this.container.querySelector(".aktivnostiSelect");
          const op = document.createElement("option");
          op.value = this.aktivnosti.length - 1;
          op.innerHTML = json.naziv;
          select.appendChild(op);
          select.value = this.aktivnosti.length - 1;

          this.editorAktivnosti.crtaj(json);

          alert("Aktivnost je uspešno dodata!");
        });
      } else {
        resp.text().then((msg) => alert(msg));
      }
    });
  }
}
