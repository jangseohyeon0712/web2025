let styles = [];

async function loadData() {
  try {
    const res = await fetch("data.json");
    styles = await res.json();
    loadStyles();
  } catch (e) {
    console.error("데이터 불러오기 오류:", e);
  }
}

const selector = document.querySelector("#style-selector .style-cards");
const detailSection = document.getElementById("style-detail");
const backButton = document.getElementById("back-button");

function loadStyles() {
  styles.forEach((style, index) => {
    const card = document.createElement("div");
    card.className = "style-card";
    card.innerHTML = `<h3>${style.name}</h3><p>${style.desc}</p>`;
    card.addEventListener("click", () => showDetail(index));
    selector.appendChild(card);
  });
}

function showDetail(index) {
  const style = styles[index];
  document.getElementById("style-name").textContent = style.name;
  document.getElementById("style-desc").textContent = style.desc;

  const fabricList = document.getElementById("fabric-list");
  fabricList.innerHTML = "";
  style.fabrics.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    fabricList.appendChild(li);
  });

 style.brands.forEach(brand => {
  const li = document.createElement("li");
  if (brandLinks[brand]) {
    const a = document.createElement("a");
    a.href = brandLinks[brand];
    a.textContent = brand;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    li.appendChild(a);
  } else {
    li.textContent = brand;
  }
  brandList.appendChild(li);
});

  const timeline = document.getElementById("history-timeline");
  timeline.innerHTML = "";
  style.history.forEach(h => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${h.year}</strong>: ${h.event}`;
    timeline.appendChild(div);
  });

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  style.gallery.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = `${style.name} look`;
    gallery.appendChild(img);
  });

  detailSection.classList.remove("hidden");
  document.getElementById("style-selector").classList.add("hidden");
}

backButton.addEventListener("click", () => {
  detailSection.classList.add("hidden");
  document.getElementById("style-selector").classList.remove("hidden");
});

window.addEventListener("DOMContentLoaded", loadData);
const brandLinks = {
  "UNIQLO": "https://www.uniqlo.com",
  "ZARA": "https://www.zara.com",
  "Muji": "https://www.muji.com",
  "Gap": "https://www.gap.com",
  "Lacoste": "https://www.lacoste.com",
  "Ralph Lauren": "https://www.ralphlauren.com",
  "COS": "https://www.cos.com",
  "The Row": "https://therow.com",
  "Uniqlo U": "https://www.uniqlo.com/uniqlo-u",
  "Carhartt": "https://www.carhartt.com",
  "Dickies": "https://www.dickies.com",
  "ACRONYM": "https://acrnm.com",
  "Nike ACG": "https://www.nike.com/acg",
  "Stone Island Shadow Project": "https://www.stoneisland.com",
  "Guerrilla Group": "https://www.guerrillagroup.co",
  "Visvim": "https://www.visvim.tv",
  "Kapital": "https://www.kapital.jp",
  "The North Face": "https://www.thenorthface.com",
  "Arc'teryx": "https://arcteryx.com",
  "Patagonia": "https://www.patagonia.com",
  "Telfar": "https://shop.telfar.net",
  "JW Anderson": "https://www.jwanderson.com",
  "Comme des Garçons": "https://www.comme-des-garcons.com",
  "Supreme": "https://www.supremenewyork.com",
  "Stüssy": "https://www.stussy.com",
  "A Bathing Ape": "https://bape.com",
  "Palace": "https://www.palaceskateboards.com",
  "Moschino": "https://www.moschino.com",
  "Lazy Oaf": "https://www.lazyoaf.com",
  "Vivienne Westwood": "https://www.viviennewestwood.com",
  "Tripp NYC": "https://trippnyc.com"
};
const brandList = document.getElementById("brand-list");
brandList.innerHTML = "";
style.brands.forEach(brand => {
  const li = document.createElement("li");
  if (brandLinks[brand]) {
    const a = document.createElement("a");
    a.href = brandLinks[brand];
    a.textContent = brand;
    a.target = "_blank"; // 새 창에서 열기
    li.appendChild(a);
  } else {
    li.textContent = brand; // 링크가 없는 경우
  }
  brandList.appendChild(li);
});
