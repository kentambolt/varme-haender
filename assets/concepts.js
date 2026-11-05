"use strict";
(() => {
  const menu = document.querySelector(".concept-menu");
  const nav = document.querySelector(".concept-nav");
  if (menu && nav) {
    menu.hidden = false;
    document.documentElement.classList.add("concept-enhanced");
    const closeMenu = (restoreFocus) => {
      menu.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      if (restoreFocus) menu.focus();
    };
    menu.addEventListener("click", () => {
      const open = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });
    nav.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(false); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") closeMenu(true); });
    document.addEventListener("click", (event) => { if (!event.target.closest(".concept-header")) closeMenu(false); });
    const desktop = window.matchMedia("(min-width: 901px)");
    if (typeof desktop.addEventListener === "function") desktop.addEventListener("change", () => closeMenu(false));
    else if (typeof desktop.addListener === "function") desktop.addListener(() => closeMenu(false));
  }

  const form = document.querySelector("[data-message-form]");
  if (!form) return;
  const name = document.getElementById("message-name");
  const contact = document.getElementById("message-contact");
  const message = document.getElementById("message-text");
  const status = form.querySelector("[data-message-status]");
  const draft = form.querySelector("[data-message-draft]");
  const result = document.getElementById("message-result");
  const copy = form.querySelector("[data-message-copy]");
  const createBody = () => "Hej Julie\n\n" + (message.value.trim() || "Jeg vil gerne tale med dig om hjælp i hverdagen.") + "\n\nMit navn: " + name.value.trim() + "\nDu kan kontakte mig på: " + contact.value.trim() + "\n\nVenlig hilsen\n" + name.value.trim();
  const showDraft = () => {
    result.value = createBody();
    draft.hidden = false;
    return result.value;
  };
  const validate = () => {
    name.setCustomValidity(name.value.trim() ? "" : "Skriv dit navn.");
    contact.setCustomValidity(contact.value.trim() ? "" : "Skriv dit telefonnummer eller din mail.");
    return form.reportValidity();
  };
  name.addEventListener("input", () => name.setCustomValidity(""));
  contact.addEventListener("input", () => contact.setCustomValidity(""));
  copy.hidden = false;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) return;
    const body = showDraft();
    status.textContent = "Send beskeden fra dit mailprogram. Hvis det ikke åbner, kan du kopiere teksten herunder og sende den til julie@varmehaender.dk. Beskeden er ikke sendt herfra.";
    window.location.href = "mailto:julie@varmehaender.dk?subject=" + encodeURIComponent("En samtale om hjælp i hverdagen") + "&body=" + encodeURIComponent(body);
  });
  copy.addEventListener("click", async () => {
    if (!validate()) return;
    const body = showDraft();
    status.textContent = "Kopierer beskeden …";
    copy.disabled = true;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("clipboard-unavailable");
      await navigator.clipboard.writeText(body);
      status.textContent = "Beskeden er kopieret. Indsæt den i din mail og send den til julie@varmehaender.dk.";
    } catch (_) {
      result.focus();
      result.select();
      status.textContent = "Teksten er markeret nedenfor. Kopiér den, og send den fra din mail til julie@varmehaender.dk.";
    } finally {
      copy.disabled = false;
    }
  });
})();
