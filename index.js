const messagebanner = document.querySelector("#message-banner");
// Variables for main inputter section //

const searchInput = document.querySelector("#school-search-input");
const websiteAutopopulateBox = document.querySelector("#website-autopopulate");
const collegeTownInput = document.querySelector("#college-town-input");
const schoolSafetyInput = document.querySelector("#safety-input");
const classSizeInput = document.querySelector("#class-size-input");
const HrsFromHomeInput = document.querySelector("#hours-from-home-input");
// Variables for autopopulated #1 ranked school //

const collegeTown1 = document.querySelector("#college-town1");
const safety1 = document.querySelector("#safety1");
const classSize1 = document.querySelector("#class-size1");
const hrsFromHome1 = document.querySelector("#hours-from-home1");
const website1 = document.querySelector("#college-website1");
// Variables for autopopulated #2 ranked school //

const collegeTown2 = document.querySelector("#college-town2");
const safety2 = document.querySelector("#safety1");
const classSize2 = document.querySelector("#class-size2");
const hrsFromHome2 = document.querySelector("#hours-from-home2");
const website2 = document.querySelector("#college-website2");
// Variables for autopopulated #3 ranked school //

const collegeTown3 = document.querySelector("#college-town3");
const safety3 = document.querySelector("#safety3");
const classSize3 = document.querySelector("#class-size3");
const hrsFromHome3 = document.querySelector("#hours-from-home3");
const website3 = document.querySelector("#college-website3");
let unisArray = [];
// Drop down variables //

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const optionsList = document.querySelectorAll(".option");
// Dropdown functionality//

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});
//add event listeners for all options in our list//

optionsList.forEach((o) => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

const handleErrorDisplay = (error) => {
  messagebanner.classList.add("alert");
  messagebanner.textContent = error;
  messagebanner.classList.remove("hide");
  setTimeout(() => {
    messagebanner.classList.remove("alert");
    messagebanner.classList.add("hide");
  }, 5000);
};

const handleChange = (e) => {
  const search = e.target.value;
  const selectedUnis = unisArray.filter((uni) =>
    uni.name.toLowerCase().startsWith(search.toLowerCase())
  );
  if (selectedUnis.length === 0) {
    returnNone();
  } else {
    selectedUnis.forEach(makeUniTile);
  }
  searchInput.value = "";
};

const returnNone = () => {
  const div = document.createElement("div");
  div.className = "card alert-warning";

  const icon = document.createElement("h1");
  icon.textContent = "NOpe";

  const header = document.createElement("h3");
  header.textContent = "No university found";

  div.append(icon, header);
  collegeTown1.append(div);
};
// Creating 3 ranked cards for populated university, safety, class size, etc.
const makeUniTile = (uni) => {
  const div = document.createElement("div");
  div.id = `uni-card-ranked1-${uni.id}`;
  div.className = "uni-card1";

  const title = document.createElement("h2");
  title.textContent = uni.name;

  const span = document.createElement("span");
  span.className = "uni-details";
  span.textContent = `
    Website: ${uni.web_pages}
  `;
  div.append(title, span);
  website1.append(div);
};

const displayUnis = (unis) => {
  unisArray = unis;
  unis.length > 0 ? unis.forEach((uni) => makeUniTile(uni)) : returnNone();
};
const fetchUniversities = () => {
  fetch("http://localhost:3000/universities")
    .then((resp) => resp.json())
    .then((unis) => displayUnis(unis))
    .catch(handleErrorDisplay);
};

const handlePageLoaded = () => {
  fetchUniversities();
  // University dropdown
  searchInput.addEventListener("change", handleChange);
};

document.addEventListener("DOMContentLoaded", handlePageLoaded);
