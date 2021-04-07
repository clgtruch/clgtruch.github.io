let h1 = document.querySelector("h1"),
    title = document.querySelector("title"),
    nb = location.search.replace(/\?nb=([0-9]+)[\S\s]*/,"$1");

if (nb != ""){
    h1.textContent = h1.textContent.replace(/[0-9]+/,nb);
    title.textContent = h1.textContent.replace(/[0-9]+/,nb);
}