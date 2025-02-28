export function setLoadingStates() {
  const loading = document.querySelector(".loading");
  if (!loading) {
    return;
  }

  const logo = loading.querySelector(".loading_logo");
  const logoPath = loading.querySelector(".loading_bg-svg path");

  gsap.set(logoPath, { drawSVG: "100% live" });
  gsap.set(logo, { opacity: 1, y: "0%" });
  gsap.set(loading, { clipPath: "inset(0% 0% 0% 0%)" });

  gsap.to(logoPath, {
    drawSVG: "0% live",
    duration: 2,
    delay: 0.5,
    // ease: "expo.out",
  });

  gsap.to(logo, {
    opacity: 0,
    y: "-50%",
    delay: 0.5,
    duration: 1,
    ease: "expo.out"
  });

  gsap.to(loading, {
    clipPath: "inset(0% 0% 100% 0%)",
    duration: 1,
    delay: 1,
    ease: "expo.out",
    onComplete: () => {
      loading.style.display = "none";
      gsap.set(logo, { opacity: 0, y: "50%" });
      gsap.set(loading, { clipPath: "inset(100% 0% 0% 0%)" });
    }
  });

  // Loading animation
  const links = document.querySelectorAll("a");
  links.forEach((l) => {
    l.addEventListener("click", (e) => {
      // e.preventDefault();
      const href = l.href;
      const url = new URL(href);

      if (
        window.location.origin === url.origin &&
        window.location.pathname !== url.pathname &&
        l.target !== "_blank"
      ) {
        e.preventDefault();

        loading.style.display = "flex";
        gsap.to(logo, {
          opacity: 1,
          y: "0%",
          duration: 1,
          delay: 0.5,
          ease: "expo.out",
        });
        gsap.to(logoPath, {
          drawSVG: "100% live",
          duration: 2,
          delay: 0.5,
          // ease: "expo.out",
        });
        gsap.to(loading, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "expo.out",
          onComplete: () => {
            window.location.href = href;
          },
        });

        // setTimeout(() => {
        //   window.location.href = href;
        // }, 500);
      }
    });
  });
}
