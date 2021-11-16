const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = [];

getData();

async function getData() {
  const res = await fetch("https://randomuser.me/api?results=50");
  const { results } = await res.json();

  //Clear results
  results.innerHTML = "";

  results.forEach((user) => {
    const li = document.createElement("li");

    listItems.push(li);
    //using innerHTML to modify the content of the HTML element, in this case, each li tag//
    li.innerHTML = `
      <img src="${user.picture.large}" alt="${user.name.first}">
<div class="user-info"> 

</div>
      `;
  });
}
