// get the reference to your html element
let buttons = document.querySelectorAll("button[info]");
let dynamic = document.querySelector("#dynamic-content");




function pickPartial(event) {
  let targetButton = event.target.closest("button");

  if (!targetButton) return;
  let pathId = targetButton.getAttribute("info");
  let dataLocation = `partials/${pathId}.html`;

  handleAjax(dataLocation);
}

buttons.forEach((button) => {
  button.addEventListener("click", pickPartial);
});

function handleAjax(dataLocation) {
  fetch(dataLocation)
  .then(function (response) {
    if (response.ok) {
      return response.text();
    }

    throw new Error(response.statusText);
  })
  .then(function (data) {
    dynamic.innerHTML = data;
  })
  .catch(function (error) {
    console.log(error.message);
  });
}

window.addEventListener('load', function () {
  let homeButton = document.querySelector("button[info='home']");
  if (homeButton) {
    pickPartial ({target: homeButton});
  }
});
