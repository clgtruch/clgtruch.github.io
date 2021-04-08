$(function(){
    localStorage["math-qflash1"] = 0;
    localStorage["math-qflash1-q1"] = "";
    let answ = 3.;
    $("#resp").focus(function(){
        EXglobals.chrono = true;
    });
    $("button").click(function(i,v){
        if (parseFloat($("#resp").val().replace(/\s/g,"")) == answ){
            $("#resp").css("background","rgba(0, 255, 0, 0.514)");
            EXglobals.chrono = false;
            if (!localStorage["math-qflash1-q1"]){
                localStorage["math-qflash1"] = parseInt(localStorage["math-qflash1"]) + 1;
                localStorage["math-qflash1-q1"] = "true";
            }
            $("#suite").show();
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