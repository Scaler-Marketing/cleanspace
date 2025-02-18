export function initMenu() {
  const menu = document.querySelector(".navbar_component");

  if (!menu) {
    console.error("No menu found.");
    return;
  }

  const menuItems = menu.querySelectorAll(".navbar_link");
  menuItems.forEach((item) => setMenuItem(item));

  const dropdowns = menu.querySelectorAll(".navbar_dropdown-trigger");

  if (!dropdowns) {
    console.error("No dropdowns found.");
    return;
  }

  dropdowns.forEach((dropdown) => {
    setDropdown(dropdown);
  });
}

function setMenuItem(item) {
  const itemEls = new SplitType(item.querySelector(".navbar_link-label"), {
    types: "lines, words",
    tagName: "span",
  });

  item.addEventListener("mouseenter", () => {
    gsap.to(itemEls.words, {
      yPercent: -100,
      stagger: 0.05,
      duration: 0.5,
      ease: "expo.out",
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(itemEls.words, {
      yPercent: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "expo.out",
    });
  });
}

function setDropdown(dropdown) {
  // add mouse hover logic to show / hide dropdown based on .navbar_dropdown height
  const dropdownMenu = dropdown.querySelector(".navbar_dropdown");
  const dropdownLinks = dropdownMenu.querySelectorAll(".dropdown_item");

  gsap.set(dropdownLinks, { yPercent: 50, opacity: 0 });

  const tl = gsap.timeline();

  const openDropdown = () => {
    tl.clear();
    tl.set(dropdownMenu, { height: "0" });
    tl.set(dropdownLinks, { yPercent: 50, opacity: 0 });
    tl.to(dropdownMenu, {
      height: "auto",
      duration: 0.5,
      ease: "expo.out",
    });

    tl.to(dropdownLinks, {
      yPercent: 0,
      opacity: 1,
      stagger: 0.01,
      duration: 0.5,
      ease: "expo.out",
    }, 0.25);
  };

  const closeDropdown = () => {
    tl.clear();
    tl.to(dropdownMenu, {
      height: 0,
      duration: 0.5,
      ease: "expo.out",
    });

    tl.to(dropdownLinks, {
      yPercent: 50,
      opacity: 0,
      duration: 0.3,
      ease: "expo.out",
    }, 0);
  }

  dropdown.addEventListener("mouseenter", () => {
    openDropdown();
  });

  dropdown.addEventListener("mouseleave", () => {
    closeDropdown();
  });
}