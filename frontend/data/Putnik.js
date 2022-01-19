export class Putnik {
  constructor(json) {
    if (json != undefined) {
      this.id = json.id;
      this.brojPasosa = json.brojPasosa;
      this.ime = json.ime;
      this.prezime = json.prezime;
      this.pol = json.pol;
      this.datumRodjenja = json.datumRodjenja;
    }
  }
}
