$(function(){
    let answ = [/^0*5([,\.]0*)?$/,/^0*6([,\.]0*)?$/];
    localStorage["math-qflash1-q9"] = "";
    $(".resp").focus(function(){
        EXglobals.chrono = true;
    });
    $("button").click(function(i,v){
        if (answ[0].test($("#resp1").val().replace(/\s/g,"")) && answ[1].test($("#resp2").val().replace(/\s/g,""))){
            $(".flex").css("background","rgba(0, 255, 0, 0.514)");
            EXglobals.chrono = false;
            $("#suite").show();
            if (!localStorage["math-qflash1-q9"]){
                localStorage["math-qflash1"] = parseInt(localStorage["math-qflash1"]) + 1;
                localStorage["math-qflash1-q9"] = "true";
            }
        } else {
            $(".flex").css("background","rgba(255, 100, 100, 0.534)");
        }
    });
    $(document).keydown(function (e) { 
        if (e.keyCode == 13){
            $("button").trigger("click");
            $("#resp").trigger("blur");
        }    
    });
});