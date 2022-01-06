export class Luka {
  constructor(json) {
    if (json != undefined) {
      this.id = json.id;
      this.oznaka = json.oznaka;
      this.visinaTakse = json.visinaTakse;
      this.naziv = json.naziv;
      this.drzava = json.drzava;
      this.grad = json.grad;
    }
  }
}
