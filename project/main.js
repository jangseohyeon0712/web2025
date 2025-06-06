document.addEventListener("DOMContentLoaded", () => {
  const styleSelector = document.querySelector("#style-selector");
  const styleCardsContainer = document.querySelector(".style-cards");
  const styleDetail = document.querySelector("#style-detail");
  const compareSection = document.querySelector("#compare-section");
  const compareInfo = document.querySelector("#compare-info");
  const backButton = document.querySelector("#back-button");
  const compareReset = document.querySelector("#compare-reset");

  const styleName = document.querySelector("#style-name");
  const styleDesc = document.querySelector("#style-desc");
  const fabricList = document.querySelector("#fabric-list");
  const brandList = document.querySelector("#brand-list");
  const historyTimeline = document.querySelector("#history-timeline");
  const gallery = document.querySelector("#gallery");

  let styles = [];
  let currentSlideIndex = 0;
  let currentGallery = [];
  let slideImgElement = null;
  let selectedStyles = [];

  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      styles = data;
      renderStyleCards();
    });

  function renderStyleCards() {
    styles.forEach((style, index) => {
      const card = document.createElement("div");
      card.className = "style-card";
      card.innerHTML = `
        <h3>${style.name}</h3>
        <p>${style.desc}</p>
      `;
      card.addEventListener("click", () => handleStyleClick(index));
      styleCardsContainer.appendChild(card);
    });
  }

  function handleStyleClick(index) {
    if (selectedStyles.length < 2) {
      selectedStyles.push(styles[index]);
      if (selectedStyles.length === 2) {
        showCompareResult();
      } else {
        showDetail(index);
      }
    }
  }

  function showCompareResult() {
    styleSelector.classList.add("hidden");
    styleDetail.classList.add("hidden");
    compareSection.classList.remove("hidden");

    const [a, b] = selectedStyles;
    compareInfo.innerHTML = `
      <h3>${a.name} vs ${b.name}</h3>
      <h4>📌 주요 원단</h4>
      <p><strong>${a.name}:</strong> ${a.fabrics.join(", ")}<br>
         <strong>${b.name}:</strong> ${b.fabrics.join(", ")}</p>

      <h4>🏷 대표 브랜드</h4>
      <p><strong>${a.name}:</strong> ${a.brands.join(", ")}<br>
         <strong>${b.name}:</strong> ${b.brands.join(", ")}</p>

      <h4>📅 변천사</h4>
      <div><strong>${a.name}</strong><br>${a.history.map(h => `- ${h.year}: ${h.event}`).join("<br>")}</div>
      <div style="margin-top:1rem;"><strong>${b.name}</strong><br>${b.history.map(h => `- ${h.year}: ${h.event}`).join("<br>")}</div>
    `;
  }

  compareReset.addEventListener("click", () => {
    selectedStyles = [];
    compareInfo.innerHTML = "";
    compareSection.classList.add("hidden");
    styleSelector.classList.remove("hidden");
  });

  function showDetail(index) {
    const style = styles[index];
    styleName.textContent = style.name;
    styleDesc.textContent = style.desc;

    fabricList.innerHTML = "";
    style.fabrics.forEach(fabric => {
      const li = document.createElement("li");
      li.textContent = fabric;
      fabricList.appendChild(li);
    });

    brandList.innerHTML = "";
    style.brands.forEach(brand => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = getBrandUrl(brand);
      a.textContent = brand;
      a.target = "_blank";
      li.appendChild(a);
      brandList.appendChild(li);
    });

    historyTimeline.innerHTML = "";
    style.history.forEach(h => {
      const div = document.createElement("div");
      div.textContent = `${h.year}: ${h.event}`;
      historyTimeline.appendChild(div);
    });

    currentGallery = style.gallery;
    currentSlideIndex = 0;
    renderGallery();

    styleSelector.classList.add("hidden");
    styleDetail.classList.remove("hidden");
  }

  function renderGallery() {
    gallery.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "slider-wrapper";

    const leftBtn = document.createElement("button");
    leftBtn.textContent = "←";
    leftBtn.className = "slide-arrow left-btn";
    leftBtn.onclick = () => {
      currentSlideIndex = (currentSlideIndex - 1 + currentGallery.length) % currentGallery.length;
      updateSlideImage();
    };

    const rightBtn = document.createElement("button");
    rightBtn.textContent = "→";
    rightBtn.className = "slide-arrow right-btn";
    rightBtn.onclick = () => {
      currentSlideIndex = (currentSlideIndex + 1) % currentGallery.length;
      updateSlideImage();
    };

    slideImgElement = document.createElement("img");
    slideImgElement.src = currentGallery[currentSlideIndex];
    slideImgElement.alt = "스타일 이미지";
    slideImgElement.className = "slide-image";

    wrapper.appendChild(leftBtn);
    wrapper.appendChild(slideImgElement);
    wrapper.appendChild(rightBtn);
    gallery.appendChild(wrapper);
  }

  function updateSlideImage() {
    if (slideImgElement) {
      slideImgElement.src = currentGallery[currentSlideIndex];
    }
  }

  function getBrandUrl(brand) {
    const urls = {
      "UNIQLO": "https://www.uniqlo.com/",
      "ZARA": "https://www.zara.com/",
      "Muji": "https://www.muji.com/",
      "Gap": "https://www.gap.com/",
      "Lacoste": "https://www.lacoste.com/",
      "Ralph Lauren": "https://www.ralphlauren.com/",
      "COS": "https://www.cos.com/",
      "The Row": "https://www.therow.com/",
      "Uniqlo U": "https://www.uniqlo.com/UniqloU",
      "Carhartt": "https://www.carhartt.com/",
      "Dickies": "https://www.dickies.com/",
      "Engineered Garments": "https://nepenthesny.com/",
      "Nigel Cabourn": "https://www.cabourn.com/",
      "ACRONYM": "https://acrnm.com/",
      "Nike ACG": "https://www.nike.com/acg",
      "Stone Island Shadow Project": "https://www.stoneisland.com/",
      "Guerrilla Group": "https://guerrilla-group.co/",
      "Visvim": "https://www.visvim.tv/",
      "Kapital": "https://www.kapital.jp/",
      "Warehouse": "https://www.ware-house.co.jp/",
      "The Real McCoy's": "https://therealmccoys.jp/",
      "BEAMS": "https://www.beams.co.jp/",
      "AURALEE": "https://auralee.jp/",
      "NANAMICA": "https://www.nanamica.com/",
      "The North Face": "https://www.thenorthface.com/",
      "Arc'teryx": "https://arcteryx.com/",
      "Patagonia": "https://www.patagonia.com/",
      "Salomon": "https://www.salomon.com/",
      "Telfar": "https://shop.telfar.net/",
      "Comme des Garçons": "https://www.comme-des-garcons.com/",
      "Y/Project": "https://yproject.fr/",
      "JW Anderson": "https://www.jwanderson.com/",
      "Supreme": "https://www.supremenewyork.com/",
      "Stüssy": "https://www.stussy.com/",
      "A Bathing Ape": "https://bape.com/",
      "Palace": "https://www.palaceskateboards.com/",
      "Moschino": "https://www.moschino.com/",
      "Ashley Williams": "https://ashleywilliamslondon.com/",
      "Lazy Oaf": "https://www.lazyoaf.com/",
      "Lisa Says Gah": "https://lisasaysgah.com/",
      "Vivienne Westwood": "https://www.viviennewestwood.com/",
      "Underground": "https://underground-england.com/",
      "Sex Pistols Merch": "https://www.sex-pistols.net/",
      "Tripp NYC": "https://trippnyc.com/"
    };
    return urls[brand] || "#";
  }

  backButton.addEventListener("click", () => {
    styleDetail.classList.add("hidden");
    styleSelector.classList.remove("hidden");
  });
});
