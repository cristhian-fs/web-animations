import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const customCursor = document.getElementById("custom-cursor");
    const viewText = customCursor.querySelector("p");
    const projectImage = document.getElementById("project-image");

    const projects = document.getElementById("projects");

    const projectsEl = document.querySelectorAll(".project-item");
    const sliderImages = document.getElementById("project-image-inner-wrapper");

    projectsEl.forEach((project, index) => {
      project.addEventListener("mouseenter", (e) => {
        gsap.to(sliderImages, {
          y: `${index * -100}%`,
          duration: 0.5,
          ease: "power3.inOut",
        });
      });
    });

    document.addEventListener("mousemove", (e) => {
      gsap.to(viewText, {
        duration: 0.1, // duração da animação em segundos
        x: (e.clientX - customCursor.offsetLeft) * 0.1,
        y: (e.clientY - customCursor.offsetTop) * 0.1,
        ease: "power3.out", // tipo de easing
      });
      // Animação para customCursor
      gsap.to(customCursor, {
        duration: 0.3, // duração da animação em segundos
        left: e.clientX,
        top: e.clientY,
        ease: "power3.out", // tipo de easing
      });

      // Animação para projectImage
      gsap.to(projectImage, {
        duration: 0.7, // duração da animação em segundos
        left: e.clientX,
        top: e.clientY,
        ease: "power3.out", // tipo de easing
      });
    });

    projects.addEventListener("mouseenter", (e) => {
      customCursor.classList.add("active");
      projectImage.classList.add("active");
    });

    projects.addEventListener("mouseleave", (e) => {
      customCursor.classList.remove("active");
      projectImage.classList.remove("active");
    });
  });
});
