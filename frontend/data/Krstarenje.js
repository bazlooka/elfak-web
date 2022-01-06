export class Krstarenje {
  constructor(json) {
    if (json != undefined) {
      this.id = json.id;
      this.brPolaska = json.brPolaska;
      this.datumPocetka = json.datumPocetka;
      this.datumZavrsetka = json.datumZavrsetka;
    }
  }
}
