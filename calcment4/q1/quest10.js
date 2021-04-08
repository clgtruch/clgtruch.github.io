$(function () {
    let answ = "cab";
    localStorage["math-qflash1-q10"] = "";
    $(".etiq").focus(function () {
        EXglobals.chrono = true;
    });
    $(".etiq").mousedown(function (e) {
        if (this.parentNode == $("#etiquettes").get()[0]) {
            $("#reponse").get()[0].appendChild(this.parentNode.removeChild(this));
        } else {
            $("#etiquettes").get()[0].appendChild(this.parentNode.removeChild(this));
        }

    });

    $("button").click(function (i, v) {
        let resp = "";
        $("#reponse .etiq").each(function (i, v) {
            resp += $(v).attr("id");
        });
        if (answ == resp) {
            $("#reponse").css("background", "rgba(0, 255, 0, 0.514)");
            EXglobals.chrono = false;
            $("#suite").show();
            if (!localStorage["math-qflash1-q10"]){
                localStorage["math-qflash1"] = parseInt(localStorage["math-qflash1"]) + 1;
                localStorage["math-qflash1-q10"] = "true";
            }
        } else {
            $("#reponse").css("background", "rgba(255, 100, 100, 0.534)");
        }
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 13) {
            $("button").trigger("click");
            $("#resp").trigger("blur");
        }
    });
});