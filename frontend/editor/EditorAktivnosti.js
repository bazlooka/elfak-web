import { dodajNoviP, dodajNoviDiv } from "../helper.js";

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
          this.crtajElemente(this.trenutnoKrstarenje);
          this.crtajForme();
        } else {
          this.trenutnoKrstarenje.innerHTML = "";
          this.crtajElemente(this.trenutnoKrstarenje);
        }
      }
    }
  }

  crtajElemente(cont) {
    const cena = dodajNoviP(cont, "boldiraniTekst");
    cena.innerHTML = `Cena: ${this.aktivnost.cena} din. Zarada: ${this.aktivnost.honorar} din.`;

    const tabele = dodajNoviDiv(cont, "unosi");

    this.crtajListuPutnika(tabele);
    this.crtajListuClanovaPosade(tabele);
  }

  crtajForme() {
    const forme = dodajNoviDiv(this.container, "unosi");
    this.crtajDodavanjePutnika(forme);
    this.crtajDodavanjeClanovaPosade(forme);
  }

  crtajListuPutnika(cont) {
    let kontPrikaz = document.createElement("div");
    kontPrikaz.className = "Prikaz";
    cont.appendChild(kontPrikaz);

    const naslov = dodajNoviP(kontPrikaz, "boldiraniTekst");
    naslov.innerHTML = "Putnici";

    var tabela = document.createElement("table");
    tabela.className = "tabela";
    kontPrikaz.appendChild(tabela);

    var tabelahead = document.createElement("thead");
    tabela.appendChild(tabelahead);

    var tr = document.createElement("tr");
    tabelahead.appendChild(tr);

    var tabelaBody = document.createElement("tbody");
    tabelaBody.className = "TabelaPodaci";
    tabela.appendChild(tabelaBody);

    let th;
    var zag = ["Broj pasoša", "Ime", "Prezime", "Pol", "Datum rođenja"];
    zag.forEach((el) => {
      th = document.createElement("th");
      th.innerHTML = el;
      tr.appendChild(th);
    });

    //Test

    for (let i = 0; i < 5; i++) {
      var tr = document.createElement("tr");
      tabela.appendChild(tr);

      zag.forEach((el) => {
        var el = document.createElement("td");
        el.innerHTML = "test";
        tr.appendChild(el);
      });
    }
  }

  crtajListuClanovaPosade(cont) {
    let kontPrikaz = document.createElement("div");
    kontPrikaz.className = "Prikaz";
    cont.appendChild(kontPrikaz);

    const naslov = dodajNoviP(kontPrikaz, "boldiraniTekst");
    naslov.innerHTML = "Članovi posade";

    var tabela = document.createElement("table");
    tabela.className = "tabela";
    kontPrikaz.appendChild(tabela);

    var tabelahead = document.createElement("thead");
    tabela.appendChild(tabelahead);

    var tr = document.createElement("tr");
    tabelahead.appendChild(tr);

    var tabelaBody = document.createElement("tbody");
    tabelaBody.className = "TabelaPodaci";
    tabela.appendChild(tabelaBody);

    let th;
    var zag = ["Broj licence", "Ime", "Prezime", "Čin"];
    zag.forEach((el) => {
      th = document.createElement("th");
      th.innerHTML = el;
      tr.appendChild(th);
    });

    //Test

    for (let i = 0; i < 5; i++) {
      var tr = document.createElement("tr");
      tabela.appendChild(tr);

      zag.forEach((el) => {
        var el = document.createElement("td");
        el.innerHTML = "test";
        tr.appendChild(el);
      });
    }
  }

  azurirajElemente() {}

  //Forme

  crtajDodavanjePutnika(cont) {
    //Forma za dodavanje putnika

    const dodaj = dodajNoviDiv(cont, "unos");

    let a = dodajNoviP(dodaj, "boldiraniTekst");
    a.innerHTML = "Dodaj putnika:";

    const izborDodajPutnika = document.createElement("select");
    dodaj.appendChild(izborDodajPutnika);

    this.krstarenje.kruzer.sobe.forEach((soba) => {
      soba.krstariSpoj.forEach((spoj) => {
        let op = document.createElement("option");
        op.value = spoj.putnik.id;
        op.innerHTML = `[ ${spoj.putnik.brojPasosa} ] ${spoj.putnik.ime} ${spoj.putnik.prezime}`;
        izborDodajPutnika.appendChild(op);
      });
    });

    let btn = document.createElement("button");
    btn.innerHTML = "Dodaj";
    btn.className = "dugme";
    //btn.onclick = () => dodajNovuLuku(dodaj);
    dodaj.appendChild(btn);

    //Forma za brisanje putnika

    const obrisi = dodajNoviDiv(cont, "unos");

    a = dodajNoviP(obrisi, "boldiraniTekst");
    a.innerHTML = "Obriši putnika:";

    const izborObrisiPutnika = document.createElement("select");
    obrisi.appendChild(izborObrisiPutnika);

    btn = document.createElement("button");
    btn.innerHTML = "Obriši";
    btn.className = "dugme";
    //btn.onclick = () => obrisiLuku(obrisi);
    obrisi.appendChild(btn);

    cont.appendChild(dodaj);
    cont.appendChild(obrisi);
  }

  crtajDodavanjeClanovaPosade(cont) {
    const dodaj = dodajNoviDiv(cont, "unos");

    let a = dodajNoviP(dodaj, "boldiraniTekst");
    a.innerHTML = "Dodaj člana posade:";

    const izborDodajPutnika = document.createElement("select");
    dodaj.appendChild(izborDodajPutnika);
    this.krstarenje.clanoviPosade.forEach((angazovan) => {
      let op = document.createElement("option");
      op.value = angazovan.clanPosade.id;
      op.innerHTML = `[ ${angazovan.clanPosade.brLicence} ] ${angazovan.clanPosade.ime} ${angazovan.clanPosade.prezime}`;
      izborDodajPutnika.appendChild(op);
    });

    let btn = document.createElement("button");
    btn.innerHTML = "Dodaj";
    btn.className = "dugme";
    //btn.onclick = () => dodajNovuLuku(dodaj);
    dodaj.appendChild(btn);

    //Forma za brisanje putnika

    const obrisi = dodajNoviDiv(cont, "unos");

    a = dodajNoviP(obrisi, "boldiraniTekst");
    a.innerHTML = "Obriši člana posade:";

    const izborObrisiPutnika = document.createElement("select");
    obrisi.appendChild(izborObrisiPutnika);

    btn = document.createElement("button");
    btn.innerHTML = "Obriši";
    btn.className = "dugme";
    //btn.onclick = () => obrisiLuku(obrisi);
    obrisi.appendChild(btn);

    cont.appendChild(dodaj);
    cont.appendChild(obrisi);
  }

  pronadjiPutnika(id) {
    console.log(
      this.krstarenje.kruzer.sobe
        .map((soba) => soba.krstariSpoj.map((spoj) => spoj.putnik))
        .flat(1)
        .find((p) => p.id == id)
    );
  }
}
