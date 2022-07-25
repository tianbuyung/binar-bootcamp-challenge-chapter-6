function checked() {
  if (document.getElementById("adminTrue").checked === true) {
    document.getElementById("adminTrue").value = true;
    document.getElementById("adminFalse").disabled = true;
  }
  if (document.getElementById("adminTrue").checked === false) {
    document.getElementById("adminTrue").disabled = true;
  }
}
