import { dodajNoviP, dodajNoviDiv, dodajNoviInput } from "../helper.js";
import { dodajNoviUnos, izmeniUnos, obrisiUnos } from "./Unos.js";
import { ClanPosade } from "../data/ClanPosade.js";

export function iscrtajUnosClanovaPosada(container) {
  //Forma za dodavanje članova posade

  const dodaj = dodajNoviDiv(container);

  let a = dodajNoviP(dodaj, "boldiraniTekst");
  a.innerHTML = "Dodaj člana posade:";

  dodajNoviInput(dodaj, "Broj licence*:", "brLicenceClanaPosade");
  dodajNoviInput(dodaj, "Ime*:", "imeClanaPosade");
  dodajNoviInput(dodaj, "Prezime*:", "prezimeClanaPosade");
  dodajNoviInput(dodaj, "Čin:", "cinClanaPosade");

  let btn = document.createElement("button");
  btn.innerHTML = "Dodaj";
  btn.className = "dugme";
  btn.onclick = () => dodajNovogClanaPosade(dodaj);
  dodaj.appendChild(btn);

  btn = document.createElement("button");
  btn.innerHTML = "Izmeni";
  btn.className = "dugme";
  btn.onclick = () => izmeniClanaPosade(dodaj);
  dodaj.appendChild(btn);

  //Forma za brisanje članova posade

  const obrisi = dodajNoviDiv(container);

  a = dodajNoviP(obrisi, "boldiraniTekst");
  a.innerHTML = "Obriši člana posade:";

  dodajNoviInput(obrisi, "Broj licence*:", "brLicenceZaBrisanje");

  btn = document.createElement("button");
  btn.innerHTML = "Obriši";
  btn.className = "dugme";
  btn.onclick = () => obrisiClanaPosade(obrisi);
  obrisi.appendChild(btn);
}

function dodajNovogClanaPosade(container) {
  let clanPosade = ucitajPodatkeIzInputa(container);
  dodajNoviUnos(clanPosade, "ClanPosade", container);
}

function izmeniClanaPosade(container) {
  let clanPosade = ucitajPodatkeIzInputa(container);
  izmeniUnos(clanPosade, "ClanPosade", container);
}

function obrisiClanaPosade(container) {
  let brojLicence = container.querySelector(".brLicenceZaBrisanje").value;
  if (brojLicence == undefined || brojLicence.length < 1) {
    alert(
      "Morate da unesete broj licence člana posade kojeg želite da obrišete"
    );
    return;
  }
  obrisiUnos(brojLicence, "ClanPosade", container);
}

function ucitajPodatkeIzInputa(kontejner) {
  let cp = new ClanPosade();
  cp.brLicence = kontejner.querySelector(".brLicenceClanaPosade").value;
  cp.ime = kontejner.querySelector(".imeClanaPosade").value;
  cp.prezime = kontejner.querySelector(".prezimeClanaPosade").value;
  cp.cin = kontejner.querySelector(".cinClanaPosade").value;

  if (cp.brLicence == undefined || cp.brLicence < 1 || cp.brLicence > 10000) {
    alert("Broj licence nije pravilno unet!");
    return;
  }
  if (cp.ime == undefined || cp.ime.length > 30) {
    alert("Ime člana posade nije pravilno uneto!");
    return;
  }
  if (cp.prezime == undefined || cp.prezime > 30) {
    alert("Prezime člana posade nije pravilno uneto!");
    return;
  }
  if (cp.cin != undefined && cp.cin.length > 30) {
    alert("Čin člana posade je predugačak!");
    return;
  }
  return cp;
}
