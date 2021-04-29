let h1 = document.querySelector("h1"),
    title = document.querySelector("title");

    function args() {
        var pairs = window.location.search.substring(1).split("&"),
          obj = {},
          pair,
          i;
      
        for ( i in pairs ) {
          if ( pairs[i] === "" ) continue;
      
          pair = pairs[i].split("=");
          obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
        }
      
        return obj;
      }
let nb = typeof args().nb !== "undefined" ? args().nb : "";

if (nb != ""){
    h1.textContent = h1.textContent.replace(/[0-9]+/,nb);
    title.textContent = h1.textContent.replace(/[0-9]+/,nb);
}