import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import html from "highlight.js/lib/languages/vbscript-html";

export class CodeNavigation {
  constructor(navigationParent, codeBlocks) {
    this.navigationParent = document.querySelector(navigationParent);
    this.codeBlocks = codeBlocks;
    this.codesToHighlight = this.navigationParent.querySelectorAll("pre");
    this.toggleButtons = this.navigationParent.querySelectorAll(
      "button[data-typecode]"
    );
    this.init();
  }

  init() {
    this.initState();
    this.hightlightCodes();
    this.addEventListeners();
    this.registeringLanguages();
  }

  registeringLanguages() {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("css", css);
    hljs.registerLanguage("json", json);
    hljs.registerLanguage("html", html);
  }

  addEventListeners() {
    this.toggleButtons.forEach((toggleButton) => {
      toggleButton.addEventListener("click", () => {
        this.toggleCode(toggleButton.dataset.typecode);
      });
    });
  }

  hightlightCodes() {
    this.codesToHighlight.forEach((code) => {
      const typecode = code.dataset.code;
      const codeBlock = this.codeBlocks[typecode];
      if (codeBlock) {
        let codeDiv = code.querySelector("code");
        if (codeDiv) {
          codeDiv.textContent = codeBlock.code;
          codeDiv.classList.add(`language-${typecode}`);
          hljs.highlightElement(codeDiv);
        }
      }
    });
  }

  initState() {
    this.toggleButtons.forEach((toggleButton) => {
      if (toggleButton.dataset.active === "true") {
        this.toggleCode(toggleButton.dataset.typecode);
      }
    });
  }

  toggleCode(typecode) {
    this.codesToHighlight.forEach((code) => {
      code.classList.add("hidden");
      if (code.dataset.code === typecode) {
        code.classList.remove("hidden");
      }
    });
    this.toggleButtons.forEach((toggleButton) => {
      toggleButton.setAttribute("data-active", "false");
      if (toggleButton.dataset.typecode === typecode) {
        toggleButton.setAttribute("data-active", "true");
      }
    });
  }
}
