import { dodajNoviP, dodajNoviDiv, dodajNoviInput } from "../helper.js";
import { dodajNoviUnos, izmeniUnos, obrisiUnos } from "./Unos.js";
import { Kruzer } from "../data/Kruzer.js";

export function iscrtajUnosKruzera(container) {
  //Forma za dodavanje kruzera

  const dodaj = dodajNoviDiv(container);

  let a = dodajNoviP(dodaj, "boldiraniTekst");
  a.innerHTML = "Dodaj novi kruzer:";

  dodajNoviInput(dodaj, "Broj registracije*:", "regBrojKruzera");
  dodajNoviInput(dodaj, "Naziv broda*:", "nazivKruzera");
  dodajNoviInput(dodaj, "Broj soba*:", "brojSobaKruzera", "number");
  dodajNoviInput(dodaj, "Broj redova*:", "brojRedovaKruzera", "number");
  dodajNoviInput(dodaj, "Godina proizvodnje:", "godisteKruzera", "number");
  dodajNoviInput(dodaj, "Prevoznik:", "prevoznikKruzera");

  let btn = document.createElement("button");
  btn.innerHTML = "Dodaj";
  btn.className = "dugme";
  btn.onclick = () => dodajNoviKruzer(dodaj);
  dodaj.appendChild(btn);

  btn = document.createElement("button");
  btn.innerHTML = "Izmeni";
  btn.className = "dugme";
  btn.onclick = () => izmeniKruzer(dodaj);
  dodaj.appendChild(btn);

  //Forma za brisanje kruzera

  const obrisi = dodajNoviDiv(container);

  a = dodajNoviP(obrisi, "boldiraniTekst");
  a.innerHTML = "Obriši kruzer:";

  dodajNoviInput(obrisi, "Broj registracije*:", "brRegistracijeZaBrisanje");

  btn = document.createElement("button");
  btn.innerHTML = "Obriši";
  btn.className = "dugme";
  btn.onclick = () => obrisiKruzer(obrisi);
  obrisi.appendChild(btn);
}

function dodajNoviKruzer(container) {
  let kruzer = ucitajPodatkeIzInputa(container);
  dodajNoviUnos(kruzer, "Kruzer", container);
}

function izmeniKruzer(container) {
  let kruzer = ucitajPodatkeIzInputa(container);
  izmeniUnos(kruzer, "Kruzer", container);
}

function obrisiKruzer(container) {
  let brojRegistracije = container.querySelector(
    ".brRegistracijeZaBrisanje"
  ).value;
  if (brojRegistracije == undefined || brojRegistracije.length < 1) {
    alert(
      "Morate da unesete broj registracije kruzera kojeg želite da obrišete"
    );
    return;
  }
  obrisiUnos(brojRegistracije, "Kruzer", container);
}

function ucitajPodatkeIzInputa(kontejner) {
  let k = new Kruzer();
  k.regBroj = kontejner.querySelector(".regBrojKruzera").value;
  k.nazivBroda = kontejner.querySelector(".nazivKruzera").value;
  k.brojSoba = kontejner.querySelector(".brojSobaKruzera").value;
  k.brojRedova = kontejner.querySelector(".brojRedovaKruzera").value;
  k.godinaProizvodnje = kontejner.querySelector(".godisteKruzera").value;
  k.prevoznik = kontejner.querySelector(".prevoznikKruzera").value;

  if (k.regBroj == undefined || k.regBroj.length < 1) {
    alert("Morate uneti registracioni broj!");
    return;
  }
  if (k.regBroj.length > 10) {
    alert("Dužina registracionog broja ne može biti veća od 10!");
    return;
  }
  if (k.nazivBroda == undefined || k.nazivBroda.length > 30) {
    alert("Naziv broda nije unet ispravno!");
    return;
  }
  if (
    k.brojSoba == undefined ||
    parseInt(k.brojSoba, 10) < 1 ||
    parseInt(k.brojSoba, 10) > 200
  ) {
    alert(
      "Broj soba nije unet ispravno! Minimalan broj soba je 1, a maksimalan 200."
    );
    return;
  }
  if (
    k.brojRedova == undefined ||
    parseInt(k.brojRedova, 10) < 1 ||
    parseInt(k.brojRedova, 10) > 6
  ) {
    alert(
      "Broj redova nije unet ispravno! Minimalan broj redova je 1, a maksimalan 6."
    );
    return;
  }
  if (parseInt(k.brojRedova, 10) > parseInt(k.brojSoba, 10)) {
    alert("Broj redova ne može da bude veći od broja soba!");
    return;
  }
  if (k.godinaProizvodnje > new Date().getFullYear()) {
    alert("Godina proizvodnje nije ispravna");
    return;
  }
  if (k.prevoznik != undefined && k.prevoznik.length > 30) {
    alert("Naziv prevoznika nije ispravan!");
    return;
  }
  return k;
}
