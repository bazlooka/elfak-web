import { dodajNoviDiv, obrisiIdIzListe, dodajUnosUListu } from "../helper.js";

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
    const forme = dodajNoviDiv(this.container, "unosi");
    this.crtajObracunZaPutnika(dodajNoviDiv(forme, "unos"));
    this.crtajObracunZaClanaPosade(dodajNoviDiv(forme, "unos"));
  }

  crtajObracunZaPutnika(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Obračun cene krstarenja:";
    cont.appendChild(naslov);

    const putnici = document.createElement("select");
    putnici.className = "putniciSB";
    cont.appendChild(putnici);

    this.krstarenje.kruzer.sobe.forEach((soba) => {
      soba.krstariSpoj.forEach((spoj) => {
        dodajUnosUListu(
          putnici,
          `[ ${spoj.putnik.brojPasosa} ] ${spoj.putnik.ime} ${spoj.putnik.prezime}`,
          spoj.putnik.id
        );
      });
    });

    if (putnici.innerHTML == "") putnici.disabled = true;

    const btnIzracunaj = document.createElement("button");
    btnIzracunaj.innerHTML = "Izračunaj";
    btnIzracunaj.className = "dugme";
    btnIzracunaj.onclick = () => this.izracunajCenu();
    cont.appendChild(btnIzracunaj);
  }

  izracunajCenu() {
    let ukupnaCena = 0;

    const idPutnika = this.container.querySelector(".putniciSB").value;
    const putnik = this.pronadjiPutnika(idPutnika);
    let soba;

    this.krstarenje.kruzer.sobe.forEach((s) => {
      if (s.krstariSpoj.find((p) => p.putnik.id == idPutnika)) {
        soba = s;
      }
    });

    let tekst = `Obračun cene:\nPutnik: ${putnik.ime} ${putnik.prezime}\n`;

    let datumPocetka = new Date(this.krstarenje.datumPocetka);
    let datumZavrsetka = new Date(this.krstarenje.datumZavrsetka);

    const brojDana =
      Math.ceil((datumZavrsetka - datumPocetka) / (1000 * 60 * 60 * 24)) + 1;

    tekst += `Cena noćenja:\n • ${brojDana} x ${soba.cenaNocenja} = ${
      brojDana * soba.cenaNocenja
    } din.`;

    ukupnaCena += brojDana * soba.cenaNocenja;

    tekst += "\nLučke takse:";

    let luke = new Array();
    if (this.krstarenje.polaznaLuka != undefined)
      luke.push(this.krstarenje.polaznaLuka);

    luke = luke.concat(this.krstarenje.usputneLuke);

    if (this.krstarenje.odredisnaLuka != undefined)
      luke.push(this.krstarenje.odredisnaLuka);

    luke.forEach((p) => {
      tekst += `\n• [ ${p.oznaka} ] ${p.naziv} - ${p.visinaTakse} din.`;
      ukupnaCena += p.visinaTakse;
    });

    tekst += "\nAktivnosti:";

    this.krstarenje.aktivnosti.forEach((akt) => {
      if (akt.putinciId.find((p) => p == idPutnika)) {
        tekst += `\n• ${akt.naziv} - ${akt.cena} din.`;
        ukupnaCena += akt.cena;
      }
    });

    tekst += `\n-------------------\nUkupna cena: ${ukupnaCena} din.`;
    alert(tekst);
  }

  crtajObracunZaClanaPosade(cont) {
    const naslov = document.createElement("p");
    naslov.className = "boldiraniTekst";
    naslov.innerHTML = "Obračun zarade posade:";
    cont.appendChild(naslov);

    const clanoviPosade = document.createElement("select");
    clanoviPosade.className = "clanoviPosadeSB";
    cont.appendChild(clanoviPosade);

    this.krstarenje.clanoviPosade.forEach((spoj) => {
      dodajUnosUListu(
        clanoviPosade,
        `[ ${spoj.clanPosade.brLicence} ] ${spoj.clanPosade.ime} ${spoj.clanPosade.prezime}`,
        spoj.clanPosade.id
      );
    });

    if (clanoviPosade.innerHTML == "") clanoviPosade.disabled = true;

    const btnIzracunaj = document.createElement("button");
    btnIzracunaj.innerHTML = "Izračunaj";
    btnIzracunaj.className = "dugme";
    btnIzracunaj.onclick = () => this.izracunajZaradu();
    cont.appendChild(btnIzracunaj);
  }

  izracunajZaradu() {
    let ukupnaZarada = 0;
    const idClanaPosade =
      this.container.querySelector(".clanoviPosadeSB").value;
    const cpSpoj = this.pronadjiClanaPosade(idClanaPosade);

    let tekst = `Obračun zarade:\nČlan posade: ${cpSpoj.clanPosade.ime} ${cpSpoj.clanPosade.prezime}`;
    tekst += `\nHonorar:\n• ${cpSpoj.clanPosade.cin} - ${cpSpoj.honorar} din.`;
    ukupnaZarada += cpSpoj.honorar;
    tekst += "\nAktivnosti:";

    this.krstarenje.aktivnosti.forEach((akt) => {
      if (akt.clanoviPosadeId.find((p) => p == idClanaPosade)) {
        tekst += `\n• ${akt.naziv} - ${akt.honorar} din.`;
        ukupnaZarada += akt.honorar;
      }
    });

    tekst += `\n-------------------\nUkupna zarada: ${ukupnaZarada} din.`;
    alert(tekst);
  }

  pronadjiPutnika(id) {
    return this.krstarenje.kruzer.sobe
      .map((soba) => soba.krstariSpoj.map((spoj) => spoj.putnik))
      .flat(1)
      .find((p) => p.id == id);
  }

  pronadjiClanaPosade(id) {
    return this.krstarenje.clanoviPosade.find((p) => p.clanPosade.id == id);
  }
}
