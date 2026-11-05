/*
 * VARME HÆNDER – supplerende konfiguration til den statiske hjemmeside.
 * Telefonnummeret er oplyst af ejeren. Prisen er valgt efter brugerens mandat.
 * Telefon, pris, vilkår og regneeksempler findes også direkte i HTML.
 * Ved ændringer skal HTML, strukturerede data og denne fil holdes i sync.
 * Tomt CVR-felt vises ikke. Den viste pris er kundens slutpris; moms lægges ikke oveni.
 */
window.VARME_HAENDER_CONFIG = Object.freeze({
  phone: "42427243",
  phoneDisplay: "42 42 72 43",
  cvr: "",
  hourlyRateDkk: 425,
  priceTaxText: "samlet pris for private",
  priceExtraText: "Ved besøg i andre områder aftaler vi eventuel kørsel på forhånd. Udlæg til varer, billetter og transport under ledsagelse betales særskilt efter aftale."
});
