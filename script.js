"use strict";

window.addEventListener("DOMContentLoaded", init);

let movieList = [];
let loadCount = 0;

function init() {
  getSVG("final_infobox.svg", "#infobox-container");
  getSVG("final_timeline.svg", "#timeline-container");
  getData();
}
function getSVG(url, location) {
  fetch(url)
    .then(e => e.text())
    .then(e => {
      document.querySelector(location).innerHTML = e;
      loadCount++;
      if (loadCount === 3) {
        start();
      }
    });
}

function getData() {
  fetch("potterfilms.json")
    .then(e => e.json())
    .then(hpData => {
      movieList = hpData;
      loadCount++;
      if (loadCount === 3) {
        start();
      }
    });
}

function start() {
  const modalcontainer = document.querySelector("#infoboxes");
  const modal = document.createElementNS("http://www.w3.org/2000/svg", "use");

  createUseElement();
  prepareButtons();
  console.log(movieList);

  function createUseElement() {
    modal.setAttribute("href", "#infobox");
    modal.setAttribute("id", "modal");
    modal.setAttribute("width", "418");
    modal.setAttribute("height", "151");
    modalcontainer.appendChild(modal);
    modalcontainer.classList.add("hide");
  }

  function prepareButtons() {
    document
      .querySelector("#bullet1")
      .addEventListener("click", event => prepareModal(0, event.target));
    document
      .querySelector("#bullet2")
      .addEventListener("click", event => prepareModal(1, event.target));
    document
      .querySelector("#bullet3")
      .addEventListener("click", event => prepareModal(2, event.target));
    document
      .querySelector("#bullet4")
      .addEventListener("click", event => prepareModal(3, event.target));
    document
      .querySelector("#bullet5")
      .addEventListener("click", event => prepareModal(4, event.target));
    document
      .querySelector("#bullet6")
      .addEventListener("click", event => prepareModal(5, event.target));
    document
      .querySelector("#bullet7")
      .addEventListener("click", event => prepareModal(6, event.target));
    document
      .querySelector("#bullet8")
      .addEventListener("click", event => prepareModal(7, event.target));
  }

  function prepareModal(movieNumber, event) {
    positionModal(event);
    modifyModal(movieNumber);
    modalcontainer.classList.remove("hide");
  }

  function positionModal(event) {
    const x1 = Math.floor(event.getAttribute("cx"));
    const y1 = event.getAttribute("cy");
    const x2 = x1 + 54;
    const y2 = y1 - 205;

    positionModalLine();
    positionModalBody();

    function positionModalBody() {
      modal.setAttribute("x", x2);
      modal.setAttribute("y", y2 - 302);
    }

    function positionModalLine() {
      const infoboxLine = document.querySelector("#infoboxes line");
      infoboxLine.setAttribute("x1", x1);
      infoboxLine.setAttribute("y1", y1);
      infoboxLine.setAttribute("x2", x2);
      infoboxLine.setAttribute("y2", y2);
    }
  }

  function modifyModal(movieNumber) {
    document.querySelector("#title").textContent =
      movieList[movieNumber].title.original;
    document.querySelector("#danishtitle").textContent =
      movieList[movieNumber].title.danish;
    document.querySelector("#year").textContent = movieList[movieNumber].year;
    document.querySelector("#runtime").textContent =
      movieList[movieNumber].length;
    document.querySelector("#director").textContent =
      movieList[movieNumber].director;
    document.querySelector("#screenwriter").textContent =
      movieList[movieNumber].writers.screenplay;
    document
      .querySelector("#poster")
      .setAttribute("xlink:href", `images/${movieList[movieNumber].poster}`);
  }
}
