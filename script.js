let piggies = JSON.parse(localStorage.getItem("piggies") || "[]");
let currentIndex = null;

function save() {
  localStorage.setItem("piggies", JSON.stringify(piggies));
}

function formatMoney(v) {
  return v.toFixed(2).replace(".", ",") + " €";
}

function render() {
  const div = document.getElementById("piggyList");
  div.innerHTML = "";
  piggies.forEach((p, i) => {
    const el = document.createElement("div");
    el.className = "piggy";
    el.style.background = p.color;
    el.style.color = p.textColor;
    el.innerText = p.name + " – " + formatMoney(p.total);
    el.onclick = () => openPiggy(i);
    div.appendChild(el);
  });
}

document.getElementById("newPiggy").onclick = () => {
  const name = prompt("Nome salvadanaio?");
  if (!name) return;

  piggies.push({
    name: name,
    total: 0,
    color: "#007bff",
    textColor: "white"
  });
  save();
  render();
};

function openPiggy(i) {
  currentIndex = i;
  document.getElementById("piggyDetail").classList.remove("hidden");

  const p = piggies[i];
  document.getElementById("piggyTitle").innerText = p.name;
  document.getElementById("piggyTotal").innerText = "Totale: " + formatMoney(p.total);
}

function modifyAmount(add) {
  let val = prompt("Importo?");
  if (!val) return;
  val = val.replace(",", ".");
  val = parseFloat(val);
  if (isNaN(val)) return;

  if (!add) val = -val;

  piggies[currentIndex].total += val;
  save();
  openPiggy(currentIndex);
  render();
}

function renamePiggy() {
  const name = prompt("Nuovo nome?");
  if (!name) return;

  piggies[currentIndex].name = name;
  save();
  openPiggy(currentIndex);
  render();
}

function changeColor() {
  const col = prompt("Colore in formato HEX (es. #ff0000)?");
  if (!col) return;

  piggies[currentIndex].color = col;

  let text = "#000000";
  const r = parseInt(col.substr(1,2),16);
  const g = parseInt(col.substr(3,2),16);
  const b = parseInt(col.substr(5,2),16);
  const brightness = (r*0.299 + g*0.587 + b*0.114);

  if (brightness < 140) text = "white";

  piggies[currentIndex].textColor = text;

  save();
  openPiggy(currentIndex);
  render();
}

function back() {
  document.getElementById("piggyDetail").classList.add("hidden");
}

render();
