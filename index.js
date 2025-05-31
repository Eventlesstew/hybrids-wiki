document.addEventListener('DOMContentLoaded', ()=>{ /*How to trigger code.*/
    addHeader();
})

async function addHeader() {
    const response = await fetch("/hybrids-wiki/components/header.html");
    let file = await response.text();

    let parser = new DOMParser();
    let header = parser.parseFromString(file, "text/html");

    let headerTitle = header.getElementsByClassName("headerTitle")[0];
    headerTitle.textContent;

    let item = header.body.getElementsByTagName("div");
    for (i = item.length - 1; i > -1; i--) {
        document.body.prepend(item[i]);
    }
}