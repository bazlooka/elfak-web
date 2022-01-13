export class Putnik {
  constructor(json) {
    if (json != undefined) {
      this.id = json.id;
      this.brojPasosa = json.BrojPasosa;
      this.ime = json.Ime;
      this.prezime = json.Prezime;
      this.pol = json.Pol;
      this.datumRodjenja = json.DatumRodjenja;
    }
  }
}
