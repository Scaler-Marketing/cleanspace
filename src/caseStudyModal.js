function initCaseStudyModals() {
  const caseStudyModal = document.querySelectorAll(".case-study_modal");
  const caseStudyModalTriggers = document.querySelectorAll(
    ".case-studies_card[data-modal-target]"
  );
  if (!caseStudyModal || !caseStudyModalTriggers) {
    console.error("One or more required elements are missing.");
    return;
  }

  caseStudyModalTriggers.forEach((trigger) => {
    const id = trigger.dataset.modalTarget;
    const caseStudyModal = document.querySelector(`.case-study_modal[data-modal-id="${id}"]`);

    if (!caseStudyModal) {
      console.error("No case study modal found with the specified ID.");
      return;
    }

    setupCaseStudyModal(trigger, caseStudyModal);
  });
}

function setupCaseStudyModal(caseStudyModalTrigger, caseStudyModal) {
  const caseStudyGallery = caseStudyModal.querySelector(".case-study_modal-gallery");
  const caseStudyContent = caseStudyModal.querySelector(".case-study_modal-content");
  const caseStudyModalClose = caseStudyModal.querySelector(".case-study_modal-close");
  const caseStudyModalGallery = caseStudyModal.querySelector(".case-study-gallery_imgs");
  const caseStudyModalGalleryExpand = caseStudyModal.querySelector(".case-study_modal-expand");
  const caseStudyModalThumbs = caseStudyModal.querySelector(".case-study-gallery_thumbs");
  const caseStudyGallerySource = caseStudyModal.querySelector(".case-study-gallery_source");

  if (!caseStudyModal || !caseStudyGallerySource) {
    console.error("One or more required elements are missing.");
    return;
  }

  setupCaseStudyGallery(caseStudyGallerySource, caseStudyModalGallery, caseStudyModalThumbs);

  // setup car modal gsap timeline
  const caseStudyModalTl = gsap.timeline({
    paused: true,
    onStart: () => {
      caseStudyModal.classList.add("is-active");
    },
    onReverseComplete: () => {
      caseStudyModal.classList.remove("is-active");
    },
  });

  caseStudyModalTl
  .fromTo(
    caseStudyGallery,
    { clipPath: "inset(0% 0% 100% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut",
      onComplete: () => {
        caseStudyGallery.style.clipPath = "none";
      }
    }
  )
  .fromTo(
    caseStudyContent,
    { clipPath: "inset(100% 0% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut",
    },
    0
  )
  .fromTo(
    caseStudyModalClose,
    { y: "-8rem" },
    { y: "0rem", duration: 1, ease: "expo.inOut" },
    0.5
  )
  .fromTo(
    caseStudyModalGalleryExpand,
    { scale: 0 },
    { scale: 1, duration: 1, ease: "expo.inOut" },
    0.5
  )
  .fromTo(
    caseStudyModalGallery,
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "expo.inOut" },
    .5
  )
  .fromTo(
    caseStudyModalThumbs.querySelectorAll(".case-study-gallery_thumb-wrapper"),
    { y: "12rem" },
    {
      y: "0rem",
      duration: 1,
      stagger: 0.01,
      ease: "expo.inOut"
    },
    .5
  );

  caseStudyModalTrigger.addEventListener("click", () => {
    if (caseStudyModalTl.progress() === 1) {
      caseStudyModalTl.reverse();
    } else {
      caseStudyModalTl.play();
    }
    document.body.classList.add('no-scrollbar');
  });

  caseStudyModalClose.addEventListener("click", () => {
    caseStudyModalTl.reverse();
    if (caseStudyModalGalleryExpand.classList.contains("is-expanded")) {
      caseStudyModalGalleryExpand.classList.remove("is-expanded");
      gsap.to(caseStudyGallery, {
        width: "50vw",
        duration: 1,
        ease: "expo.inOut",
      });
      gsap.to(caseStudyContent, {
        width: "50vw",
        duration: 1,
        ease: "expo.inOut",
      });
      gsap.to(caseStudyModalGalleryExpand, {
        right: "-1.5rem",
        rotate: 0,
        duration: 1,
        ease: "expo.inOut",
      });
    }

    document.body.classList.remove("no-scrollbar");
  });

  caseStudyModalGalleryExpand.addEventListener("click", () => {
    caseStudyModalGalleryExpand.classList.toggle("is-expanded");

    if (caseStudyModalGalleryExpand.classList.contains("is-expanded")) {
      gsap.to(caseStudyGallery, {
        width: "100vw",
        duration: 1,
        ease: "expo.inOut",
      });
      gsap.to(caseStudyContent, {
        width: "0vw",
        duration: 1,
        ease: "expo.inOut",
      });
      gsap.to(caseStudyModalGalleryExpand, {
        right: "1.5rem",
        rotate: 180,
        duration: 1,
        ease: "expo.inOut",
      });
    } else {
      gsap.to(caseStudyGallery, {
        width: "50vw",
        duration: 1,
        ease: "expo.inOut",
      });
      gsap.to(caseStudyContent, {
        width: "50vw",
        duration: 1,
        ease: "expo.inOut",
      });
      gsap.to(caseStudyModalGalleryExpand, {
        right: "-1.5rem",
        rotate: 0,
        duration: 1,
        ease: "expo.inOut",
      });
    }
  });
}

function setupCaseStudyGallery(caseStudyGallerySource, galleryEl, thumbsEl) {
  // get the JSON values from the car gallery source
  const items = getJSONValues(caseStudyGallerySource);

  // if there are no items, return early
  if (!items) {
    return;
  }

  // create a new Swiper instances
  const thumbs = new Swiper(thumbsEl, {
    spaceBetween: 16,
    slidesOffsetBefore: 24,
    slidesOffsetAfter: 24,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    watchOverflow: true,
  });

  items.forEach((item) => {
    thumbs.appendSlide(
      `<div class="swiper-slide case-study-gallery_thumb-wrapper"><img src="${item.url}" class="case-study-gallery_thumb"></div>`
    );
  });

  thumbs.update();

  const gallery = new Swiper(galleryEl, {
    effect: "fade",
    thumbs: {
      swiper: thumbs,
    },
  });

  items.forEach((item) => {
    gallery.appendSlide(
      `<div class="swiper-slide case-study-gallery_img-wrapper"><img src="${item.url}" class="case-study-gallery_img"></div>`
    );
  });
  gallery.update();
}

function getJSONValues(el) {
  // Find the <script> tag inside the <a> tag
  const scriptElement = el.querySelector(
    'script[type="application/json"]'
  );

  if (scriptElement) {
    // Get the content of the <script> tag
    const jsonString = scriptElement.textContent.trim();

    try {
      // Parse the JSON string into a JavaScript object
      const jsonObject = JSON.parse(jsonString);

      // console.log("Extracted JSON Object:", jsonObject);

      return jsonObject.items;

      // Now you can use the jsonObject as needed
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } else {
    console.error(
      "No script tag with type application/json found inside the link element."
    );
  }
}

document.addEventListener("DOMContentLoaded", initCaseStudyModals);