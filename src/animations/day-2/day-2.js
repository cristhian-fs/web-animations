import gsap from "gsap";
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
    const blurAmount = 8; // Blur amount
    gsap.to(element, {
      duration: 0.15,
      y: direction === "up" ? -distance : distance,
      filter: `blur(${blurAmount}px)`,
      opacity: 0,
      ease: "power3.in",
      onComplete: () => {
        element.innerHTML = newNumber;
        gsap.set(element, {
          duration: 0,
          y: direction === "up" ? distance : -distance,
          opacity: 0,
          filter: `blur(${blurAmount}px)`,
        });

        gsap.fromTo(
          element,
          {
            y: direction === "up" ? distance : -distance,
            filter: `blur(${blurAmount}px)`,
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
