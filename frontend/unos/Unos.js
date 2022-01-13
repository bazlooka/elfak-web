import { ADR_SERVERA } from "../helper.js";

export function dodajNoviUnos(unos, nazivEntiteta, container, params) {
  let paramString = "";
  if (params != undefined) paramString = params;

  if (unos != undefined) {
    fetch(ADR_SERVERA + nazivEntiteta + "/Dodaj" + paramString, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unos),
    })
      .then((resp) => {
        if (resp.ok) obrisiUnetePodatke(container);
        return resp.text();
      })
      .then((msg) => {
        alert(msg);
      });
  }
}

export function izmeniUnos(unos, nazivEntiteta, container, params) {
  let paramString = "";
  if (params != undefined) paramString = params;

  if (unos != undefined) {
    fetch(ADR_SERVERA + nazivEntiteta + "/Izmeni" + paramString, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unos),
    })
      .then((resp) => {
        if (resp.ok) obrisiUnetePodatke(container);
        return resp.text();
      })
      .then((msg) => {
        alert(msg);
      });
  }
}

export function obrisiUnos(unos, nazivEntiteta, container) {
  fetch(ADR_SERVERA + nazivEntiteta + "/Obrisi/" + unos, {
    method: "DELETE",
  })
    .then((resp) => {
      if (resp.ok) obrisiUnetePodatke(container);
      return resp.text();
    })
    .then((msg) => {
      alert(msg);
    });
}

function obrisiUnetePodatke(container) {
  let inputs = container.querySelectorAll("input");
  inputs.forEach((element) => {
    if (element.type == "radio") element.checked = false;
    else element.value = "";
  });
}
