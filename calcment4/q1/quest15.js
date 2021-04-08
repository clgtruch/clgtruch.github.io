$(function(){
    let answ = /^0*5([,\.]0*)?\/0*12([,\.]0*)?$/;
    localStorage["math-qflash1-q15"] = "";
    $("#resp").focus(function(){
        EXglobals.chrono = true;
    });
    $("button").click(function(i,v){
        if (answ.test($("#resp").val().replace(/\s/g,""))){
            $("#resp").css("background","rgba(0, 255, 0, 0.514)");
            EXglobals.chrono = false;
            $("#suite").show();
            if (!localStorage["math-qflash1-q15"]){
                localStorage["math-qflash1"] = parseInt(localStorage["math-qflash1"]) + 1;
                localStorage["math-qflash1-q15"] = "true";
            }
        } else {
            $("#resp").css("background","rgba(255, 100, 100, 0.534)");
        }
    });
    $(document).keydown(function (e) { 
        if (e.keyCode == 13){
            $("button").trigger("click");
            $("#resp").trigger("blur");
        }    
    });
});