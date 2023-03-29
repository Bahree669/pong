class Dialog {
  constructor() {
    this.dialog = document.querySelector('.start-dialog');
  }

  show() {
    this.dialog.style.setProperty('--dialog-top', '0');
  }

  remove() {
    this.dialog.style.setProperty('--dialog-top', '-100%');
  }
}

export default Dialog;
