import { PrikazRedova } from "./PrikazRedova.js";
import { dodajNoviDiv, dodajNoviInput, dodajNoviElement } from "../helper.js";

export class PrikazBroda {
  constructor(container, kruzer, krstarenje) {
    this.container = container;
    this.kruzer = kruzer;
    this.krstarenje = krstarenje;
  }

  crtaj() {
    const naslov = document.createElement("h2");
    naslov.innerHTML = "Podešavanja soba";
    this.container.appendChild(naslov);

    const podnaslov = document.createElement("h3");
    podnaslov.innerHTML = `[${this.kruzer.regBroj}] ${this.kruzer.nazivBroda}`;
    this.container.appendChild(podnaslov);

    const brodContainer = document.createElement("div");
    brodContainer.className = "prikazBrodaContainer";
    this.container.appendChild(brodContainer);

    //Prikaz soba

    const sobeContainer = document.createElement("div");
    sobeContainer.className = "prikazSobaContainer";
    brodContainer.appendChild(sobeContainer);

    console.log(this.kruzer);

    const prikazSoba = new PrikazRedova(
      sobeContainer,
      this.kruzer.brojSobaPoRedu,
      this.kruzer.brojRedova,
      this.kruzer.sobe
    );
    prikazSoba.crtaj();

    //Prikaz posade

    const posadaContainer = document.createElement("div");
    posadaContainer.className = "prikazPosadeContainer";
    brodContainer.appendChild(posadaContainer);

    let soba = document.createElement("div");
    soba.className = "prikazPosade";

    let brojSobe = document.createElement("div");
    brojSobe.innerHTML = "<b>Posada<b>";
    soba.appendChild(brojSobe);

    let popunjenostSobe = document.createElement("div");
    popunjenostSobe.innerHTML = this.krstarenje.clanoviPosade.length + "/30";
    soba.appendChild(popunjenostSobe);

    posadaContainer.appendChild(soba);

    //Forme

    const forme = document.createElement("div");
    forme.className = "unosi";

    this.cratjDodavanjePutnika(dodajNoviDiv(forme, "unos justifyStart"));
    this.cratjBrisanjePutnika(dodajNoviDiv(forme, "unos justifyStart"));
    this.crtajIzmenuSobe(dodajNoviDiv(forme, "unos justifyStart"));
    const clanoviPosadeDiv = dodajNoviDiv(forme, "unos justifyStart");
    this.crtajDodavanjeClanaPosade(clanoviPosadeDiv);
    this.crtajBrisanjeClanaPosade(clanoviPosadeDiv);
    this.container.appendChild(forme);
  }

  cratjDodavanjePutnika(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Dodaj putnika:";
    cont.appendChild(naslov);

    const forma = document.createElement("div");

    dodajNoviInput(forma, "Broj pasoša*:", "brPasosaPutnika");
    this.crtajRedISobuInput(forma);

    const btnDodajPutnika = document.createElement("button");
    btnDodajPutnika.innerHTML = "Dodaj";
    btnDodajPutnika.className = "dugme";
    forma.appendChild(btnDodajPutnika);

    cont.appendChild(forma);
  }

  cratjBrisanjePutnika(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Obriši putnika:";
    cont.appendChild(naslov);

    const forma = document.createElement("div");

    this.crtajRedISobuInput(forma);

    const lblPutnici = document.createElement("p");
    lblPutnici.innerHTML = "Putnik:";
    forma.appendChild(lblPutnici);

    const putnici = document.createElement("select");
    putnici.name = "putniciSB";
    forma.appendChild(putnici);

    const btnBrisiPutnika = document.createElement("button");
    btnBrisiPutnika.innerHTML = "Obriši";
    btnBrisiPutnika.className = "dugme";
    forma.appendChild(btnBrisiPutnika);

    cont.appendChild(forma);
  }

  crtajIzmenuSobe(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Izmena soba:";
    cont.appendChild(naslov);

    const forma = document.createElement("div");

    this.crtajRedISobuInput(forma);
    dodajNoviInput(forma, "Cena:", "brPasosaPutnika", "number");
    dodajNoviInput(forma, "Kapacitet:", "brPasosaPutnika", "number");

    const btnIzmeniSobu = document.createElement("button");
    btnIzmeniSobu.innerHTML = "Izmeni";
    btnIzmeniSobu.className = "dugme";
    forma.appendChild(btnIzmeniSobu);

    cont.appendChild(forma);
  }

  crtajDodavanjeClanaPosade(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Dodaj člana posade:";
    cont.appendChild(naslov);

    const forma = document.createElement("div");

    dodajNoviInput(forma, "Broj licence*:", "brLicence");

    const btnDodajClanaPosade = document.createElement("button");
    btnDodajClanaPosade.innerHTML = "Dodaj";
    btnDodajClanaPosade.className = "dugme";
    forma.appendChild(btnDodajClanaPosade);

    cont.appendChild(forma);
  }

  crtajBrisanjeClanaPosade(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Obriši člana posade:";
    cont.appendChild(naslov);

    const forma = document.createElement("div");

    const lblClanoviPosade = document.createElement("label");
    lblClanoviPosade.innerHTML = "Član posade:";
    forma.appendChild(lblClanoviPosade);

    const listaClanova = document.createElement("select");
    listaClanova.name = "redSB";
    // for (let i = 0; i < this.kruzer.brojRedova; i++) {
    //   let a = document.createElement("option");
    //   a.innerHTML = i + 1;
    //   a.value = i;
    //   red.appendChild(a);
    // }
    forma.appendChild(listaClanova);

    const btnBrisiClanaPosade = document.createElement("button");
    btnBrisiClanaPosade.innerHTML = "Obriši";
    btnBrisiClanaPosade.className = "dugme";
    forma.appendChild(btnBrisiClanaPosade);

    cont.appendChild(forma);
  }

  //Pomocne funkcije

  crtajRedISobuInput(cont) {
    const innerCont = document.createElement("div");
    innerCont.className = "redISoba";

    const innerContRed = document.createElement("div");

    const lblRed = document.createElement("p");
    lblRed.innerHTML = "Red:";
    innerContRed.appendChild(lblRed);

    const red = document.createElement("select");
    red.name = "redSB";
    for (let i = 0; i < this.kruzer.brojRedova; i++) {
      let a = document.createElement("option");
      a.innerHTML = i + 1;
      a.value = i;
      red.appendChild(a);
    }
    innerContRed.appendChild(red);

    const innerContSoba = document.createElement("div");

    const lblSoba = document.createElement("p");
    lblSoba.innerHTML = "Soba:";
    innerContSoba.appendChild(lblSoba);

    const soba = document.createElement("select");
    soba.name = "redSB";
    this.postaviSelekcijuSoba(0, soba);

    red.onclick = () => {
      this.postaviSelekcijuSoba(red.value, soba);
    };

    innerContSoba.appendChild(soba);

    innerCont.appendChild(innerContRed);
    innerCont.appendChild(innerContSoba);

    cont.appendChild(innerCont);
  }

  postaviSelekcijuSoba(red, select) {
    select.innerHTML = "";
    for (let i = 0; i < this.kruzer.brojSobaPoRedu; i++) {
      let b = document.createElement("option");
      b.innerHTML = red * this.kruzer.brojSobaPoRedu + i + 1;
      b.value = red * this.kruzer.brojSobaPoRedu + i;
      select.appendChild(b);
    }
  }
}
