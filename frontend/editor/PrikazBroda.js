import { PrikazRedova } from "./PrikazRedova.js";
import { dodajNoviDiv, dodajNoviInput, ADR_SERVERA } from "../helper.js";

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

    const brodContainer = dodajNoviDiv(this.container, "prikazBrodaContainer");

    //Prikaz soba

    const sobeContainer = dodajNoviDiv(brodContainer, "prikazSobaContainer");

    this.prikazSoba = new PrikazRedova(
      sobeContainer,
      this.kruzer.brojSobaPoRedu,
      this.kruzer.brojRedova,
      this.kruzer.sobe
    );
    this.prikazSoba.crtaj();

    //Prikaz posade

    this.posadaContainer = dodajNoviDiv(brodContainer, "prikazPosadeContainer");
    this.crtajBrojClanovaPosade();

    //Forme

    const forme = dodajNoviDiv(this.container, "unosi");

    this.cratjDodavanjePutnika(dodajNoviDiv(forme, "unos justifyStart"));
    this.cratjBrisanjePutnika(dodajNoviDiv(forme, "unos justifyStart"));
    this.crtajIzmenuSobe(dodajNoviDiv(forme, "unos justifyStart"));
    this.crtajDodavanjeClanaPosade(dodajNoviDiv(forme, "unos justifyStart"));
    this.crtajBrisanjeClanaPosade(dodajNoviDiv(forme, "unos justifyStart"));
  }

  crtajBrojClanovaPosade() {
    this.posadaContainer.innerHTML = "";

    const prikazPosade = dodajNoviDiv(this.posadaContainer, "prikazPosade");

    const brojSobe = document.createElement("b");

    brojSobe.innerHTML = "Posada";
    prikazPosade.appendChild(brojSobe);

    const popunjenostSobe = document.createElement("div");
    popunjenostSobe.innerHTML = this.krstarenje.clanoviPosade.length + "/30";
    prikazPosade.appendChild(popunjenostSobe);

    this.posadaContainer.appendChild(prikazPosade);
  }

  //  Dodavanje putnika

  cratjDodavanjePutnika(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Dodaj putnika:";
    cont.appendChild(naslov);

    const forma = dodajNoviDiv(cont);

    dodajNoviInput(forma, "Broj pasoša*:", "brPasosaPutnika");
    this.crtajRedISobuInput(forma);

    const btnDodajPutnika = document.createElement("button");
    btnDodajPutnika.innerHTML = "Dodaj";
    btnDodajPutnika.className = "dugme";
    btnDodajPutnika.onclick = () => this.dodajPutnika(cont);

    forma.appendChild(btnDodajPutnika);
  }

  dodajPutnika(cont) {
    const brPasosa = cont.querySelector(".brPasosaPutnika").value;
    if (brPasosa === undefined || brPasosa === null) {
      alert("Morate uneti broj pasoša!");
      return;
    }

    const iSobe = cont.querySelector(".sobaSB").value;
    if (iSobe === undefined || iSobe === null) {
      alert("Morate uneti sobu!");
      return;
    }

    if (
      this.kruzer.sobe[iSobe].krstariSpoj.length >=
      this.kruzer.sobe[iSobe].kapacitet
    ) {
      alert("Soba u koju želite da dodate putnika je puna!");
      return;
    }

    fetch(
      ADR_SERVERA +
        `Krstarenje/DodajPutnika/${this.krstarenje.id}/${iSobe}/${brPasosa}`,
      {
        method: "PUT",
      }
    ).then((resp) => {
      if (resp.ok) {
        resp.json().then((msg) => {
          this.kruzer.sobe[iSobe].krstariSpoj.push(msg);
          this.prikazSoba.azurirajPrkazSobe(iSobe);
          alert("Putnik je uspešno dodat!");
        });
      } else {
        resp.text().then((msg) => alert(msg));
      }
    });
  }

  cratjBrisanjePutnika(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Obriši putnika:";
    cont.appendChild(naslov);

    const forma = dodajNoviDiv(cont);

    const putnici = document.createElement("select");
    putnici.className = "putniciSB";
    putnici.name = "putniciSB";

    var popuniListuGostiju = () => {
      const iSobe = cont.querySelector(".sobaSB").value;

      //Brisanje elemenata
      var first = putnici.firstElementChild;
      while (first) {
        first.remove();
        first = putnici.firstElementChild;
      }

      if (this.kruzer.sobe[iSobe].krstariSpoj.length < 1) {
        putnici.disabled = true;
      } else {
        putnici.disabled = false;
        this.kruzer.sobe[iSobe].krstariSpoj.forEach((el) => {
          let b = document.createElement("option");
          b.value = el.putnik.id;
          b.innerHTML = `[ ${el.putnik.brojPasosa} ] ${el.putnik.ime} ${el.putnik.prezime}`;
          putnici.appendChild(b);
        });
      }
    };

    this.crtajRedISobuInput(forma, popuniListuGostiju);

    popuniListuGostiju();

    const lblPutnici = document.createElement("p");
    lblPutnici.innerHTML = "Putnik:";
    forma.appendChild(lblPutnici);

    forma.appendChild(putnici);

    const btnBrisiPutnika = document.createElement("button");
    btnBrisiPutnika.innerHTML = "Obriši";
    btnBrisiPutnika.className = "dugme";
    btnBrisiPutnika.onclick = () => this.obrisiPutnika(cont);
    forma.appendChild(btnBrisiPutnika);
  }

  obrisiPutnika(cont) {
    const iSobe = cont.querySelector(".sobaSB").value;
    if (iSobe === undefined || iSobe === null) {
      alert("Morate izabrati sobu!");
      return;
    }

    const idPutnika = cont.querySelector(".putniciSB").value;

    if (idPutnika === null || idPutnika === undefined || idPutnika == "") {
      alert("Morate da izaberete putnika kojeg želite da izbrišete!");
      return;
    }

    fetch(
      ADR_SERVERA +
        `Krstarenje/ObrisiPutnika/${this.krstarenje.id}/${idPutnika}`,
      {
        method: "DELETE",
      }
    ).then((resp) => {
      if (resp.ok) {
        this.kruzer.sobe[iSobe].krstariSpoj = this.kruzer.sobe[
          iSobe
        ].krstariSpoj.filter((p) => {
          return p.putnik.id !== parseInt(idPutnika, 10);
        });
        this.prikazSoba.azurirajPrkazSobe(iSobe);
        alert("Putnik je uspešno obrisan!");
      } else {
        resp.text().then((msg) => alert(msg));
      }
    });
  }

  //  Izmena soba

  crtajIzmenuSobe(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Izmena soba:";
    cont.appendChild(naslov);

    const forma = dodajNoviDiv(cont);

    this.crtajRedISobuInput(forma);
    dodajNoviInput(forma, "Cena noćenja*:", "cenaNocenja", "number");
    dodajNoviInput(forma, "Kapacitet*:", "kapacitetSobe", "number");

    const btnIzmeniSobu = document.createElement("button");
    btnIzmeniSobu.innerHTML = "Izmeni";
    btnIzmeniSobu.className = "dugme";
    btnIzmeniSobu.onclick = () => this.izmeniSobu(cont);
    forma.appendChild(btnIzmeniSobu);
  }

  izmeniSobu(cont) {
    const iSobe = cont.querySelector(".sobaSB").value;
    if (iSobe === undefined || iSobe === null) {
      alert("Morate izabrati sobu!");
      return;
    }

    const cenaNocenja = cont.querySelector(".cenaNocenja").value;
    if (cenaNocenja == undefined || cenaNocenja == null || cenaNocenja == "") {
      alert("Morate da unesete cenu noćenja!");
      return;
    }

    const kapacitet = cont.querySelector(".kapacitetSobe").value;
    if (kapacitet == undefined || kapacitet == null || kapacitet == "") {
      alert("Morate da unesete kapacitet sobe!");
      return;
    }

    fetch(
      ADR_SERVERA +
        `Soba/Izmeni/${this.kruzer.sobe[iSobe].id}/${kapacitet}/${cenaNocenja}`,
      {
        method: "PUT",
      }
    ).then((resp) => {
      if (resp.ok) {
        resp.json().then((msg) => {
          this.kruzer.sobe[iSobe].cenaNocenja = msg.cenaNocenja;
          this.kruzer.sobe[iSobe].kapacitet = msg.kapacitet;
          this.prikazSoba.azurirajPrkazSobe(iSobe);
          alert("Soba je uspešno izmenjena!");
        });
      } else {
        resp.text().then((msg) => alert(msg));
      }
    });
  }

  // Dodavanje članova posade

  crtajDodavanjeClanaPosade(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Dodaj člana posade:";
    cont.appendChild(naslov);

    const forma = dodajNoviDiv(cont);

    dodajNoviInput(forma, "Broj licence*:", "brLicence");
    dodajNoviInput(forma, "Honorar*:", "honorar", "number");

    const btnDodajClanaPosade = document.createElement("button");
    btnDodajClanaPosade.innerHTML = "Dodaj";
    btnDodajClanaPosade.className = "dugme";
    btnDodajClanaPosade.onclick = () => this.dodajClanaPosade(cont);
    forma.appendChild(btnDodajClanaPosade);
  }

  dodajClanaPosade(cont) {
    const brojLicence = cont.querySelector(".brLicence").value;
    if (brojLicence === undefined || brojLicence === null) {
      alert("Morate uneti broj linence člana posade!");
      return;
    }

    let unet = false;
    this.krstarenje.clanoviPosade.forEach((el) => {
      if (el.clanPosade.brLicence === parseInt(brojLicence)) {
        unet = true;
      }
    });

    if (unet == true) {
      alert("Član posade je već na krstarenju!");
      return;
    }

    const honorar = cont.querySelector(".honorar").value;

    if (honorar == null || honorar == "" || parseInt(honorar) > 1000000) {
      alert("Honorar nije ispravno unet!");
      return;
    }

    fetch(
      ADR_SERVERA +
        `Krstarenje/DodajClanaPosade/${this.krstarenje.id}/${brojLicence}/${honorar}`,
      {
        method: "POST",
      }
    ).then((resp) => {
      if (resp.ok) {
        resp.json().then((noviClanPosade) => {
          this.krstarenje.clanoviPosade.push(noviClanPosade);
          this.crtajBrojClanovaPosade();
          this.unesiListuClanovaPosade();
        });
        alert("Putnik je uspešno dodat!");
      } else {
        resp.text().then((msg) => alert(msg));
      }
    });
  }

  //  Brisanje članova posade

  crtajBrisanjeClanaPosade(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Obriši člana posade:";
    cont.appendChild(naslov);

    const forma = dodajNoviDiv(cont);

    const lblClanoviPosade = document.createElement("p");
    lblClanoviPosade.innerHTML = "Član posade:";
    forma.appendChild(lblClanoviPosade);

    const listaClanova = document.createElement("select");
    listaClanova.className = "clanoviPosadeSB";
    forma.appendChild(listaClanova);
    this.unesiListuClanovaPosade();

    const btnBrisiClanaPosade = document.createElement("button");
    btnBrisiClanaPosade.innerHTML = "Obriši";
    btnBrisiClanaPosade.className = "dugme";
    btnBrisiClanaPosade.onclick = () => this.obrisiClanaPosade();
    forma.appendChild(btnBrisiClanaPosade);
  }

  unesiListuClanovaPosade() {
    const select = this.container.querySelector(".clanoviPosadeSB");
    select.innerHTML = "";

    if (this.krstarenje.clanoviPosade.length < 1) {
      select.disabled = true;
    } else {
      select.disabled = false;
      this.krstarenje.clanoviPosade.forEach((el) => {
        let a = document.createElement("option");
        a.innerHTML = `[ ${el.clanPosade.brLicence} ] ${el.clanPosade.ime} ${el.clanPosade.prezime}`;
        a.value = el.clanPosade.id;
        select.appendChild(a);
      });
    }
  }

  obrisiClanaPosade() {
    const idClana = this.container.querySelector(".clanoviPosadeSB").value;

    if (idClana == null || idClana == undefined || idClana == "") {
      alert("Morate da izaberete člana posade!");
      return;
    }

    fetch(
      ADR_SERVERA +
        `Krstarenje/ObrisiClanaPosade/${this.krstarenje.id}/${idClana}/`,
      {
        method: "DELETE",
      }
    ).then((resp) => {
      if (resp.ok) {
        this.krstarenje.clanoviPosade = this.krstarenje.clanoviPosade.filter(
          (el) => el.clanPosade.id != idClana
        );
        this.crtajBrojClanovaPosade();
        this.unesiListuClanovaPosade();
        alert("Član posade je uspešno obrisan!");
      } else {
        resp.text().then((msg) => alert(msg));
      }
    });
  }

  //  Pomocne funkcije

  crtajRedISobuInput(cont, event) {
    const innerCont = dodajNoviDiv(cont, "redISoba");

    const innerContRed = dodajNoviDiv(innerCont);

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

    const innerContSoba = dodajNoviDiv(innerCont);

    const lblSoba = document.createElement("p");
    lblSoba.innerHTML = "Soba:";
    innerContSoba.appendChild(lblSoba);

    const soba = document.createElement("select");
    soba.className = "sobaSB";
    soba.name = "sobaSB";
    this.postaviSelekcijuSoba(0, soba);

    red.onclick = () => {
      this.postaviSelekcijuSoba(red.value, soba);
      if (event != undefined && event != null) {
        event();
      }
    };
    if (event != undefined && event != null) {
      soba.onclick = () => event();
    }

    innerContSoba.appendChild(soba);
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
