import { dodajNoviP, dodajNoviInput, dodajNoviDiv } from "../helper.js";
import { dodajNoviUnos, izmeniUnos, obrisiUnos } from "./Unos.js";
import { Luka } from "../data/Luka.js";

export function iscrtajUnosLuka(container) {
  //Forma za dodavanje luka
  const dodaj = dodajNoviDiv(container);

  let a = dodajNoviP(dodaj, "boldiraniTekst");
  a.innerHTML = "Dodaj novu luku:";

  dodajNoviInput(dodaj, "Oznaka*:", "oznakaLuke");
  dodajNoviInput(dodaj, "Visina takse*:", "visinaTakseLuke", "number");
  dodajNoviInput(dodaj, "Naziv:", "nazivLuke");
  dodajNoviInput(dodaj, "Država:", "drzavaLuke");
  dodajNoviInput(dodaj, "Grad:", "gradLuke");

  let btn = document.createElement("button");
  btn.innerHTML = "Dodaj";
  btn.className = "dugme";
  btn.onclick = () => dodajNovuLuku(dodaj);
  dodaj.appendChild(btn);

  btn = document.createElement("button");
  btn.innerHTML = "Izmeni";
  btn.className = "dugme";
  btn.onclick = () => izmeniLuku(dodaj);
  dodaj.appendChild(btn);

  //Forma za brisanje luka

  const obrisi = dodajNoviDiv(container);

  a = dodajNoviP(obrisi, "boldiraniTekst");
  a.innerHTML = "Obriši luku:";

  dodajNoviInput(obrisi, "Oznaka*:", "oznakaZaBrisanjeLuke");

  btn = document.createElement("button");
  btn.innerHTML = "Obriši";
  btn.className = "dugme";
  btn.onclick = () => obrisiLuku(obrisi);
  obrisi.appendChild(btn);
}

function dodajNovuLuku(container) {
  let luka = ucitajPodatkeIzInputa(container);
  dodajNoviUnos(luka, "Luka", container);
}

function izmeniLuku(container) {
  let luka = ucitajPodatkeIzInputa(container);
  izmeniUnos(luka, "Luka", container);
}

function obrisiLuku(container) {
  let oznakaLuke = container.querySelector(".oznakaZaBrisanjeLuke").value;
  if (oznakaLuke == undefined || oznakaLuke.length < 1) {
    alert("Morate da unesete oznaku luke koju želite da obrišete!");
    return;
  }
  obrisiUnos(oznakaLuke, "Luka", container);
}

function ucitajPodatkeIzInputa(container) {
  let luka = new Luka();
  luka.oznaka = container.querySelector(".oznakaLuke").value;
  luka.visinaTakse = container.querySelector(".visinaTakseLuke").value;
  luka.naziv = container.querySelector(".nazivLuke").value;
  luka.drzava = container.querySelector(".drzavaLuke").value;
  luka.grad = container.querySelector(".gradLuke").value;

  if (luka.oznaka == undefined || luka.oznaka.length < 1) {
    alert("Morate uneti oznaku luke!");
    return;
  }
  if (luka.oznaka.length > 5) {
    alert("Dužina oznaka luke ne može biti veća od 5!");
    return;
  }
  if (luka.visinaTakse == undefined || luka.visinaTakse <= 0) {
    alert("Morate uneti visinu takse!");
    return;
  }
  if (luka.naziv != undefined && luka.naziv.length > 30) {
    alert("Naziv luke nije ispravan!");
    return;
  }
  if (luka.drzava != undefined && luka.drzava.length > 30) {
    alert("Naziv države nije ispravan!");
    return;
  }
  if (luka.grad != undefined && luka.grad.length > 30) {
    alert("Naziv grada nije ispravan!");
    return;
  }
  return luka;
}
