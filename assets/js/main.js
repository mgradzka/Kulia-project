// Selecting elements
const triangle = document.querySelector(".fa-caret-down");
const menuTeaserSection = document.querySelector(".menu-home");
const mapContainer = document.querySelector("#map");
const cssSelector = document.querySelector("#mobile--desktop");
const mobileMenu = document.querySelector(".mobile-nav");
const menuElm = document.querySelector("#mobile");
const headerElm = document.querySelector("header");
const desktopNavBar = document.querySelector(".desktop-nav");
const whiteFont = document.querySelector(".nav-white");
const li = document.querySelectorAll("li");
const icons = document.querySelectorAll("i");
const aS = document.querySelectorAll("a");
const logo = document.querySelector(".kulia-logo");
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const headerArg = document.querySelector(".header-teaser");
const truck = document.querySelector(".truck");

// Map
let map = L.map("map", { scrollWheelZoom: false }).setView(
  [57.057602517982154, 9.919072478631133],
  14
);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGFtYXNob2xsb3MiLCJhIjoiY2w0MDFvdnh2MTlzbjNicWdndTJiMHRveiJ9.hjxH4OdkKlUBrdUPV3PjGw",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // center: 'center',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "your.mapbox.access.token",
  }
).addTo(map);

map.dragging.disable();

let marker = L.marker([57.05750458147221, 9.91942534948683]).addTo(map);

marker.bindPopup("Mellem Broerne, 9400 Nørresundby").openPopup();

// Scrolling on the page
// Implementing the mobile navigation
const menuActive = "opened";
menuElm.addEventListener("click", function (event) {
  event.preventDefault();
  const currentScroll = window.pageYOffset;

  if (headerElm.className.indexOf("opened") === -1) {
    headerElm.classList.add(menuActive);

    menuElm.classList.remove("fa-bars");
    menuElm.classList.add("fa-times");
    mobileMenu.style.marginTop = `${currentScroll}px`;
    mapContainer.classList.add("hide");
  } else {
    headerElm.classList.remove(menuActive);
    menuElm.classList.add("fa-bars");
    menuElm.classList.remove("fa-times");
    mapContainer.classList.remove("hide");
  }
});

// Selecting the applicable a tags
let navItem = [];
for (let i = 0; i < aS.length; i++) {
  const [...child] = aS[i].children;
  navItem.push(child);
}
const flatNavItem = navItem
  .flat()
  .filter((item) => item.classList.contains("nav-white"));
// console.log(flatNavItem);

// Implementing the desktop navigation
window.onscroll = function () {
  onScrollChecks();
};
function onScrollChecks() {
  if (window.pageYOffset > 100) {
    desktopNavBar.classList.add("nav-transition");

    for (let i = 0; i < flatNavItem.length; i++) {
      flatNavItem[i].classList.add("white");
    }

    logo.src = "./assets/svg/kulia_logo.svg";
  }
}

// ***************************************** //
// ******** Fetching data for the pages ***************//
const initAll = function () {
  fetchingData(4);
};
initAll();

// Calling the posts by tagNumber
function fetchingData(tagNumber) {
  fetch(`https://www.testpage12345.com/wp-json/wp/v2/posts?&tags=${tagNumber}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const tag = tagNumber;
      switch (tag) {
        case 6:
          drawMealCards(data);
          break;
        case 5:
          drawMessyFries(data);
          break;
        case 7:
          drawOthers(data);
          break;
        case 8:
          drinksCard(data, "#non-alcoholic");
          break;
        case 9:
          drinksCard(data, "#alcoholic");
          break;
        case 4:
          openingHours(data);
          break;
        case 3:
          drawEvents(data);
          break;
      }
    });
}

function openingHours(days) {
  
  const [opening] = days.map((d) => d.acf);
  const openHours = Object.values(opening);
 

  for (let i = 0; i < weekDays.length; i++) {
    let newContent = `<p>${weekDays[i]}: ${hours(i)}</p>`;
    drawHtml("#opening", newContent);
  }
  function hours(curDay) {
    for (let i = 0; i < openHours.length; i++) {
      if (curDay != i) continue;
      else {
        return openHours[i];
      }
    }
  }

}

// Adding nodes to the HTML
function drawHtml(selector, newContent) {
  document.querySelector(selector).innerHTML += newContent;
}
