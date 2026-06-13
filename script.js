// =============================================================
//  ODPOČÍTAVANIE DO SVADBY
//  Dátum a čas svadby (uprav podľa skutočného začiatku obradu)
// =============================================================
const DATUM_SVADBY = new Date("2026-06-20T15:00:00");

const cd = {
  days: document.getElementById("cd-days"),
  hours: document.getElementById("cd-hours"),
  mins: document.getElementById("cd-mins"),
  secs: document.getElementById("cd-secs"),
};
function aktualizujOdpocet() {
  let s = Math.floor((DATUM_SVADBY - new Date()) / 1000);
  if (s < 0) s = 0;
  cd.days.textContent = Math.floor(s / 86400);
  cd.hours.textContent = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
  cd.mins.textContent = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  cd.secs.textContent = String(s % 60).padStart(2, "0");
}
aktualizujOdpocet();
setInterval(aktualizujOdpocet, 1000);

// =============================================================
//  MENU — varianty (spoločný dezert: Svadobná torta)
// =============================================================
const MENU = [
  {
    nazov: "Štandard",
    chody: [
      ["Aperitív", "Ostrožovič Mosler — biele polosladké šumivé víno"],
      ["Polievka", "Slepačí vývar s domácimi rezancami a pečeňovými haluškami"],
      ["Hlavné jedlo", "Bravčová panenka na vínovej omáčke s gratinovanými zemiakmi, lokálnym farmárskym syrom a sezónnou zeleninou"],
      ["Dezert", "Svadobná torta"],
    ],
  },
  {
    nazov: "Vegetariánske",
    chody: [
      ["Aperitív", "Ostrožovič Mosler — biele polosladké šumivé víno"],
      ["Polievka", "Hráškový krém s olivovým olejom a tekvicovými semienkami"],
      ["Hlavné jedlo", "Zemiakové gnocchi so syrovou omáčkou a špenátovým prachom"],
      ["Dezert", "Svadobná torta"],
    ],
  },
  {
    nazov: "Detské",
    chody: [
      ["Aperitív", "Biela Vinea"],
      ["Polievka", "Slepačí vývar s domácimi rezancami a pečeňovými haluškami"],
      ["Hlavné jedlo", "Kuracie prsia na prírodno podávané s ryžou a sezónnou zeleninou"],
      ["Dezert", "Svadobná torta"],
    ],
  },
  {
    nazov: "Bez alkoholu",
    chody: [
      ["Aperitív", "Biela Vinea"],
      ["Polievka", "Slepačí vývar s domácimi rezancami a pečeňovými haluškami"],
      ["Hlavné jedlo", "Bravčová panenka na vínovej omáčke s gratinovanými zemiakmi, lokálnym farmárskym syrom a sezónnou zeleninou"],
      ["Dezert", "Svadobná torta"],
    ],
  },
];

function vykresliMenu() {
  const grid = document.getElementById("menuGrid");
  grid.innerHTML = MENU.map((m) => `
    <div class="menu-card">
      <h3 class="menu-card__title">${m.nazov}</h3>
      ${m.chody.map(([label, dish]) => `
        <div class="menu-course">
          <div class="menu-course__label">${label}</div>
          <div class="menu-course__dish">${dish}</div>
        </div>`).join("")}
    </div>`).join("");
}
vykresliMenu();

// =============================================================
//  ZASADACÍ PORIADOK
//  Údaje prevzaté z pracovnej verzie zasadačky.
//  Uprav mená/stoly tu — stránka sa prispôsobí automaticky.
// =============================================================
const STOLY = [
  { id: "H", label: "Hlavný stôl", head: true,
    guests: ["Nevesta", "Ženích", "Mama nevesty", "Otec nevesty", "Mama ženícha", "Otec ženícha"] },
  { id: "1", label: "Stôl", guests: ["dedko Vilko","babka Stázka","babka Hela","krstná Erika","krstný Jožko","Roman","Maťa","Samko","Dory"] },
  { id: "2", label: "Stôl", guests: ["Lucka","Ľuboš","Oliverko","Šimonko","Sima","Marko","Maxík"] },
  { id: "3", label: "Stôl", guests: ["dedko Panáček","babka Panáčková","Monika","Andrej","dedko Rojko","babka Rojková","Ivan","Janka","Renka P.","Jirko"] },
  { id: "4", label: "Stôl", guests: ["Renka G.","Arya","Amelka","Katka","Radko","Tamika","Maťo K.","Lelko","Zuzka","Timo"] },
  { id: "5", label: "Stôl", guests: ["Svedok ženícha","Svedkyňa nevesty","Hlavná družička","Matej","Peťo V.","Paula","Maroš K.","Kristínisko"] },
  { id: "6", label: "Stôl", guests: ["Andrejko","Saška","Matúško","Šimonko","Aďa","Nika","Fanda","Tobiasko"] },
  { id: "7", label: "Stôl", guests: ["Rado Ď.","Denisa","Aňa","Jakub","Kika M.","Filip","Nina","Halušo"] },
  { id: "8", label: "Stôl", guests: ["Samo M.","Betka","Andrea P.","Michal","Maťko S.","Peter B.","Zajo","Maroš L.","Tomy"] },
  { id: "V", label: "Dodávatelia", vendor: true, guests: ["šofér Aďo","kameraman Denis","fotografka Emka","saxofonista Martin"] },
];

function vykresliZasadanie() {
  const board = document.getElementById("seatingBoard");
  board.innerHTML = STOLY.map((t) => {
    const cls = ["seat-table"];
    if (t.head) cls.push("seat-table--head");
    if (t.vendor) cls.push("seat-table--vendor");
    const cislo = (t.head || t.vendor) ? "" : `<div class="seat-table__num">${t.id}</div>`;
    return `
      <div class="${cls.join(" ")}" data-table="${t.id}">
        ${cislo}
        <div class="seat-table__label">${t.label}</div>
        <ul class="seat-table__guests">
          ${t.guests.map((g) => `<li data-name="${normalizuj(g)}">${g}</li>`).join("")}
        </ul>
      </div>`;
  }).join("");
}

// odstráni diakritiku a zmenší písmená pre porovnávanie
function normalizuj(s) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}

vykresliZasadanie();

// ---------- Vyhľadávanie "nájdi svoj stôl" ----------
const seatInput = document.getElementById("seatInput");
const seatResult = document.getElementById("seatResult");

// slovný popis, kde stôl je
function popisStola(t) {
  if (t.head) return "pri hlavnom stole";
  if (t.vendor) return "pri stole dodávateľov";
  return `pri stole č. ${t.id}`;
}

// zvýrazní konkrétneho hosťa pri konkrétnom stole
function zvyrazniHosta(tableId, guest) {
  document.querySelectorAll(".seat-table.is-highlight").forEach((el) => el.classList.remove("is-highlight"));
  document.querySelectorAll(".seat-table__guests li.is-match").forEach((el) => el.classList.remove("is-match"));

  const t = STOLY.find((x) => x.id === tableId);
  const tableEl = document.querySelector(`.seat-table[data-table="${tableId}"]`);
  if (!t || !tableEl) return;

  seatResult.innerHTML = `${guest} sedí <strong>${popisStola(t)}</strong>.`;
  seatResult.className = "seat-result found";

  tableEl.classList.add("is-highlight");
  // zvýrazni prvé doposiaľ nezvýraznené meno, ktoré sedí (rieši dvoch rovnakých pri jednom stole)
  const polozky = [...tableEl.querySelectorAll(".seat-table__guests li")];
  const cieľ = polozky.find((li) => li.dataset.name === normalizuj(guest));
  if (cieľ) cieľ.classList.add("is-match");
  tableEl.scrollIntoView({ behavior: "smooth", block: "center" });
}
window.zvyrazniHosta = zvyrazniHosta;

seatInput.addEventListener("input", () => {
  const q = normalizuj(seatInput.value);

  document.querySelectorAll(".seat-table.is-highlight").forEach((el) => el.classList.remove("is-highlight"));
  document.querySelectorAll(".seat-table__guests li.is-match").forEach((el) => el.classList.remove("is-match"));

  if (q.length < 2) { seatResult.innerHTML = ""; seatResult.className = "seat-result"; return; }

  // nájdi všetky zhody
  const najdene = [];
  STOLY.forEach((t) => {
    t.guests.forEach((g) => {
      if (normalizuj(g).includes(q)) najdene.push({ tableId: t.id, table: t, guest: g });
    });
  });

  if (najdene.length === 0) {
    seatResult.textContent = "Meno sme nenašli — skús inú podobu alebo sa ozvi nám.";
    seatResult.className = "seat-result miss";
    return;
  }

  // práve jedna zhoda → ukáž rovno
  if (najdene.length === 1) {
    zvyrazniHosta(najdene[0].tableId, najdene[0].guest);
    return;
  }

  // viac zhôd → ponúkni na výber
  seatResult.className = "seat-result choices";
  seatResult.innerHTML =
    `<p class="seat-choices__hint">Našli sme viac hostí — vyber sa:</p>` +
    `<div class="seat-choices">` +
    najdene.map((m) =>
      `<button type="button" class="seat-choice" onclick="zvyrazniHosta('${m.tableId}', '${m.guest.replace(/'/g, "\\'")}')">` +
      `${m.guest} <span>· ${popisStola(m.table)}</span></button>`
    ).join("") +
    `</div>`;
});

// =============================================================
//  BOTANICKÉ ODDEĽOVAČE MEDZI SEKCIAMI (v palete – zlatá + šalvia)
// =============================================================
const DIVIDER_SVG = `
<svg viewBox="0 0 280 26" width="240" height="22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="none" stroke="#b89766" stroke-width="1.1" stroke-linecap="round">
    <!-- vodorovné linky -->
    <path d="M30 13 H104"/><path d="M176 13 H250"/>
    <!-- ľavý filigránový závitok -->
    <path d="M104 13 c-10 0 -14 -7 -24 -7 c-7 0 -9 7 -2 9 c5 1.5 9 -2 6.5 -6"/>
    <path d="M92 13 c-6 4 -14 4 -19 1"/>
    <!-- pravý závitok (zrkadlovo) -->
    <path d="M176 13 c10 0 14 -7 24 -7 c7 0 9 7 2 9 c-5 1.5 -9 -2 -6.5 -6"/>
    <path d="M188 13 c6 4 14 4 19 1"/>
  </g>
  <g fill="#b89766">
    <!-- stredový kosoštvorec -->
    <path d="M140 3 L146 13 L140 23 L134 13 Z"/>
    <circle cx="30" cy="13" r="1.6"/><circle cx="250" cy="13" r="1.6"/>
  </g>
  <circle cx="140" cy="13" r="1.7" fill="#fbf9f3"/>
</svg>`;

document.querySelectorAll("section.section").forEach((sec) => {
  const d = document.createElement("div");
  d.className = "section-divider";
  d.innerHTML = DIVIDER_SVG;
  sec.parentNode.insertBefore(d, sec);
});
