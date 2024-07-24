import { CounterAnimation } from "../js/useful-animations";
import { CodeNavigation } from "../js/tab-code-navigation";

const counter = new CounterAnimation();

const codeBlocks = {
  javascript: {
    code: `const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const number = document.getElementById("number");

let initialNumber = 0;

function animateNumber(newNumber, direction) {
  const distance = 50; // Distance to animate

  gsap.to(number, {
    duration: 0.15,
    y: direction === 'up' ? -distance : distance,
    filter: blur(8px),
    opacity: 0,
    ease: "power3.in",
    onComplete: () => {
      number.innerHTML = newNumber;
      gsap.set(number, {
        duration: 0,
        y: direction === 'up' ? distance : -distance,
        opacity: 0,
        filter: blur(8px),
      });

      gsap.fromTo(
        number,
        {
          y: direction === 'up' ? distance : -distance,
          filter: blur(8px),
          opacity: 0,
        },
        {
          duration: 0.15,
          filter: "blur(0px)",
          y: 0,
          opacity: 1,
          ease: "power3.out",
        }
      );
    },
  });
}

function increase() {
  if (initialNumber >= 20) {
    blockedAction();
    return;
  }

  initialNumber++;
  animateNumber(initialNumber, "up");
}

function decrease() {
  if (initialNumber <= 0) {
    blockedAction();
    return;
  }

  initialNumber--;
  animateNumber(initialNumber, "down");
}

increaseBtn.addEventListener("click", increase);
decreaseBtn.addEventListener("click", decrease);
`,
    language: "javascript",
  },
  html: {
    code: `<!-- usando tailwindcss -->
<div class="flex justify-center items-center gap-8" id="buttons">
  <button class="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-xl text-zinc-200 active:scale-90" id="decrease">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
    </svg>
  </button>
  <span class="text-5xl text-semibold text-zinc-100" id="number">0</span>
  <button class="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-xl text-zinc-200 active:scale-90" id="increase">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </button>
</div>
<p class="text-lg leading-6 text-zinc-300">O número máximo é 20</p>`,
    language: "html",
  },
};

const codeNavigation = new CodeNavigation(
  "[data-code-navigation='01']",
  codeBlocks
);

const approach = {
  javascript: {
    code: `import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");
  const leftNumber = document.getElementById("leftNumber");
  const rightNumber = document.getElementById("rightNumber");
  const buttonsDiv = document.getElementById("buttons");
  const counter = document.getElementById("counter");

  let currentNumber = 0;
  let leftNumberCount = 0;
  let rightNumberCount = 0;

  gsap.set(leftNumber, {
    y: 50,
    opacity: 0,
    width: 0,
    filter: "blur(8px)",
  });

  function animateNumber(newNumber, element, direction) {
    const distance = 50; // Distance to animate
    gsap.to(element, {
      duration: 0.15,
      y: direction === "up" ? -distance : distance,
      filter: blur(8px),
      opacity: 0,
      ease: "power3.in",
      onComplete: () => {
        element.innerHTML = newNumber;
        gsap.set(element, {
          duration: 0,
          y: direction === "up" ? distance : -distance,
          opacity: 0,
          filter: blur(8px),
        });

        gsap.fromTo(
          element,
          {
            y: direction === "up" ? distance : -distance,
            filter: blur(8px),
            opacity: 0,
          },
          {
            duration: 0.15,
            width: "auto",
            filter: "blur(0px)",
            y: 0,
            opacity: 1,
            ease: "power3.out",
          }
        );
      },
    });
  }

  function blockedAction() {
    let blockedTl = gsap.timeline({ repeat: 1, repeatDelay: 0.1 });

    blockedTl.to(buttonsDiv, {
      x: 5,
      ease: "bounce.in",
      duration: 0.05,
    });
    blockedTl.to(buttonsDiv, {
      x: -5,
      ease: "bounce.in",
      duration: 0.05,
    });
  }

  function increase() {
    if (currentNumber >= 20) {
      blockedAction();
      return;
    }

    currentNumber++;
    rightNumberCount++;
    if (rightNumberCount >= 10) {
      rightNumberCount = 0;
      leftNumberCount++;
      animateNumber(leftNumberCount, leftNumber, "up");
    }
    animateNumber(rightNumberCount, rightNumber, "up");
  }

  function decrease() {
    if (currentNumber <= 0) {
      blockedAction();
      return;
    }

    currentNumber--;
    rightNumberCount--;
    if (rightNumberCount <= -1) {
      leftNumberCount--;
      leftNumber.innerText = leftNumberCount;

      rightNumberCount = 9;
    }

    if (leftNumberCount <= 0) {
      gsap.to(leftNumber, {
        duration: 0.1,
        y: 50,
        filter: "blur(8px)",
        opacity: 0,
        width: 0,
        ease: "power3.in",
        onComplete: () => {
          gsap.to(leftNumber, {
            width: 0,
          });
        },
      });
    }
    animateNumber(rightNumberCount, rightNumber, "down");
  }

  increaseBtn.addEventListener("click", increase);
  decreaseBtn.addEventListener("click", decrease);
});

`,
    language: "javascript",
  },
  html: {
    code: `<!-- usando tailwindcss -->
<div class="flex justify-center items-center gap-8" id="buttons">
  <button class="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-xl text-zinc-200 active:scale-90" id="decrease">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
    </svg>
  </button>
  <div class="flex items-center justify-center" id="counter">
    <span class="text-5xl text-semibold text-zinc-100" id="leftNumber">0</span>
    <span class="text-5xl text-semibold text-zinc-100" id="rightNumber">0</span>
  </div>
  <button class="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-xl text-zinc-200 active:scale-90" id="increase">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </button>
</div>
<p class="text-lg leading-6 text-zinc-300">O número máximo é 20</p>`,
    language: "html",
  },
};

const approachCode = new CodeNavigation(
  "[data-code-navigation='02']",
  approach
);
