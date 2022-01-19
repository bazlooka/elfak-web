import { dodajNoviP, dodajNoviDiv, dodajNoviInput } from "../helper.js";
import { dodajNoviUnos, izmeniUnos, obrisiUnos } from "./Unos.js";
import { Putnik } from "../data/Putnik.js";

export function iscrtajUnosPutnika(container) {
  //Forma za dodavanje putnika

  const dodaj = dodajNoviDiv(container);

  let naslov = dodajNoviP(dodaj, "boldiraniTekst");
  naslov.innerHTML = "Dodaj novog putnika:";

  dodajNoviInput(dodaj, "Broj pasoša*:", "brPasosaPutnika");
  dodajNoviInput(dodaj, "Ime*:", "imePutnika");
  dodajNoviInput(dodaj, "Prezime*:", "prezimePutnika");

  let divRb = document.createElement("div");

  let labela = document.createElement("p");
  labela.innerHTML = "Pol*:";
  divRb.appendChild(labela);
  dodaj.appendChild(divRb);

  divRb = document.createElement("div");

  let opcija = document.createElement("input");
  opcija.type = "radio";
  opcija.className = "radio";
  opcija.name = "noviPutnikPol";
  opcija.value = "m";

  labela = document.createElement("label");
  labela.innerHTML = "M";
  labela.className = "radioLabel";
  divRb.appendChild(opcija);
  divRb.appendChild(labela);

  opcija = document.createElement("input");
  opcija.type = "radio";
  opcija.className = "radio";
  opcija.name = "noviPutnikPol";
  opcija.value = "z";

  labela = document.createElement("label");
  labela.className = "radioLabel";
  labela.innerHTML = "Ž";

  divRb.appendChild(opcija);
  divRb.appendChild(labela);
  dodaj.appendChild(divRb);

  dodajNoviInput(dodaj, "Datum rođenja:", "datumRodjenjaPutnika", "date");

  let btn = document.createElement("button");
  btn.innerHTML = "Dodaj";
  btn.className = "dugme";
  btn.onclick = () => dodajNovogPutnika(dodaj);
  dodaj.appendChild(btn);

  btn = document.createElement("button");
  btn.innerHTML = "Izmeni";
  btn.className = "dugme";
  btn.onclick = () => izmeniPutnika(dodaj);
  dodaj.appendChild(btn);

  //Forma za brisanje putnika

  const obrisi = dodajNoviDiv(container);

  naslov = dodajNoviP(obrisi, "boldiraniTekst");
  naslov.innerHTML = "Obriši putnika:";

  dodajNoviInput(obrisi, "Broj pasoša*:", "brPasosaZaBrisanjePutnika");

  btn = document.createElement("button");
  btn.innerHTML = "Obriši";
  btn.className = "dugme";
  btn.onclick = () => obrisiPutnika(obrisi);
  obrisi.appendChild(btn);
}

function dodajNovogPutnika(kontejner) {
  let putnik = ucitajPodatkeIzInputa(kontejner);
  dodajNoviUnos(putnik, "Putnik", kontejner);
}

function izmeniPutnika(kontejner) {
  let putnik = ucitajPodatkeIzInputa(kontejner);
  izmeniUnos(putnik, "Putnik", kontejner);
}

function obrisiPutnika(kontejner) {
  let brojPasosa = kontejner.querySelector(".brPasosaZaBrisanjePutnika").value;
  if (brojPasosa == undefined || brojPasosa.length < 1) {
    alert("Morate da unesete broj pasoša putnika kojeg želite da obrišete!");
    return;
  }
  obrisiUnos(brojPasosa, "Putnik", kontejner);
}

function ucitajPodatkeIzInputa(kontejner) {
  let p = new Putnik();
  p.brojPasosa = kontejner.querySelector(".brPasosaPutnika").value;
  p.ime = kontejner.querySelector(".imePutnika").value;
  p.prezime = kontejner.querySelector(".prezimePutnika").value;
  let polCB = kontejner.querySelector("input[name='noviPutnikPol']:checked");
  p.datumRodjenja = kontejner.querySelector(".datumRodjenjaPutnika").value;

  if (polCB == undefined) {
    alert("Morate izabrati pol putnika!");
    return;
  }

  p.pol = polCB.value;

  if (p.brojPasosa == undefined || p.brojPasosa.length < 1) {
    alert("Morate uneti broj pasoša putnika!");
    return;
  }
  if (p.prevoznik != undefined && p.prevoznik.length > 30) {
    alert("Naziv prevoznika nije ispravan!");
    return;
  }
  if (p.ime == undefined || p.ime.length < 1) {
    alert("Morate uneti ime putnika!");
    return;
  }
  if (p.prezime == undefined || p.prezime.length < 1) {
    alert("Morate uneti prezime putnika!");
    return;
  }

  console.log(p);

  return p;
}
