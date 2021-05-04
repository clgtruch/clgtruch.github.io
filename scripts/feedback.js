$(function(){
    var cooldown = 0;
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
    if (args().localhost === "true"){
        var IP = "http://localhost:6710";
    } else {
        var IP = "https://singalong-game.com:6710";
    }
    if (typeof args().prenom !== "undefined" && typeof args().nom !== "undefined"){
        localStorage["clgtruch-nom"] = args().prenom + " " + args().nom;
        let newsearch = location.search.replace(/\?/g,"&").replace(/&(?:nom|prenom)=\S*/g,"").replace(/&/,"?");
        location.search = newsearch === "?" ? "" : newsearch;
    }

    let listeCalc = listeCalculs;
    $("#fin").click(function(){
        if (new Date().getTime() - cooldown < 3000){
            $("#fin").after("<p id='feedback_error' style='color:red;'>Le bouton ne doit pas être martelé. Attendez quelques secondes puis recliquez dessus pour envoyer vos réponses.</p>");
            return 1;
        } else {
            $("#feedback_error").hide();
        }
        cooldown = new Date().getTime();
        let errors = false;
        for (let i = 0, c = listeCalc.length ; i < c ; ++i){
            if (listeCalc[i].areErrors(false)){
                errors = true;
                break;
            }
        }
        if (!errors && typeof localStorage["clgtruch-nom"] !== "undefined"){
            let score = 0;
            let dic = [],
                reqData = {
                    nom: localStorage["clgtruch-nom"]
                };
            for (let i = 0, c = listeCalc.length ; i < c ; ++i){
                var correct = listeCalc[i].isCorrect(false) ? 1 : 0;
                score += correct;
                dic.push({
                    "q_nb": i+1,
                    "correct": correct
                });
                let resp = [];
                for (let j = 0, d = listeCalc[i].elements.inputs.length ; j < d ; ++j){
                    resp.push($(listeCalc[i].elements.inputs[j]).val().replace(/,/g,"."));
                }
                resp = resp.join(" ; ");
                if (/^\s;\s$/.test(resp)){
                    resp = "";
                }
                dic[i].resp = resp;
            }
            reqData.score = score;
            reqData.temps = temps;
            reqData.exId = clgtruch_exId;
            reqData.results = dic;
            let toSend = JSON.stringify(reqData);
            if (toSend !== sessionStorage["clgtruch-lastSend"]){
                $.ajax({
                    type: "POST",
                    url: IP + "/app",
                    data: {data:toSend},
                    success: function (response) {
                        console.log(response);
                        sessionStorage["clgtruch-lastSend"] = toSend;
    
                    }
                });
            }
            
        }
            
    });
})