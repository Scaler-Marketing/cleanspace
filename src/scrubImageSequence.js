// Global dimensions
const width = document.documentElement.clientWidth;
const height = window.innerHeight;

// Media queries (kept as in your original code)
const mm = gsap.matchMedia();

// Global counters (if you want to track overall loading progress)
let globalImagesRemaining = 0;
let totalImagesCount = 0;

// Initialize sections – now each section will update global counts
function initSections() {
  const sections = gsap.utils.toArray("[scrub-wrapper]");
  sections.forEach((section) => {
    const prefix = section.dataset.prefix;
    const suffix = section.dataset.suffix;
    const frames = Number(section.dataset.framecount);
    const canvas = section.querySelector("canvas");
    if (!canvas || !prefix || !suffix || !frames) return;

    // Device check remains the same
    const device = width >= 768 ? "desktop" : "mobile";

    totalImagesCount += frames;
    globalImagesRemaining += frames;
    initCanvas(section, canvas, prefix, suffix, frames, device);
  });
}

// Update global counter and call lenis.resize when all images are loaded
function updateGlobalImageCount() {
  globalImagesRemaining--;
  const updatedPercent =
    100 - Math.round((globalImagesRemaining * 100) / totalImagesCount);
  // You can use updatedPercent for a loading bar if needed
  if (globalImagesRemaining === 0) {
    setTimeout(() => {
      lenis.resize();
    }, 500);
  }
}

// Initialize the canvas for a given section.
// Refactored to use a local "imagesLoaded" counter so that each section handles its own images.
function initCanvas(section, canvas, prefix, suffix, frames, device) {
  const context = canvas.getContext("2d");
  canvas.width = document.documentElement.clientWidth;
  canvas.height = window.innerHeight;

  const frameCount = frames;
  const currentFrame = (index) =>
    `${prefix}${device}/${(index + 1).toString().padStart(3, "0")}${suffix}`;
  const images = [];
  let imagesLoaded = 0;

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    const imgSrc = currentFrame(i);
    img.onload = () => {
      imagesLoaded++;
      updateGlobalImageCount();
      if (imagesLoaded === frameCount) {
        // When all images for this section are loaded, initialize animations.
        initCanvasAnimations(section, images, context, canvas);
      }
    };
    img.onerror = () => {
      imagesLoaded++;
      updateGlobalImageCount();
      if (imagesLoaded === frameCount) {
        initCanvasAnimations(section, images, context, canvas);
      }
    };
    img.src = imgSrc;
    images.push(img);
  }
}

// Sets up the animation for the canvas.
// For each block (with [frames-play]), we check for a data-autoplay-sequence attribute.
// • If present and if the page scroll is at the top (<=1px), we auto-animate the image sequence.
// • Otherwise, we immediately render the final frame of that block.
// Blocks without the attribute use the standard ScrollTrigger timeline.
function initCanvasAnimations(section, images, context, canvas) {
  // This default sequence is used for an initial render (it’s independent of any block)
  const defaultSequence = { frame: 0 };

  const blocks = section.querySelectorAll("[frames-play]");
  blocks.forEach((block) => {
    const start = Number(block.dataset.start);
    const end = Number(block.dataset.end);
    const posStart = block.dataset.startPos || "top top";
    const posEnd = block.dataset.endPos || "bottom bottom";
    const blockSequence = { frame: 0 };

    // Check if we want to auto-play this block’s sequence:
    if ("autoplaySequence" in block.dataset) {
      if (window.scrollY <= 1) {
        // Animate automatically from start to end
        gsap.to(blockSequence, {
          frame: end - 1,
          duration: 1,
          ease: "none",
          onUpdate: () => render(images, blockSequence, context, canvas),
        });
      } else {
        // If the scroll is already past the top, set it to the final frame
        blockSequence.frame = end - 1;
        render(images, blockSequence, context, canvas);
      }
    } else {
      // Standard scroll-triggered timeline for this block
      gsap
        .timeline({
          onUpdate: () => render(images, blockSequence, context, canvas),
          scrollTrigger: {
            trigger: block,
            pin: false,
            scrub: 1,
            start: posStart,
            end: posEnd,
            markers: false,
          },
        })
        .fromTo(
          blockSequence,
          { frame: start - 1 },
          { frame: end - 1, snap: "frame", ease: "none", duration: 1 },
          0
        );
    }
  });

  // Render the default sequence initially
  render(images, defaultSequence, context, canvas);

  // Update canvas dimensions and re-render on window resize
  window.addEventListener("resize", () => {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = window.innerHeight;
    render(images, defaultSequence, context, canvas);
  });
}

// Renders the current image on the canvas based on the sequence's frame value.
function render(images, sequence, context, canvas) {
  const img = images[sequence.frame];
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate scale factor so the image covers the canvas
  const scaleFactor = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );
  const newWidth = img.width * scaleFactor;
  const newHeight = img.height * scaleFactor;
  const x = canvas.width / 2 - newWidth / 2;
  const y = canvas.height / 2 - newHeight / 2;

  context.drawImage(img, x, y, newWidth, newHeight);
}

// Initialize sections based on media queries
mm.add("(min-width: 768px)", () => {
  initSections();
});
mm.add("(max-width: 767px)", () => {
  initSections();
});
