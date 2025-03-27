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
      // document.body.classList.add("no-scrollbar");
      lenis.stop();
      tl.play();
    });
  });

  closeButton.addEventListener("click", () => {
    wrapper.classList.remove("is-active");
    // document.body.classList.remove("no-scrollbar");
    lenis.start();
    tl.reverse();
  });

  setCheckBoxes();
}

function setCheckBoxes() {
  // get list of custom checkboxes groups on the page
  const groups = document.querySelectorAll(".input_checkbox-group");

  // loop through each group
  groups.forEach((group) => {
    // get all checkboxes in the group
    const checkboxes = group.querySelectorAll("input[type='checkbox']");
    // identify the hidden text field inside each group
    const hiddenInput = group.querySelector(".input_checkbox-hidden");

    if (!checkboxes.length) {
      return;
    }

    //when any checkbox on this group change, grab the values, transform the array into a string, and update the hidden field
    function updateHiddenInput() {
      const values = Array.from(checkboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      hiddenInput.value = values.join(", ");
    }

    // loop through each checkbox
    checkboxes.forEach((checkbox) => {
      // get checkbox label
      const label = checkbox.nextElementSibling;

      // set checkbox value to label text
      checkbox.value = label.textContent;

      // when checkbox change, update the hidden input
      checkbox.addEventListener("change", updateHiddenInput);
    });
  });
}