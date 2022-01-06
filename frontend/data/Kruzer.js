export class Kruzer {
  constructor(json) {
    if (json != undefined) {
      this.id = json.id;
      this.regBroj = json.regBroj;
      this.nazivBroda = json.nazivBroda;
      this.brojSoba = json.brojSoba;
      this.brojRedova = json.brojRedova;
      this.godinaProizvodnje = json.godinaProizvodnje;
      this.prevoznik = json.prevoznik;
    }
  }
}
