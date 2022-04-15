/** Navigation Section - Creating Dynamic Elements **/

// get all sections, make it ARRAY by spread method and store it in constant variable
const sectionElements = [...document.querySelectorAll("section")];

// create a fragment (not actual Node) to reduce reflow and repaint that will occurs from looping => for best performance
const fragment = document.createDocumentFragment();

// looping over sections to define dynmically navbar
sectionElements.map((ele) => {
  // creating li elements and storing it to lists variable
  let lists = document.createElement("li");

  // creating a elements and storing it to anchorTag variable
  let anchorTag = document.createElement("a");

  // getting data-nav value and storing it to datanav variable
  let dataNav = ele.getAttribute("data-nav");

  // creating text Node to set the data nav into it
  let navText = document.createTextNode(dataNav);

  anchorTag.appendChild(navText); // appending the name of section to the anchor tag => <a>Section 1, ...</a>
  lists.appendChild(anchorTag); // appending the anchor tag to li elements => <li> <a>Section 1, ...</a> </li>
  fragment.appendChild(lists); // appending li to the fragment to append it to the ul element after looping in order to improve performance

  // link each section with its relational list in navigation bar
  lists.addEventListener("click", () => ele.scrollIntoView({ behavior: "smooth" }) );
});

// select ul element to append fragment over it
const unorderedLists = document.querySelector("#navbar__list");

// adding the final elements into the dom <ul> <li> <a> Text... </a> </li></ul>
unorderedLists.appendChild(fragment);

// adding default style to navigation bar
unorderedLists.style.cssText = "background-color: #00000080; position: fixed; top: 0; right: 0; width: 100%;";
const lis = document.querySelectorAll(".navbar__menu li");
for (let li of lis) {
  li.style.cssText = "padding:1rem; cursor: pointer;";
}

/** Active Section **/
function activeSection() {
  sectionElements.map(function (element) {
    // getting location of each section from the top of viewport to apply active section for
    const location = element.getBoundingClientRect();
    if (location.top > -10 && location.top < 150) {
      // checking if the target section in viewport we'll remove any class from sections and adding new ACTIVE one to the current
      sectionElements.map((removeClassSection) => {
        removeClassSection.classList.remove("your-active-class");
      });
      element.classList.toggle("your-active-class");

      /** Active List **/
      // we're getting the Section name THAT in the viewport to link it with the nav bar later
      const nameOfList = element.getAttribute("data-nav");

      // checking that each list don't have activeClass attribute then adding it to the active one
      lis.forEach((li) => {
        if (li.innerText === nameOfList) {
          for (let liEle of lis) {
            liEle.classList.remove("activeClass");
          }
          li.classList.toggle("activeClass");
        }
      });
    }
  });
};


// adding the active section function to Scroll event listener to know the location
window.addEventListener("scroll", activeSection);