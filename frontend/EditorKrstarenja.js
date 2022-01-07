export class EditorKrstarenja {
  constructor(krstarenje, container) {
    this.krstarenje = krstarenje;
    this.container = container;
  }
  iscrtajEditorKrstarenja() {
    const p = document.createElement("p");
    p.innerHtml = this.container;
    console.log(this.krstarenje);
  }
}
