export class Aktivnost {
  constructor(json) {
    if (json != undefined) {
      this.id = json.id;
      this.naziv = json.naziv;
      this.cena = json.cena;
    }
  }
}
