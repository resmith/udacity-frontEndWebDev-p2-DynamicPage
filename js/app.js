/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function generateMenuLinkId(sectionID) {
  return `menulink_${sectionID}`;
}

function createMenu() {
  const sections = document.querySelectorAll("section");

  const menuTarget = document.querySelector("#menu");
  const docFrag = document.createDocumentFragment();

  for (const section of sections) {
    const newA = document.createElement("a");
    newA.setAttribute("href", `#${section.id}`);
    const newText = document.createTextNode(section.dataset.nav);
    newA.appendChild(newText);

    const newLi = document.createElement("li");
    newLi.id = generateMenuLinkId(section.id);
    newLi.appendChild(newA);

    docFrag.appendChild(newLi);
  }

  menuTarget.appendChild(docFrag);
}

function highlightFirstVisibleSection() {
  const sections = document.querySelectorAll("section");

  // Find the closest visible section
  let winningSection = { id: "", y: 9999 }; // seed
  for (const section of sections) {
    const location = section.getBoundingClientRect();
    console.log(`createMenu section: ${section.id}`, location);
    if ((location.y > 0) & (location.y < winningSection.y)) {
      winningSection.id = section.id;
      winningSection.y = location.y;
    }
  }

  // Make the winning section highlighted in the menu
  console.log("Winner is: ", winningSection);
  for (const section of sections) {
    const targetId = generateMenuLinkId(section.id);
    const menuTarget = document.querySelector(`#${targetId}`);
    const sectionTarget = document.querySelector(`#${section.id}`);
    console.log("sectionTarget: ", sectionTarget);
    if (section.id === winningSection.id) {
      menuTarget.classList.add("navbar__menu_active");
      sectionTarget.classList.add("your-active-class");
    } else {
      menuTarget.classList.remove("navbar__menu_active");
      sectionTarget.classList.remove("your-active-class");
    }
  }
}

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

console.log("App.js");
createMenu();
window.addEventListener("scroll", function (e) {
  highlightFirstVisibleSection();
});
