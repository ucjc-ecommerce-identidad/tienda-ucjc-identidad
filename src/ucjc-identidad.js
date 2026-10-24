class UcjcIdentidad extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Soy Identidad';
  }
}

if (!customElements.get('ucjc-identidad')) {
  customElements.define('ucjc-identidad', UcjcIdentidad);
}
