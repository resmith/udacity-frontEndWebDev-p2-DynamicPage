function generateMenuLinkId(sectionID) {
  return `menulink_${sectionID}`;
}

// Create the left hand menu from the sections in the document
function createMenu() {
  const sections = document.querySelectorAll("section");

  const menuTarget = document.querySelector("#menu");
  const docFrag = document.createDocumentFragment();

  for (const section of sections) {
    const newA = document.createElement("a");
    const scrollFunc = `javascript:scrollToSection("${section.id}");`;
    newA.setAttribute("href", scrollFunc);
    const newText = document.createTextNode(section.dataset.nav);
    newA.appendChild(newText);

    const newLi = document.createElement("li");
    newLi.id = generateMenuLinkId(section.id);
    newLi.appendChild(newA);

    docFrag.appendChild(newLi);
  }

  menuTarget.appendChild(docFrag);
}

// Highlight in the menu of links the first section that is showing
function highlightFirstVisibleSection() {
  const sections = document.querySelectorAll("section");

  // Find the closest visible section
  let winningSection = { id: "", y: 9999 }; // seed
  for (const section of sections) {
    const location = section.getBoundingClientRect();
    if ((location.y > 0) & (location.y < winningSection.y)) {
      winningSection.id = section.id;
      winningSection.y = location.y;
    }
  }

  // Make the winning section highlighted in the menu
  for (const section of sections) {
    const targetId = generateMenuLinkId(section.id);
    const menuTarget = document.querySelector(`#${targetId}`);
    const sectionTarget = document.querySelector(`#${section.id}`);
    if (section.id === winningSection.id) {
      menuTarget.classList.add("navbar__menu_active");
      sectionTarget.classList.add("your-active-class");
    } else {
      menuTarget.classList.remove("navbar__menu_active");
      sectionTarget.classList.remove("your-active-class");
    }
  }
}

// When the user clicks on the menu link, scroll that section to the top of the browser
function scrollToSection(sectionID) {
  const sectionTarget = document.querySelector(`#${sectionID}`);
  sectionTarget.scrollIntoView();
}

createMenu();
window.addEventListener("scroll", function (e) {
  highlightFirstVisibleSection();
});
