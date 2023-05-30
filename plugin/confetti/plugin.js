import confetti from "canvas-confetti";

// function integerDataAttrOrDefault(el, attr, def) {
//   return el.dataset[attr] ? parseInt(el.dataset[attr], 10) : def;
// }

// function arrayDataAttrOrDefault(el, attr, def) {
//   return el.dataset[attr] ? el.dataset[attr].split(" ") : def;
// }

function onSlideTransitionEnd({ currentSlide }) {
  if (currentSlide.dataset.confetti) {
    const defaults = { y: 0.5 };
    defaults.colors = currentSlide.dataset["confetti-colors"]
      ? currentSlide.dataset["confetti-colors"].split(" ")
      : undefined;
    const particleCount = currentSlide.dataset["confetti-particle-count"]
      ? parseInt(currentSlide.dataset["confetti-particle-count"], 10)
      : 200;
    if ("confetti-small" in currentSlide.dataset) {
      confetti({
        ...defaults,
        particleCount: particleCount,
        spread: 70,
      });
    } else if ("confetti-large" in currentSlide.dataset) {
      const duration = currentSlide.dataset["confetti-duration"]
        ? parseInt(currentSlide.dataset["confetti-duration"], 10)
        : 0;
      const end = Date.now() + duration * 1000;
      const frame = function frame() {
        confetti({
          ...defaults,
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          ...defaults,
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } else {
      const settings = [
        {
          ...defaults,
          spread: 26,
          startVelocity: 55,
          particleCount: particleCount * 0.12,
        },
        { ...defaults, spread: 60, particleCount: particleCount * 0.1 },
        {
          ...defaults,
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
          particleCount: particleCount * 0.18,
        },
        {
          ...defaults,
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
          particleCount: particleCount * 0.1,
        },
        {
          ...defaults,
          spread: 120,
          startVelocity: 45,
          particleCount: particleCount * 0.1,
        },
        {
          ...defaults,
          angle: 45,
          startVelocity: 65,
          particleCount: particleCount * 0.2,
        },
        {
          ...defaults,
          angle: 135,
          startVelocity: 65,
          particleCount: particleCount * 0.2,
        },
      ];
      settings.forEach((opts) => confetti(opts));
    }
  }
}

const Plugin = {
  id: "confetti",
  init: (reveal) => {
    reveal.on("slidetransitionend", onSlideTransitionEnd);
  },
  destroy: () => {},
};

export default () => Plugin;
