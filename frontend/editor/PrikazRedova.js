import { PrikazSobe } from "./PrikazSobe.js";

export class PrikazRedova {
  constructor(container, brojSobaPoRedu, brojRedova, sobe) {
    this.container = container;
    this.brojSobaPoRedu = brojSobaPoRedu;
    this.brojRedova = brojRedova;
    this.sobe = sobe;
  }

  crtaj() {
    for (let i = 0; i < this.brojRedova; i++) {
      let red = document.createElement("div");
      red.className = "prikazSobaRed";
      this.container.appendChild(red);

      for (let j = 0; j < this.brojSobaPoRedu; j++) {
        let prikazSobeContainer = document.createElement("div");
        prikazSobeContainer.className = "prikazSobe";
        red.appendChild(prikazSobeContainer);

        let prikazSobe = new PrikazSobe(
          prikazSobeContainer,
          this.sobe[i * this.brojSobaPoRedu + j]
        );
        prikazSobe.crtaj();
      }
    }
  }
}
