import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  function getHeightPercentage(el) {
    return ((el.offsetHeight / window.innerHeight) * 100).toFixed(2);
  }

  console.log(getHeightPercentage(document.querySelector("footer")));

  gsap.fromTo(
    "footer",
    {
      yPercent: -100,
    },
    {
      yPercent: 0,
      scrollTrigger: {
        trigger: "#features",
        start: "bottom bottom",
        scrub: !0,
      },
    }
  );
});
