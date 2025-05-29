let inconclusiveElementDisplay = [];
let elementImages = [];

document.addEventListener('DOMContentLoaded', ()=>{ /*How to trigger code.*/
    generateProfiles()
        .then(initiateRandElement());
})


function generateProfiles() {
    let cubePages = document.body.getElementsByClassName("prev");

    for (i = 0; i < cubePages.length; i++) {
        createProfile(cubePages[i])
    }
}

/* CHANGE THE PROCESS TO THE FOLLOWING:
    initiateInconclusiveElement gathers all of the element files and converts them into their own image elements.

    inconclusiveElement starts by appending all of the prexisting element files back to the main,
    then it appends a random assortment of elements into the element area.
*/
async function initiateRandElement() {
    let parser = new DOMParser();

    const response = await fetch("/images/elements");
    let file = await response.text();
    let imageFiles = parser.parseFromString(file, "text/html");
    const imageSource = imageFiles.getElementsByTagName("a");

    for (i = 0; i < imageSource.length; i++) {
        let elementElement = document.createElement("img");
        let elementAttribute = document.createAttribute("src");
        elementAttribute.value = elementImages[imageSource[i].href];
        elementElement.setAttributeNode(elementAttribute);
        elementImages.push(elementElement);
    }

    setInterval(initiateRandElement, 100)
}

function randElement() {
    for (p = 0; p < inconclusiveElementDisplay.length; p++) {
        let elementDisplay = inconclusiveElementDisplay[p];

        let IEcount = Math.round(Math.random() * 6 + 1);

        for (i = 0; i < elementDisplay.getElementsByTagName("img"); i++) {
            elementDisplay.appendChild(elementElement);
        } 

        for (i = 0; i < IEcount; i++) {
            elementDisplay.appendChild(elementElement);
        }   
    }
}

async function createProfile(element) {
    const template = document.getElementsByTagName("template")[0].content.querySelector("div");
    const item = document.importNode(template, true);

    const response = await fetch("/articles/categories/characters.json");
    const file = await response.json();
    const details = file[element.id]

    let cubeTitle = item.getElementsByClassName("cubeTitle")[0];
    cubeTitle.textContent = details["name"];
    cubeTitle.href = "/articles/cubes/" + details["article"] + ".html";
    item.getElementsByClassName("cubeIcon")[0].src = "/images/hybrids/" + details["icon"] + ".png";

    let monsterElement = item.getElementsByClassName("monsterElementList")[0];

    if (details["elements"] == "inconclusive") {
        inconclusiveElementDisplay.push(monsterElement)
    } else {
        for (i = 0; i < details["elements"].length; i++) {
            let elementElement = document.createElement("img");
            let elementAttribute = document.createAttribute("src");
            elementAttribute.value = "/images/elements/" + details["elements"][i] + ".png";
            elementElement.setAttributeNode(elementAttribute)
            monsterElement.appendChild(elementElement)
        }
    };

    element.appendChild(item);
}