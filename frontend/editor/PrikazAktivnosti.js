import { dodajNoviDiv, dodajNoviP, dodajNoviInput } from "../helper.js";

export class PrikazAktivnosti {
  constructor(container, aktivnosti, idKrstarenja) {
    this.container = container;
    this.aktivnosti = aktivnosti;
    this.idKrstarenja = idKrstarenja;
  }

  crtaj() {
    const naslov = document.createElement("h2");
    naslov.innerHTML = "Aktivnosti";
    this.container.appendChild(naslov);

    const divSelectAktivnost = document.createElement("div");
    divSelectAktivnost.className = "selektujAktivnost";
    this.container.appendChild(divSelectAktivnost);

    const aktivnosti = document.createElement("select");
    divSelectAktivnost.appendChild(aktivnosti);

    const cena = dodajNoviP(divSelectAktivnost, "boldiraniTekst");
    cena.innerHTML = "Cena: 400 din.";
    const zarada = dodajNoviP(divSelectAktivnost, "boldiraniTekst");
    zarada.innerHTML = "Zarada: 800 din.";

    const tabele = document.createElement("div");
    tabele.className = "unosi";

    this.crtajListuPutnika(tabele);
    this.crtajListuClanovaPosade(tabele);

    this.container.appendChild(tabele);

    //Forme

    const forme = document.createElement("div");
    forme.className = "unosi";
    this.container.appendChild(forme);

    this.crtajDodavanjePutnika(forme);
    this.crtajDodavanjeClanovaPosade(forme);

    this.crtajUnosAktivnosti(dodajNoviDiv(this.container, "unosi"));
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

  crtajUnosAktivnosti(cont) {
    //Forma za dodavanje aktivnosti

    const dodaj = dodajNoviDiv(cont);

    let a = dodajNoviP(dodaj, "boldiraniTekst");
    a.innerHTML = "Dodaj aktivnost:";

    dodajNoviInput(dodaj, "Ime*:", "imeAktivnost");
    dodajNoviInput(dodaj, "Cena*:", "cenaAktivnosti", "number");
    dodajNoviInput(dodaj, "Zarada*:", "zaradaAktivnosti", "number");

    let btn = document.createElement("button");
    btn.innerHTML = "Dodaj";
    btn.className = "dugme";
    //btn.onclick = () => dodajNovuLuku(dodaj);
    dodaj.appendChild(btn);

    cont.appendChild(dodaj);
  }

  crtajDodavanjePutnika(cont) {
    //Forma za dodavanje putnika

    const dodaj = dodajNoviDiv(cont, "unos");

    let a = dodajNoviP(dodaj, "boldiraniTekst");
    a.innerHTML = "Dodaj putnika:";

    const izborDodajPutnika = document.createElement("select");
    dodaj.appendChild(izborDodajPutnika);

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
}
