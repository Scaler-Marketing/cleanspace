import { initButtons } from "./modules/buttons";
import { initMenu } from "./modules/menu";
import { setStaggerText } from "./modules/staggerText";
import { setPathAnimations } from "./modules/SVGPathAnimation";
import { initCheckSectionThemeScroll } from "./modules/checkNavTheme";

document.addEventListener("DOMContentLoaded", () => {
  initCheckSectionThemeScroll();
  initButtons();
  initMenu();
  setStaggerText();
  setPathAnimations();
});
