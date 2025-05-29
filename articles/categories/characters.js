let RandelementDisplay = [];
let elementDirArray = [];

document.addEventListener('DOMContentLoaded', ()=>{ /*How to trigger code.*/
    generateProfiles()
    initiateRandElement()
})


function generateProfiles() {
    let cubePages = document.body.getElementsByClassName("prev");

    for (i = 0; i < cubePages.length; i++) {
        createProfile(cubePages[i])
    }
}

/* CHANGE THE PROCESS TO THE FOLLOWING:
    Instead of RandElementDisplay, make it so all elements marked to show random elements have the class "Hidden Element" instead.
*/

async function initiateRandElement() {
    let parser = new DOMParser();

    const response = await fetch("/images/elements");
    let file = await response.text();
    
    let imageFiles = parser.parseFromString(file, "text/html");
    const imageSource = imageFiles.getElementsByTagName("a");
    
    for (i = 0; i < imageSource.length; i++) {
        let imageDir = "/images/elements/" + imageSource[i].getAttribute("href");
        elementDirArray.push(imageDir);
    }

    for (p = 0; p < RandelementDisplay.length; p++) {
        for (i = 0; i < elementDirArray.length; i++) {

            let elementElement = document.createElement("img");
            let elementAttribute = document.createAttribute("src");

            elementAttribute.value = elementDirArray[i]

            elementElement.setAttributeNode(elementAttribute);
            elementElement.style.display = "none";

            RandelementDisplay[p].appendChild(elementElement);
        }        
    }

    setInterval(randElement, 100)
}

function randElement() {
    
    for (p = 0; p < RandelementDisplay.length; p++) {
        let elementDisplay = RandelementDisplay[p].getElementsByTagName("img");

        const randValueCount = Math.ceil(Math.random() * 7);
        let randValues = [];
        
        for (i = 0; i < randValueCount; i++) {
            const value = Math.floor(Math.random() * elementDisplay.length);
            randValues.push(value); 
        }
        console.log(randValues)

        for (i = 0; i < elementDisplay.length; i++) {
            let result = false;

            for (j = 0; j < randValues.length; j++) {
                if (i == randValues[j]) {
                    result = true
                }
            }

            if (result) {
                elementDisplay[i].style.display = "block";
            } else {
                elementDisplay[i].style.display = "none";
            }
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
        RandelementDisplay.push(monsterElement)
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