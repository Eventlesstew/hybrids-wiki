document.addEventListener('DOMContentLoaded', ()=>{ /*How to trigger code.*/
    generateProfiles()
})


function generateProfiles() {
    let cubePages = document.body.getElementsByClassName("prev");

    for (i = 0; i < cubePages.length; i++) {
        createProfile(cubePages[i])
    }

    setInterval(randElement, 100)
}

/* CHANGE THE PROCESS TO THE FOLLOWING:
    Instead of RandElementDisplay, make it so all elements marked to show random elements have the class "Hidden Element" instead.
*/

async function initiateRandElement(randElementDisplay) {
    /* let parser = new DOMParser();

    const response = await fetch(dir);
    let file = await response.text();
    
    console.log(file)
    let imageFiles = parser.parseFromString(file, "text/html");
    const imageSource = imageFiles.getElementsByTagName("a");
    
    for (i = 0; i < elementDirs.length; i++) {
        let imageDir = dir + elementDirs[i] + ".png";
        elementDirArray.push(imageDir);
    }*/

    const elementDirs = [
        "A Bulb",
        "A Clay",
        "A Hostess",
        "A Signal",
        "A Trash",
        "GL Energy",
        "GL Flame",
        "GL Gloom",
        "GL Grass",
        "GL Ground",
        "GL Remnant",
        "GL Scrap",
        "GL Sea",
        "GL Shiver",
        "GL Sweets",
        "M Autumn",
        "M Galaxy",
        "M Spirit",
        "M Storm",
        "M Warmth",
        "MSM Air",
        "MSM Anniversary Month",
        "MSM Beat Hereafter",
        "MSM Bone",
        "MSM Celestial",
        "MSM Cloverspell",
        "MSM Cold",
        "MSM Control",
        "MSM Crescendo Moon",
        "MSM Crystal",
        "MSM Dipster",
        "MSM Dreamythical",
        "MSM Earth",
        "MSM Echoes of Eco",
        "MSM Eggy",
        "MSM Faerie",
        "MSM Feast Ember",
        "MSM Fire",
        "MSM Gold",
        "MSM Hoax",
        "MSM Legendary",
        "MSM Life Formula",
        "MSM Light",
        "MSM Love",
        "MSM Mech",
        "MSM Mindboggle",
        "MSM Mythical",
        "MSM Paironormal",
        "MSM Perplexpore",
        "MSM Plant",
        "MSM Plasma",
        "MSM Poison",
        "MSM Primordial Plant",
        "MSM Psychic",
        "MSM Shadow",
        "MSM SkyPainting",
        "MSM Spooktacle",
        "MSM Summer",
        "MSM Supernatural",
        "MSM Water",
        "MSM Yay",
        "RV Cyber",
        "RV Easter",
        "RV Galacto",
        "RV Gemstone",
        "RV Illusion",
        "RV Mysterious",
        "RV Nimbus",
        "RV Party",
        "RV Shock",
        "RV Spark",
        "RV Summer",
        "RV Void",
        "T Ember",
        "T Nautical",
        "T Overdrive",
        "T Spirit",
        "T Vegetation",
        "T Nonsense",
        "T Rot",
        "T Rebirth",
        "T Permafrost",
        "T Explosive"
    ];

    let newClass = document.createAttribute("class");
    newClass.value = "monsterElementRand";
    randElementDisplay.setAttributeNode(newClass);
    
    for (i = 0; i < elementDirs.length; i++) {
        let elementElement = document.createElement("img");
        let elementAttribute = document.createAttribute("src");

        elementAttribute.value = "/hybrids-wiki/images/elements/" + elementDirs[i] + ".png";

        elementElement.setAttributeNode(elementAttribute);
        elementElement.style.display = "none";

        randElementDisplay.appendChild(elementElement);
    }        
}

function randElement() {
    const RandelementDisplay = document.getElementsByClassName("monsterElementRand");

    for (p = 0; p < RandelementDisplay.length; p++) {
        let elementDisplay = RandelementDisplay[p].getElementsByTagName("img");

        const randValueCount = Math.ceil(Math.random() * 7);
        let randValues = [];
        
        for (i = 0; i < randValueCount; i++) {
            const value = Math.floor(Math.random() * elementDisplay.length);
            randValues.push(value); 
        }

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

    const response = await fetch("/hybrids-wiki/articles/categories/characters.json");
    const file = await response.json();
    const details = file[element.id]

    let cubeTitle = item.getElementsByClassName("cubeTitle")[0];
    cubeTitle.textContent = details["name"];
    cubeTitle.href = "/hybrids-wiki/articles/monsters/" + details["article"] + ".html";

    if (details["dominant-class"] == "MSM") {
        cubeTitle.style = "font-family:HogB;";
    } else if (details["dominant-class"] == "Grasslanders") {
        cubeTitle.style = "font-family:'Comic Sans';";
    } else if (details["dominant-class"] == "Ameliorates") {
        cubeTitle.style = "font-family:Helevetica;";
    }

    item.getElementsByClassName("cubeIcon")[0].src = "/hybrids-wiki/images/hybrids/" + details["icon"] + ".png";

    let monsterElement = item.getElementsByClassName("monsterElementList")[0];

    if (details["elements"] == "inconclusive") {
        initiateRandElement(monsterElement)
    } else {
        for (i = 0; i < details["elements"].length; i++) {
            let elementElement = document.createElement("img");
            let elementAttribute = document.createAttribute("src");
            elementAttribute.value = "/hybrids-wiki/images/elements/" + details["elements"][i] + ".png";
            elementElement.setAttributeNode(elementAttribute)
            monsterElement.appendChild(elementElement)
        }
    };

    element.appendChild(item);
}