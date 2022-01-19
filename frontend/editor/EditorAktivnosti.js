import {
  dodajNoviP,
  dodajNoviDiv,
  obrisiIdIzListe,
  dodajUnosUListu,
  ADR_SERVERA,
} from "../helper.js";

export class EditorAktivnosti {
  constructor(container, krstarenje) {
    this.container = container;
    this.krstarenje = krstarenje;
  }

  crtaj(aktivnost) {
    if (aktivnost != undefined && aktivnost != null) {
      if (this.aktivnost != aktivnost) {
        this.aktivnost = aktivnost;
        if (this.container.innerHTML == "") {
          this.trenutnoKrstarenje = dodajNoviDiv(
            this.container,
            "trenutnoKrstarenje"
          );
          this.forme = dodajNoviDiv(this.container, "unosi");
        }
        this.trenutnoKrstarenje.innerHTML = "";
        this.forme.innerHTML = "";
        this.crtajElemente(this.trenutnoKrstarenje);
        this.crtajForme(this.forme);
      }
    }
  }

  crtajElemente(cont) {
    const tabele = dodajNoviDiv(cont, "unosi");
    this.crtajListuPutnika(tabele);
    this.crtajListuClanovaPosade(tabele);
  }

  crtajForme() {
    this.crtajDodavanjePutnika(this.forme);
    this.crtajDodavanjeClanovaPosade(this.forme);
  }

  crtajListuPutnika(cont) {
    let kontPrikaz = document.createElement("div");
    kontPrikaz.className = "listaPutnika";
    cont.appendChild(kontPrikaz);

    const naslov = dodajNoviP(kontPrikaz, "boldiraniTekst");
    naslov.innerHTML = "Putnici";

    const podnaslov = dodajNoviP(kontPrikaz);
    podnaslov.innerHTML = `Cena: ${this.aktivnost.cena} din.`;

    var tabela = document.createElement("table");
    tabela.className = "tabela";
    kontPrikaz.appendChild(tabela);

    var tabelahead = document.createElement("thead");
    tabela.appendChild(tabelahead);

    var tr = document.createElement("tr");
    tabelahead.appendChild(tr);

    var tabelaBody = document.createElement("tbody");
    tabelaBody.className = "tabelaPutniciPodaci";
    tabela.appendChild(tabelaBody);

    let th;
    var zag = ["Broj pasoša", "Ime", "Prezime", "Pol", "Datum rođenja"];
    zag.forEach((el) => {
      th = document.createElement("th");
      th.innerHTML = el;
      tr.appendChild(th);
    });

    this.aktivnost.putinciId.forEach((pId) => {
      let putnik = this.pronadjiPutnika(pId);
      this.crtajPutnika(tabelaBody, putnik);
    });
  }

  crtajPutnika(cont, putnik) {
    if (putnik != undefined && putnik != null) {
      var tr = document.createElement("tr");
      tr.value = putnik.id;
      cont.appendChild(tr);

      let unos = [
        putnik.brojPasosa,
        putnik.ime,
        putnik.prezime,
        putnik.pol,
        new Date(putnik.datumRodjenja).toLocaleDateString("sr-RS"),
      ];

      unos.forEach((el) => {
        var td = document.createElement("td");
        td.innerHTML = el;
        tr.appendChild(td);
      });
    }
  }

  crtajListuClanovaPosade(cont) {
    let kontPrikaz = document.createElement("div");
    kontPrikaz.className = "listaClanovaPosade";
    cont.appendChild(kontPrikaz);

    const naslov = dodajNoviP(kontPrikaz, "boldiraniTekst");
    naslov.innerHTML = "Članovi posade";

    const podnaslov = dodajNoviP(kontPrikaz);
    podnaslov.innerHTML = `Zarada: ${this.aktivnost.honorar} din.`;

    var tabela = document.createElement("table");
    tabela.className = "tabela";
    kontPrikaz.appendChild(tabela);

    var tabelahead = document.createElement("thead");
    tabela.appendChild(tabelahead);

    var tr = document.createElement("tr");
    tabelahead.appendChild(tr);

    var tabelaBody = document.createElement("tbody");
    tabelaBody.className = "tabelaClanoviPosadePodaci";
    tabela.appendChild(tabelaBody);

    let th;
    var zag = ["Broj licence", "Ime", "Prezime", "Čin"];
    zag.forEach((el) => {
      th = document.createElement("th");
      th.innerHTML = el;
      tr.appendChild(th);
    });

    this.aktivnost.clanoviPosadeId.forEach((cpId) => {
      let clanPosade = this.pronadjiClanaPosade(cpId);
      this.crtajClanaPosade(tabelaBody, clanPosade);
    });
  }

  crtajClanaPosade(cont, clanPosade) {
    var tr = document.createElement("tr");
    tr.value = clanPosade.id;
    cont.appendChild(tr);

    let unos = [
      clanPosade.brLicence,
      clanPosade.ime,
      clanPosade.prezime,
      clanPosade.cin,
    ];

    unos.forEach((el) => {
      var td = document.createElement("td");
      td.innerHTML = el;
      tr.appendChild(td);
    });
  }

  //  Forme

  //  Putnici

  crtajDodavanjePutnika(cont) {
    //Forma za dodavanje putnika

    const dodaj = dodajNoviDiv(cont, "unos");

    let a = dodajNoviP(dodaj, "boldiraniTekst");
    a.innerHTML = "Dodaj putnika:";

    const izborDodajPutnika = document.createElement("select");
    izborDodajPutnika.className = "izborDodajPutnika";
    dodaj.appendChild(izborDodajPutnika);

    this.krstarenje.kruzer.sobe.forEach((soba) => {
      soba.krstariSpoj
        .filter((p) => !this.aktivnost.putinciId.find((q) => q == p.putnik.id))
        .forEach((spoj) => {
          dodajUnosUListu(
            izborDodajPutnika,
            `[ ${spoj.putnik.brojPasosa} ] ${spoj.putnik.ime} ${spoj.putnik.prezime}`,
            spoj.putnik.id
          );
        });
    });

    if (izborDodajPutnika.innerHTML == "") izborDodajPutnika.disabled = true;

    let btn = document.createElement("button");
    btn.innerHTML = "Dodaj";
    btn.className = "dugme";
    btn.onclick = () => this.dodajPutnika();
    dodaj.appendChild(btn);

    //Forma za brisanje putnika

    const obrisi = dodajNoviDiv(cont, "unos");

    a = dodajNoviP(obrisi, "boldiraniTekst");
    a.innerHTML = "Obriši putnika:";

    const izborObrisiPutnika = document.createElement("select");
    izborObrisiPutnika.className = "izborObrisiPutnika";
    obrisi.appendChild(izborObrisiPutnika);

    this.aktivnost.putinciId.forEach((pId) => {
      let putnik = this.pronadjiPutnika(pId);
      dodajUnosUListu(
        izborObrisiPutnika,
        `[ ${putnik.brojPasosa} ] ${putnik.ime} ${putnik.prezime}`,
        putnik.id
      );
    });

    if (izborObrisiPutnika.innerHTML == "") izborObrisiPutnika.disabled = true;

    btn = document.createElement("button");
    btn.innerHTML = "Obriši";
    btn.className = "dugme";
    btn.onclick = () => this.obrisiPutnika();
    obrisi.appendChild(btn);

    cont.appendChild(dodaj);
    cont.appendChild(obrisi);
  }

  dodajPutnika() {
    const idPutnika = this.container.querySelector(".izborDodajPutnika").value;

    if (idPutnika === null || idPutnika === undefined || idPutnika == "") {
      alert("Morate da izaberete putnika!");
      return;
    }

    fetch(
      ADR_SERVERA + `Aktivnost/DodajPutnika/${this.aktivnost.id}/${idPutnika}`,
      {
        method: "POST",
      }
    ).then((resp) => {
      if (resp.ok) {
        resp.json().then((json) => {
          this.aktivnost.putinciId.push(json.id);
          this.crtajPutnika(
            this.container.querySelector(".tabelaPutniciPodaci"),
            json
          );
          obrisiIdIzListe(
            this.container.querySelector(".izborDodajPutnika"),
            json.id
          );
          dodajUnosUListu(
            this.container.querySelector(".izborObrisiPutnika"),
            `[ ${json.brojPasosa} ] ${json.ime} ${json.prezime}`,
            json.id
          );
          alert("Putnik je uspešno dodat!");
        });
      } else {
        resp.text().then((msg) => alert(msg));
      }
    });
  }

  obrisiPutnika() {
    const idPutnika = this.container.querySelector(".izborObrisiPutnika").value;

    if (idPutnika === null || idPutnika === undefined || idPutnika == "") {
      alert("Morate da izaberete putnika!");
      return;
    }

    fetch(
      ADR_SERVERA + `Aktivnost/ObrisiPutnika/${this.aktivnost.id}/${idPutnika}`,
      {
        method: "DELETE",
      }
    ).then((resp) => {
      if (resp.ok) {
        resp.json().then((json) => {
          this.aktivnost.putinciId = this.aktivnost.putinciId.filter(
            (p) => p != json.id
          );
          obrisiIdIzListe(
            this.container.querySelector(".tabelaPutniciPodaci"),
            json.id
          );
          obrisiIdIzListe(
            this.container.querySelector(".izborObrisiPutnika"),
            json.id
          );
          dodajUnosUListu(
            this.container.querySelector(".izborDodajPutnika"),
            `[ ${json.brojPasosa} ] ${json.ime} ${json.prezime}`,
            json.id
          );
          alert("Putnik je uspešno obrisan!");
        });
      } else {
        resp.text().then((msg) => alert(msg));
      }
    });
  }

  // Članovi posade

  crtajDodavanjeClanovaPosade(cont) {
    const dodaj = dodajNoviDiv(cont, "unos");

    let a = dodajNoviP(dodaj, "boldiraniTekst");
    a.innerHTML = "Dodaj člana posade:";

    const izborDodajClanaPosade = document.createElement("select");
    izborDodajClanaPosade.className = "izborDodajClanaPosade";
    dodaj.appendChild(izborDodajClanaPosade);

    this.krstarenje.clanoviPosade
      .filter(
        (p) => !this.aktivnost.clanoviPosadeId.find((q) => q == p.clanPosade.id)
      )
      .forEach((angazovan) => {
        let op = document.createElement("option");
        op.value = angazovan.clanPosade.id;
        op.innerHTML = `[ ${angazovan.clanPosade.brLicence} ] ${angazovan.clanPosade.ime} ${angazovan.clanPosade.prezime}`;
        izborDodajClanaPosade.appendChild(op);
      });

    if (izborDodajClanaPosade.innerHTML == "")
      izborDodajClanaPosade.disabled = true;

    let btn = document.createElement("button");
    btn.innerHTML = "Dodaj";
    btn.className = "dugme";
    btn.onclick = () => this.dodajClanaPosade();
    dodaj.appendChild(btn);

    //Forma za brisanje članova posade

    const obrisi = dodajNoviDiv(cont, "unos");

    a = dodajNoviP(obrisi, "boldiraniTekst");
    a.innerHTML = "Obriši člana posade:";

    const izborObrisiClanaPosade = document.createElement("select");
    izborObrisiClanaPosade.className = "izborObrisiClanaPosade";
    obrisi.appendChild(izborObrisiClanaPosade);

    this.aktivnost.clanoviPosadeId.forEach((cpId) => {
      let clanPosade = this.pronadjiClanaPosade(cpId);

      dodajUnosUListu(
        izborObrisiClanaPosade,
        `[ ${clanPosade.brLicence} ] ${clanPosade.ime} ${clanPosade.prezime}`,
        clanPosade.id
      );
    });

    if (izborObrisiClanaPosade.innerHTML == "")
      izborObrisiClanaPosade.disabled = true;

    btn = document.createElement("button");
    btn.innerHTML = "Obriši";
    btn.className = "dugme";
    btn.onclick = () => this.obrisiClanaPosade();
    obrisi.appendChild(btn);

    cont.appendChild(dodaj);
    cont.appendChild(obrisi);
  }

  dodajClanaPosade() {
    const idClanaP = this.container.querySelector(
      ".izborDodajClanaPosade"
    ).value;

    if (idClanaP === null || idClanaP === undefined || idClanaP == "") {
      alert("Morate da izaberete člana posade!");
      return;
    }

    fetch(
      ADR_SERVERA +
        `Aktivnost/DodajClanaPosade/${this.aktivnost.id}/${idClanaP}`,
      {
        method: "POST",
      }
    ).then((resp) => {
      if (resp.ok) {
        resp.json().then((json) => {
          this.aktivnost.clanoviPosadeId.push(json.id);
          this.crtajClanaPosade(
            this.container.querySelector(".tabelaClanoviPosadePodaci"),
            json
          );
          obrisiIdIzListe(
            this.container.querySelector(".izborDodajClanaPosade"),
            json.id
          );
          dodajUnosUListu(
            this.container.querySelector(".izborObrisiClanaPosade"),
            `[ ${json.brLicence} ] ${json.ime} ${json.prezime}`,
            json.id
          );
          alert("Član posade je uspešno dodat!");
        });
      } else {
        resp.text().then((msg) => alert(msg));
      }
    });
  }

  obrisiClanaPosade() {
    const idClanaP = this.container.querySelector(
      ".izborObrisiClanaPosade"
    ).value;

    if (idClanaP === null || idClanaP === undefined || idClanaP == "") {
      alert("Morate da izaberete člana posade!");
      return;
    }

    fetch(
      ADR_SERVERA +
        `Aktivnost/ObrisiClanaPosade/${this.aktivnost.id}/${idClanaP}`,
      {
        method: "DELETE",
      }
    ).then((resp) => {
      if (resp.ok) {
        resp.json().then((json) => {
          this.aktivnost.clanoviPosadeId =
            this.aktivnost.clanoviPosadeId.filter((p) => p != json.id);
          obrisiIdIzListe(
            this.container.querySelector(".tabelaClanoviPosadePodaci"),
            json.id
          );
          obrisiIdIzListe(
            this.container.querySelector(".izborObrisiClanaPosade"),
            json.id
          );
          dodajUnosUListu(
            this.container.querySelector(".izborDodajClanaPosade"),
            `[ ${json.brLicence} ] ${json.ime} ${json.prezime}`,
            json.id
          );
          alert("Član posade je uspešno obrisan!");
        });
      } else {
        resp.text().then((msg) => alert(msg));
      }
    });
  }

  pronadjiPutnika(id) {
    return this.krstarenje.kruzer.sobe
      .map((soba) => soba.krstariSpoj.map((spoj) => spoj.putnik))
      .flat(1)
      .find((p) => p.id == id);
  }

  pronadjiClanaPosade(id) {
    return this.krstarenje.clanoviPosade.find((p) => p.clanPosade.id == id)
      .clanPosade;
  }
}
