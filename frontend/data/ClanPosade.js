export class ClanPosade {
  constructor(json) {
    if (json != undefined) {
      this.id = json.id;
      this.brLicence = json.brLicence;
      this.ime = json.ime;
      this.prezime = json.prezime;
      this.cin = json.cin;
    }
  }
}
