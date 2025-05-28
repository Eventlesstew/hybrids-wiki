document.addEventListener('DOMContentLoaded', ()=>{ /*How to trigger code.*/
    generateProfiles()
})

function generateProfiles() {
    let cubePages = document.body.getElementsByClassName("prev");

    for (i = 0; i < cubePages.length; i++) {
        createProfile(cubePages[i])
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
        /*TODO - Have a function loop every frame when triggered to rapidly blip between Filler's elements.*/

        /*let elementScript = document.createElement("script");

        let elementSource = document.createAttribute("src");
        elementSource.value = "/articles/categories/inconclusiveElement.js"
        elementScript.setAttributeNode(elementSource)

        let elementType = document.createAttribute("type");
        elementType.value = "text/javascript"
        elementScript.setAttributeNode(elementType)

        monsterElement.appendChild(elementScript)*/
    } else {
        for (i = 0; i < details["elements"].length; i++) {
            let elementElement = document.createElement("img");
            let elementAttribute = document.createAttribute("src");
            elementAttribute.value = "/images/elements/" + details["elements"][i] + ".png";
            elementElement.setAttributeNode(elementAttribute)
            let elementClass = document.createAttribute("class");
            elementClass.value = "monsterElement";
            elementElement.setAttributeNode(elementClass)
            monsterElement.appendChild(elementElement)
        }
    };

    element.appendChild(item);
}