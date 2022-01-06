import { Agencija } from "./Agencija.js";
import { dodajNoviDiv } from "./helper.js";

function kreirajAgenciju() {
  let aContainer = dodajNoviDiv(document.body, "appContainer");
  let agencija = new Agencija(aContainer);
  agencija.iscrtajFormu();
}

kreirajAgenciju();
//kreirajAgenciju();
