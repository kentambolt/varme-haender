/*
 * VARME HÆNDER – oplysninger, som kan ændres ét sted.
 * Tomme felter vises ikke. Der må kun indsættes bekræftede oplysninger.
 * Telefon gør automatisk de primære kontaktknapper til "Ring til Julie".
 * En pris vises kun, når både hourlyRateDkk og priceTaxText er udfyldt.
 * Eksempel på priceTaxText: "inkl. moms" – kun hvis dette faktisk gælder.
 */
window.VARME_HAENDER_CONFIG = Object.freeze({
  phone: "",
  phoneDisplay: "",
  cvr: "",
  hourlyRateDkk: null,
  priceTaxText: "",
  priceExtraText: ""
});
