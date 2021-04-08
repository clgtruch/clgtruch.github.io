$(function(){
    let answ = "bc";
    localStorage["math-qflash1-q6"] = "";
    $("input.resp").focus(function(){
        EXglobals.chrono = true;
    });
    $("button").click(function(i,v){
        let resps = "";
        $("input.resp").each(function(i,v){
            if ($(v).prop("checked")){
                resps += $(v).attr("id");
            }
        });
        if (resps == answ){
            $("#answers").css("background","rgba(0, 255, 0, 0.514)");
            EXglobals.chrono = false;
            $("#suite").show();
            if (!localStorage["math-qflash1-q6"]){
                localStorage["math-qflash1"] = parseInt(localStorage["math-qflash1"]) + 1;
                localStorage["math-qflash1-q6"] = "true";
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