"use strict";

(() => {
  const config = window.VARME_HAENDER_CONFIG || {};
  const email = "julie@varmehaender.dk";
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.hidden = false;
    document.documentElement.classList.add("js-menu");
    const closeMenu = (restoreFocus = false) => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") closeMenu(true);
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".site-header")) closeMenu();
    });
    const desktop = window.matchMedia("(min-width: 1024px)");
    if (typeof desktop.addEventListener === "function") {
      desktop.addEventListener("change", () => closeMenu());
    } else if (typeof desktop.addListener === "function") {
      desktop.addListener(() => closeMenu());
    }
  }

  // Accept a real Danish number only; never show a fake or empty telephone link.
  const rawPhone = typeof config.phone === "string" ? config.phone.replace(/[\s().-]/g, "") : "";
  const nationalNumber = rawPhone.replace(/^(\+45|0045)/, "");
  if (/^[2-9]\d{7}$/.test(nationalNumber)) {
    const tel = "+45" + nationalNumber;
    const label = config.phoneDisplay || "+45 " + nationalNumber.match(/.{2}/g).join(" ");
    document.querySelectorAll("[data-phone-block]").forEach((el) => { el.hidden = false; });
    document.querySelectorAll("[data-phone-link], [data-primary-contact]").forEach((el) => { el.href = "tel:" + tel; });
    document.querySelectorAll("[data-phone-display]").forEach((el) => { el.textContent = label; });
    document.querySelectorAll("[data-primary-label]").forEach((el) => { el.textContent = "Ring til Julie"; });
    document.querySelectorAll("[data-primary-icon]").forEach((el) => { el.setAttribute("href", "#icon-phone"); });
    const schema = document.getElementById("business-schema");
    if (schema) {
      try { const data = JSON.parse(schema.textContent); data.telephone = tel; schema.textContent = JSON.stringify(data); } catch (_) { /* Optional structured data must not affect contact. */ }
    }
  }

  if (typeof config.cvr === "string" && /^\d{8}$/.test(config.cvr.trim())) {
    document.querySelectorAll("[data-cvr]").forEach((el) => { el.textContent = "CVR " + config.cvr.trim(); el.hidden = false; });
  }

  if (typeof config.hourlyRateDkk === "number" && Number.isFinite(config.hourlyRateDkk) && config.hourlyRateDkk > 0 && typeof config.priceTaxText === "string" && config.priceTaxText.trim()) {
    const price = document.querySelector("[data-price-number]");
    if (price) {
      price.textContent = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 2 }).format(config.hourlyRateDkk) + " kr.";
      document.querySelector("[data-price-tax]").textContent = config.priceTaxText.trim();
      document.getElementById("price-value").hidden = false;
      document.getElementById("price-card-heading").textContent = "Det aftaler vi sammen";
    }
  }
  if (typeof config.priceExtraText === "string" && config.priceExtraText.trim()) {
    document.querySelectorAll("[data-price-extra]").forEach((el) => { el.textContent = config.priceExtraText.trim(); el.hidden = false; });
  }

  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  const copyButton = document.querySelector("[data-copy-email]");
  const copyStatus = document.querySelector("[data-copy-status]");
  if (copyButton && copyStatus && navigator.clipboard && window.isSecureContext) {
    copyButton.hidden = false;
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = "Mailadressen er kopieret. Du kan nu indsætte den i din mail.";
      } catch (_) {
        copyStatus.textContent = "Adressen kunne ikke kopieres automatisk. Markér julie@varmehaender.dk og kopiér den, eller brug mailknappen.";
      }
    });
  }
})();
