import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { initWrappedLinks } from "./js/links-wrapper";

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  if (import.meta.env.MODE === "development") {
    if (!window.location.pathname.endsWith("/")) {
      window.location.pathname += "/";
    }
  }

  initWrappedLinks();
});
