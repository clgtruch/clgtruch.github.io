$(function(){
    let answ = false;
    localStorage["math-qflash1-q4"] = "";
    $("input[name='vf']").focus(function(){
        EXglobals.chrono = true;
    });
    $("button").click(function(i,v){
        if ($("input[name='vf']:checked").attr("id") == (answ ? "Vrai": "Faux")){
            $("#answers").css("background","rgba(0, 255, 0, 0.514)");
            EXglobals.chrono = false;
            $("#suite").show();
            if (!localStorage["math-qflash1-q4"]){
                localStorage["math-qflash1"] = parseInt(localStorage["math-qflash1"]) + 1;
                localStorage["math-qflash1-q4"] = "true";
            }
        } else {
            $("#answers").css("background","rgba(255, 100, 100, 0.534)");
        }
    });
    $(document).keydown(function (e) { 
        if (e.keyCode == 13){
            $("button").trigger("click");
            $("#resp").trigger("blur");
        }    
    });
});