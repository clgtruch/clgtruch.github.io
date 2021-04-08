var EXglobals = {chrono: true}
$(function(){
    let tempsDiv = $("#temps");
    setInterval(function(){
        if (EXglobals.chrono){
            tempsDiv.text(parseInt(tempsDiv.text()) - 1);
            if (parseInt(tempsDiv.text()) <= 0){
                /\/quest([0-9]+)/.test(location.href);
                location.href = location.href.replace(/\/quest[0-9]+/,"/quest" + (parseInt(RegExp.$1) + 1));
            }
        }
            
    },1000)
});