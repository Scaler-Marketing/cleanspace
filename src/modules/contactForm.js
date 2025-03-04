export function initContactForm() {
  const wrapper = document.querySelector(".contact-modal");
  const form = wrapper.querySelector("form");

  if (!wrapper || !form) {
    return;
  }

  const backdrop = wrapper.querySelector(".contact-modal_backdrop");
  const body = wrapper.querySelector(".contact-modal_body");
  const closeButton = wrapper.querySelector(".contact-modal_close");

  gsap.set(wrapper, { display: "none" });
  gsap.set(backdrop, { autoAlpha: 0 });
  gsap.set(body, { clipPath: "inset(50%)" });
  gsap.set(closeButton, { scale: 0 });

  const tl = gsap.timeline({ paused: true });

  tl.set(wrapper, { display: "flex" });
  tl.to(backdrop, { autoAlpha: 1, duration: 0.5, ease: "expo.inOut" });
  tl.to(body, { clipPath: "inset(0%)", duration: 1, ease: "expo.inOut" }, 0.25);
  tl.to(closeButton, { scale: 1, duration: 0.5, ease: "expo.inOut" }, 1);

  const openButton = document.querySelectorAll("[data-contact-trigger]");

  openButton.forEach((button) => {
    button.addEventListener("click", () => {
      wrapper.classList.add("is-active");
      tl.play();
    });
  });

  closeButton.addEventListener("click", () => {
    wrapper.classList.remove("is-active");
    tl.reverse();
  });
}