export class Kruzer {
  constructor(json) {
    if (json != undefined) {
      this.id = json.id;
      this.regBroj = json.regBroj;
      this.nazivBroda = json.nazivBroda;
      this.brojSobaPoRedu = json.brojSobaPoRedu;
      this.brojRedova = json.brojRedova;
      this.godinaProizvodnje = json.godinaProizvodnje;
      this.prevoznik = json.prevoznik;
    }
  }
}
