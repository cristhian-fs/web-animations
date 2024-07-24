import { docsConstants } from "@/constants/docs-contants";

export function initWrappedLinks() {
  const linksWrapper = document.getElementById("doc-links-wrapper");

  function generateLinks() {
    if (!linksWrapper) return;

    for (const doc of docsConstants) {
      const link = document.createElement("a");
      link.href = doc.path;
      link.classList.add(
        "text-zinc-400",
        "hover:text-white",
        "transition-all",
        "text-base",
        "leading-6",
        "text-zinc-400"
      );
      link.textContent = doc.title;
      linksWrapper.appendChild(link);

      link.addEventListener("mouseenter", (e) => {
        handlePseudoElement(e.target);
      });
    }

    handlePseudoElementActive();
  }

  function handlePseudoElement(target) {
    const coords = target.getBoundingClientRect();
    const linksWrapperCoords = linksWrapper.getBoundingClientRect();
    linksWrapper.style.setProperty("--link-height", `${coords.height}px`);
    linksWrapper.style.setProperty(
      "--link-top",
      `${coords.top - linksWrapperCoords.top}px`
    );
  }

  function tableContentPseudoEl(target) {
    const coords = target.getBoundingClientRect();
    const tableContentWrapper = document.querySelector("#table-wrapper");
    const parentCoods = tableContentWrapper.getBoundingClientRect();
    tableContentWrapper.style.setProperty(
      "--content-height",
      `${coords.height}px`
    );
    tableContentWrapper.style.setProperty(
      "--content-top",
      `${coords.top - parentCoods.top}px`
    );
  }

  function handlePseudoElementActive() {
    let activeLink = window.location.pathname;
    if (!activeLink) return;
    const link = document.querySelector(`a[href="${activeLink}"]`);
    if (!link) return;

    link.classList.add("!text-white");
    handlePseudoElement(link);
  }

  if (linksWrapper) {
    linksWrapper.addEventListener("mouseleave", handlePseudoElementActive);
  }

  generateLinks();

  function onThisPageGenerateLinks() {
    const contentWrapper = document.getElementById("doc-content-wrapper");

    if (!contentWrapper) return;

    const anchorLinks = contentWrapper.querySelectorAll("h2,h3,h4");

    for (const link of anchorLinks) {
      let createdAnchor = document.createElement("a");
      const marginMultiplier = {
        h2: "ml-0",
        h3: "ml-2",
        h4: "ml-4",
      };

      createdAnchor.href = `#${link.id}`;
      createdAnchor.textContent = link.textContent;
      createdAnchor.classList.add(
        "text-white",
        "transition-all",
        "text-sm",
        "leading-6",
        marginMultiplier[link.tagName.toLocaleLowerCase()]
      );

      createdAnchor.setAttribute("data-anchor", link.id);

      const onThisPageWrapper = document.getElementById("on-this-page-wrapper");

      onThisPageWrapper.appendChild(createdAnchor);
    }
  }

  function tableOfContentPseudoElement() {
    const anchorLinks = document.querySelectorAll("a[data-anchor]");
    if (!anchorLinks.length) return;

    const anchorLinksArray = Array.from(anchorLinks);
    const anchorContents = document.querySelectorAll(
      "#doc-content-wrapper h2, h3, h4"
    );

    let currentLink = null;
    anchorContents.forEach((anchorContent) => {
      const { top, bottom } = anchorContent.getBoundingClientRect();
      if (top < 300) {
        currentLink = anchorContent.id;
      }
    });

    anchorLinksArray.forEach((link) => {
      if (link.dataset.anchor === currentLink) {
        tableContentPseudoEl(link);
      }
    });
  }

  onThisPageGenerateLinks();

  // calling the function after the links being generated
  const firstLink = document.querySelector("a[data-anchor]");
  if (firstLink) {
    tableContentPseudoEl(firstLink);
  }
  window.addEventListener("scroll", tableOfContentPseudoElement);
}
