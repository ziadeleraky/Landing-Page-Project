// define variables for selecting & creating Navigation bar elements
let navSec = document.querySelectorAll("section");
let ul = document.querySelector("ul");
let navFragment = document.createDocumentFragment();

for (let i = 0; i < navSec.length; i++) {
  let lists = document.createElement("li");
  let anchorTag = document.createElement("a"); // appending the name of section to the anchor tag => <a>Section 1, ...</a>
  anchorTag.innerText = `Section ${i + 1}`;
  lists.appendChild(anchorTag); // appending the anchor tag to li elements => <li> <a>Section 1, ...</a> </li>
  navFragment.appendChild(lists); // appending li to the fragment to append it to the ul element after looping in order to improve performance
}

ul.appendChild(navFragment); // adding the final elements into the dom <ul> <li> <a> Text... </a> </li></ul>

// creating a function that counts how many lists and show them in the nav bar
function add() {
  let navSec = document.querySelectorAll("section");
  let ul = document.querySelector("ul");
  let navFragment = document.createDocumentFragment();

  navSec.forEach(function (e) {
    let lists = document.createElement("li");
    let anchorTag = document.createElement("a");
    lists.classList.add("li");
    let dataNav = e.getAttribute("data-nav");
    anchorTag.innerText = dataNav;
    lists.appendChild(anchorTag);
    navFragment.appendChild(lists);
  });
  ul.appendChild(navFragment);

  window.onscroll = function () { // anonymous scrolling functions to calculate the exact location of the active section
    for (let section of activeSections) {
      const secLocation = section.offsetTop;
      if (secLocation < window.pageYOffset + 300) {
        activeSections.forEach((eRemove) => {
          eRemove.classList.remove("your-active-class");
        });
        section.classList.add("your-active-class");
      }
    }
  };
}

// select ul element to append fragment over it
const unorderedLists = document.querySelector("#navbar__list");
const lis = document.querySelectorAll("li");

// adding default style to navigation bar
unorderedLists.classList.add("nav");
for (let li of lis) {
  li.classList.add("li");
}

const activeSections = [...document.getElementsByTagName("section")];

window.onscroll = function () {
  for (let section of activeSections) {
    const secLocation = section.offsetTop;
    section.addEventListener("click", () =>
      section.scrollIntoView({ behavior: "smooth" })
    );
    if (secLocation < window.pageYOffset + 300) {
      activeSections.forEach((eRemove) => {
        eRemove.classList.remove("your-active-class");
      });
      section.classList.add("your-active-class");

      // looping to define and style which list that related with its section
      const data = section.getAttribute("data-nav");
      lis.forEach((li) => {
        if (data === li.textContent) {
          lis.forEach((lii) => {
            lii.classList.remove("activeClass");
          });
          li.classList.toggle("activeClass");
        }
      });
    }
  }
};

// a loop to know the active section and listen to scroll to view the element
lis.forEach(function (li) {
  activeSections.forEach(function (sec) {
    if (li.textContent === sec.getAttribute("data-nav")) {
      li.addEventListener("click", function (e) {
        e.preventDefault();
        sec.scrollIntoView({ behavior: "smooth" });
      });
    }
  });
});
