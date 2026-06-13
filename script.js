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

// =============================================================
//  ÚVODNÁ ANIMÁCIA – skry overlay po dohraní
// =============================================================
(function () {
  const intro = document.getElementById("intro");
  if (!intro) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const delay = reduced ? 400 : 2600;
  const skry = () => { intro.classList.add("intro--hide"); setTimeout(() => intro.remove(), 850); };
  setTimeout(skry, delay);
  intro.addEventListener("click", skry); // klik preskočí
})();

// =============================================================
//  FLORAL ROŽKY – injektuj do hero a sekcií
// =============================================================
const CORNER_SVG = `
<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none">
    <path d="M10 10 H74"/><path d="M10 10 V74"/>
    <path d="M10 20 H56" opacity="0.5"/><path d="M20 10 V56" opacity="0.5"/>
    <path d="M10 44 C34 44 44 34 44 10"/>
    <path d="M10 62 C44 62 62 44 62 10" opacity="0.7"/>
  </g>
  <g fill="currentColor">
    <ellipse cx="31" cy="31" rx="5.5" ry="2.3" transform="rotate(45 31 31)"/>
    <ellipse cx="46" cy="22" rx="4.6" ry="2" transform="rotate(63 46 22)"/>
    <ellipse cx="22" cy="46" rx="4.6" ry="2" transform="rotate(27 22 46)"/>
    <circle cx="10" cy="10" r="2.2"/>
    <circle cx="62" cy="62" r="1.8"/>
  </g>
</svg>`;

function pridajRozky(el) {
  ["tl", "tr", "bl", "br"].forEach((poz) => {
    const c = document.createElement("div");
    c.className = "corner corner--" + poz;
    c.innerHTML = CORNER_SVG;
    el.appendChild(c);
  });
}
const hero = document.querySelector(".hero");
if (hero) pridajRozky(hero);
document.querySelectorAll("section.section").forEach(pridajRozky);

// =============================================================
//  SCROLL REVEAL – jemné vynáranie sekcií a fotiek
// =============================================================
(function () {
  const ciele = [...document.querySelectorAll("section.section, .gallery__item, .place, .menu-card")];
  if (!("IntersectionObserver" in window) || !ciele.length) return;
  ciele.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  ciele.forEach((el) => io.observe(el));
})();

// =============================================================
//  LIGHTBOX GALÉRIA
// =============================================================
(function () {
  const lb = document.getElementById("lightbox");
  const items = [...document.querySelectorAll(".gallery__item")];
  if (!lb || !items.length) return;

  const imgEl = lb.querySelector(".lightbox__img");
  const counter = lb.querySelector(".lightbox__counter");
  // vytiahni URL z background-image každej položky
  const fotky = items.map((el) => {
    const bg = el.style.backgroundImage;
    return bg.slice(bg.indexOf('"') + 1, bg.lastIndexOf('"'));
  });
  let idx = 0;

  function ukaz(i) {
    idx = (i + fotky.length) % fotky.length;
    imgEl.src = fotky[idx];
    counter.textContent = `${idx + 1} / ${fotky.length}`;
  }
  function otvor(i) { ukaz(i); lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false"); }
  function zavri() { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); }

  items.forEach((el, i) => el.addEventListener("click", () => otvor(i)));
  lb.querySelector(".lightbox__close").addEventListener("click", zavri);
  lb.querySelector(".lightbox__next").addEventListener("click", (e) => { e.stopPropagation(); ukaz(idx + 1); });
  lb.querySelector(".lightbox__prev").addEventListener("click", (e) => { e.stopPropagation(); ukaz(idx - 1); });
  lb.addEventListener("click", (e) => { if (e.target === lb) zavri(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") zavri();
    if (e.key === "ArrowRight") ukaz(idx + 1);
    if (e.key === "ArrowLeft") ukaz(idx - 1);
  });
  // swipe na mobile
  let x0 = null;
  lb.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) ukaz(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  }, { passive: true });
})();
