const versionToggle = document.querySelector(".version-toggle");
const versionPanel = document.querySelector("#versionPanel");

if (versionToggle && versionPanel) {
  versionToggle.addEventListener("click", () => {
    const willOpen = versionPanel.hasAttribute("hidden");
    versionPanel.toggleAttribute("hidden", !willOpen);
    versionToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });

  document.addEventListener("click", (event) => {
    const insidePanel = versionPanel.contains(event.target);
    const onToggle = versionToggle.contains(event.target);
    if (!insidePanel && !onToggle && !versionPanel.hasAttribute("hidden")) {
      versionPanel.setAttribute("hidden", "");
      versionToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !versionPanel.hasAttribute("hidden")) {
      versionPanel.setAttribute("hidden", "");
      versionToggle.setAttribute("aria-expanded", "false");
    }
  });
}
