import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export class CounterAnimation {
  constructor(options = {}) {
    // Default options
    this.options = {
      increaseBtn: "#increase",
      decreaseBtn: "#decrease",
      leftNumber: "#leftNumber",
      rightNumber: "#rightNumber",
      buttonsDiv: "#buttons",
      counter: "#counter",
      minNumber: 0,
      maxNumber: 20,
      animationDuration: 0.15,
      animationDistance: 50,
      blurAmount: 8,
    };

    this.currentNumber = this.options.minNumber;
    this.leftNumberCount = 0;
    this.rightNumberCount = 0;
    this.elements = {};

    this.init();
  }

  init() {
    gsap.registerPlugin(ScrollTrigger);
    this.selectElements();
    this.setupInitialState();
    this.addEventListeners();
  }

  selectElements() {
    for (const [key, selector] of Object.entries(this.options)) {
      if (typeof selector === "string" && selector.startsWith("#")) {
        this.elements[key] = document.querySelector(selector);
      }
    }
  }

  setupInitialState() {
    gsap.set(this.elements.leftNumber, {
      y: this.options.animationDistance,
      opacity: 0,
      width: 0,
      filter: `blur(${this.options.blurAmount}px)`,
    });
  }

  addEventListeners() {
    this.elements.increaseBtn.addEventListener("click", () => this.increase());
    this.elements.decreaseBtn.addEventListener("click", () => this.decrease());
  }

  animateNumber(newNumber, element, direction) {
    const { animationDuration, animationDistance, blurAmount } = this.options;
    const animationTimeline = gsap.timeline();

    animationTimeline
      .to(element, {
        duration: animationDuration,
        y: direction === "up" ? -animationDistance : animationDistance,
        filter: `blur(${blurAmount}px)`,
        opacity: 0,
        ease: "power3.in",
      })
      .call(() => {
        element.innerHTML = newNumber;
      })
      .set(element, {
        y: direction === "up" ? animationDistance : -animationDistance,
        opacity: 0,
        filter: `blur(${blurAmount}px)`,
      })
      .to(element, {
        duration: animationDuration,
        width: "auto",
        filter: "blur(0px)",
        y: 0,
        opacity: 1,
        ease: "power3.out",
      });
  }

  blockedAction() {
    gsap
      .timeline({ repeat: 1, repeatDelay: 0.1 })
      .to(this.elements.buttonsDiv, {
        x: 5,
        ease: "bounce.in",
        duration: 0.05,
      })
      .to(this.elements.buttonsDiv, {
        x: -5,
        ease: "bounce.in",
        duration: 0.05,
      });
  }

  increase() {
    if (this.currentNumber >= this.options.maxNumber) {
      this.blockedAction();
      return;
    }

    this.currentNumber++;
    this.rightNumberCount++;
    if (this.rightNumberCount >= 10) {
      this.rightNumberCount = 0;
      this.leftNumberCount++;
      this.animateNumber(this.leftNumberCount, this.elements.leftNumber, "up");
    }
    this.animateNumber(this.rightNumberCount, this.elements.rightNumber, "up");
  }

  decrease() {
    if (this.currentNumber <= this.options.minNumber) {
      this.blockedAction();
      return;
    }

    this.currentNumber--;
    this.rightNumberCount--;
    if (this.rightNumberCount < 0) {
      this.leftNumberCount--;
      this.elements.leftNumber.innerText = this.leftNumberCount;
      this.rightNumberCount = 9;
    }

    if (this.leftNumberCount <= 0) {
      this.hideLeftNumber();
    }
    this.animateNumber(
      this.rightNumberCount,
      this.elements.rightNumber,
      "down"
    );
  }

  hideLeftNumber() {
    const { animationDuration, animationDistance, blurAmount } = this.options;
    gsap.to(this.elements.leftNumber, {
      duration: animationDuration,
      y: animationDistance,
      filter: `blur(${blurAmount}px)`,
      opacity: 0,
      width: 0,
      ease: "power3.in",
      onComplete: () => {
        gsap.to(this.elements.leftNumber, { width: 0 });
      },
    });
  }
}
