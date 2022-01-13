import { dodajNoviDiv } from "../helper.js";

export class PrikazObracuna {
  constructor(container, krstarenje) {
    this.container = container;
    this.krstarenje = krstarenje;
  }

  crtaj() {
    const naslov = document.createElement("h2");
    naslov.innerHTML = "Obračun cena";
    this.container.appendChild(naslov);

    //Forme
    const forme = document.createElement("div");
    forme.className = "unosi";
    this.crtajObracunZaPutnika(dodajNoviDiv(forme, "unos"));
    this.crtajObracunZaClanaPosade(dodajNoviDiv(forme, "unos"));
    this.container.appendChild(forme);
  }

  crtajObracunZaPutnika(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Obračun cene krstarenja:";
    cont.appendChild(naslov);

    const putnici = document.createElement("select");
    putnici.name = "putniciSB";
    cont.appendChild(putnici);

    const btnIzracunaj = document.createElement("button");
    btnIzracunaj.innerHTML = "Izračunaj";
    btnIzracunaj.className = "dugme";
    cont.appendChild(btnIzracunaj);
  }

  crtajObracunZaClanaPosade(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Obračun zarade posade:";
    cont.appendChild(naslov);

    const clanoviPosade = document.createElement("select");
    clanoviPosade.name = "putniciSB";
    cont.appendChild(clanoviPosade);

    const btnIzracunaj = document.createElement("button");
    btnIzracunaj.innerHTML = "Izračunaj";
    btnIzracunaj.className = "dugme";
    cont.appendChild(btnIzracunaj);
  }
}
