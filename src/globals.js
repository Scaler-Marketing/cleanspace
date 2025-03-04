import { setLoadingStates } from "./modules/setLoadingStates";
import { initButtons } from "./modules/buttons";
import { initMenu } from "./modules/menu";
import { setStaggerText } from "./modules/staggerText";
import { setStaggerElements } from "./modules/staggerElements";
import { setPathAnimations } from "./modules/SVGPathAnimation";
import { initCheckSectionThemeScroll } from "./modules/checkNavTheme";
import { initFormSubmit } from "./modules/formSubmit";
import { initContactForm } from "./modules/contactForm";

document.addEventListener("DOMContentLoaded", () => {
  setLoadingStates();
  initCheckSectionThemeScroll();
  initButtons();
  initMenu();
  setStaggerText();
  setStaggerElements();
  setPathAnimations();
  initFormSubmit();
  initContactForm();
});
