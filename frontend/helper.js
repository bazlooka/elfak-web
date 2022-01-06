export const ADR_SERVERA = "https://localhost:5001/";

export function dodajNoviDiv(kontejner, klasa) {
  return dodajNoviElement(kontejner, klasa, "div");
}

export function dodajNoviP(kontejner, klasa) {
  return dodajNoviElement(kontejner, klasa, "p");
}

export function dodajNoviInput(div, labela, klasa, type) {
  let lbl = document.createElement("p");
  lbl.innerHTML = labela;
  div.appendChild(lbl);

  let input = dodajNoviElement(div, klasa, "input");
  if (type != undefined) input.type = type;
}

export function dodajNoviElement(kontejner, klasa, tip) {
  let el = document.createElement(tip);
  if (klasa != undefined) el.className = klasa;
  kontejner.appendChild(el);
  return el;
}

export function prikaziGresku(poruka) {
  alert("Greška: " + poruka);
}
