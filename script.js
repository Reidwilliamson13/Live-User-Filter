const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = [];
const bottomContent = document.getElementById("content");
const showMoreBox = document.getElementById("show-more");

getData();

filter.addEventListener("input", (e) => filterData(e.target.value));

async function getData() {
  const res = await fetch("https://randomuser.me/api?results=50");
  const { results } = await res.json();

  //Clear result
  result.innerHTML = "";

  results.forEach((user) => {
    const li = document.createElement("li");

    listItems.push(li);
    //using innerHTML to modify the content of the HTML element, in this case, each li tag//
    li.innerHTML = `
      <img src="${user.picture.large}" alt="${user.name.first}">
<div class="user-info"> 
<h4>${user.name.first} ${user.name.last}</h4>
<p>${user.location.city}, ${user.location.country}
</div>
      `;

    result.appendChild(li);
  });
}

function filterData(searchTerm) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

// On click show-more functionality //

showMoreBox.onClick = function () {
  if (bottomContent.className == "open") {
    // shrink the box //
    bottomContent.className = "";
    showMoreBox.innerHTML = "SHOW MORE";
  } else {
    // expand the box //
    bottomContent.className = "open";
    showMoreBox.innerHTML = "SHOW LESS";
  }
};
