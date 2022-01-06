export class Soba {
  constructor(json) {
    this.id = json.ID;
    this.broj = json.Broj;
    this.cenaNocenja = json.CenaNocenja;
    this.kapacitet = json.Kapacitet;
    this.klasa = json.Klasa;
  }
}
