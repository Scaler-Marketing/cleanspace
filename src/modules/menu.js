export function initMenu() {
  const menu = document.querySelector(".navbar_component");

  if (!menu) {
    console.error("No menu found.");
    return;
  }
  // use gsap.matchMedia to check if the screen is table or mobile.
  // If it is, add extra logic to open the mobile menu on click and also the dropdowns on click.
  // If it is not, use the mouseenter and mouseleave events to show and hide the dropdowns.
  const mm = gsap.matchMedia();
  mm.add({
    isMobile: "(max-width: 991px)",
    isDesktop: "(min-width: 992px)",
  },
    (context) => { 
      const menuItems = menu.querySelectorAll(".navbar_link");
      menuItems.forEach((item) => setMenuItem(item, context.conditions.isMobile));
    
      const dropdowns = menu.querySelectorAll(".navbar_dropdown-trigger");
    
      if (!dropdowns) {
        console.error("No dropdowns found.");
        return;
      }

      if (context.conditions.isMobile) {
        const menuTrigger = menu.querySelector(".navbar_link.is-mobile-trigger");
        const menuDropdown = menu.querySelector(".navbar_menu");
        const contentWrapper = document.querySelector(".main-wrapper");
        const footer = document.querySelector(".footer_component");

        gsap.set(menuDropdown, { height: 0 });

        menuTrigger.addEventListener("click", () => {
          menuDropdown.classList.toggle("is-active");

          if (menuDropdown.classList.contains("is-active")) {
            gsap.to(menuDropdown, {
              height: "auto",
              duration: 0.5,
              ease: "expo.out",
            });
            gsap.to(
              menuTrigger.querySelectorAll(".navbar_link-icon-svg"),
              {
                rotate: 180,
                duration: 0.5,
                ease: "expo.out",
              });
            gsap.to(contentWrapper, {
              filter: "blur(15px)",
              duration: 0.5,
              ease: "expo.out",
            });
            gsap.to(footer, {
              filter: "blur(15px)",
              duration: 0.5,
              ease: "expo.out",
            });
          }
          else {
            gsap.to(menuDropdown, {
              height: 0,
              duration: 0.5,
              ease: "expo.out",
            });
            gsap.to(
              menuTrigger.querySelectorAll(".navbar_link-icon-svg"),
              {
                rotate: 0,
                duration: 0.5,
                ease: "expo.out",
              });
            gsap.to(contentWrapper, {
              filter: "blur(0px)",
              duration: 0.5,
              ease: "expo.out",
            });
            gsap.to(footer, {
              filter: "blur(0px)",
              duration: 0.5,
              ease: "expo.out",
            });
          }
        });
      }
    
      dropdowns.forEach((dropdown) => {
        setDropdown(dropdown, context.conditions.isMobile);
      });
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

function setDropdown(dropdown, isMobile) {
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
    tl.to(
      dropdown.querySelectorAll(".navbar_link-icon-svg"),
      {
        rotate: 180,
        duration: 0.5,
        ease: "expo.out",
      },
      0
    );

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

    tl.to(
      dropdown.querySelectorAll(".navbar_link-icon-svg"),
      {
        rotate: 0,
        duration: 0.5,
        ease: "expo.out",
      },
      0
    );
  }
  
  if (isMobile) {
    dropdown.addEventListener("click", (e) => {
      e.preventDefault();
      if (dropdown.classList.contains("active")) {
        closeDropdown();
        dropdown.classList.remove("active");
      }
      else {
        openDropdown();
        dropdown.classList.add("active");
      }
    });
  } else {
    dropdown.addEventListener("mouseenter", () => {
      openDropdown();
    });

    dropdown.addEventListener("mouseleave", () => {
      closeDropdown();
    });
  }
}