//Using JSCalcment v2.3 Helluy 2020

var boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 0,
    pTemps = document.getElementById("temps"),
    lienSuite = document.getElementById("lienSuite"),
    jeuEnCours = true,
    listeCalculs = [
        new CalculRep("","Zone Zvv1vv :","+"),
        new CalculRep("","","+"),
        new CalculRep("","Zone Zvv2vv :","-"),
        new CalculRep("","","+"),
        new CalculRep("","Zone Zvv3vv :","-"),
        new CalculRep("","","-"),
        new CalculRep("","Zone Zvv4vv :","+"),
        new CalculRep("","","-")
    ];

for (var o = 0, k = listeCalculs.length ; o < k ; o ++){
    listeCalculs[o].transformRadios("Signe " + (o % 2 == 0 ? "abscisse" : "ordonnée") + " :",["+","-"]);
    if (o % 2 == 0){
        listeCalculs[o].elements.tdLabel.rowSpan = "2";
        listeCalculs[o+1].elements.tdLabel.parentNode.removeChild(listeCalculs[o+1].elements.tdLabel);
    }
}

boutonFin.addEventListener("click", function (e) {
    if (jeuEnCours) {
        var firstError;
        for (var i = 0; i < listeCalculs.length; i++) {
            if (listeCalculs[i].areErrors()) {
                if (typeof firstError == "undefined") {
                    firstError = i;
                }
            }
        }
        if (typeof firstError != "undefined") {
            listeCalculs[firstError].elements.inputs[0].focus()
        }

    }
    if (typeof firstError == "undefined") {
        var listeJF = 0; //nombre de réponses justes
        for (var i = 0; i < listeCalculs.length; i++) {
            listeJF += listeCalculs[i].isCorrect() ? 1 : 0;
        }
        score = Math.round(listeJF / listeCalculs.length * 100);
        pScore.textContent = "Votre score est " + score + "%";
        if (score == 100){
            lienSuite.style.display = "block";
        } else {
            pScore.innerHTML += "<br/><span style='color:red;'>Il reste des erreurs ! Corrige-les et clique à nouveau sur \"Terminer\" pour accéder à la suite !</span>";
        }
        timerON = false;
    }
});

document.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
        document.activeElement.blur();
        boutonFin.click();
    }
});

setInterval(function () {
    if (timerON) {
        temps++;
        pTemps.textContent = "Votre temps : " + temps + " secondes"
        // if (temps <= 0) {
        //     document.activeElement.blur()
        //     pTemps.textContent = "Le temps est écoulé !";
        //     pTemps.style.color = "red";
        //     listeInput = document.getElementsByTagName("input");
        //     //On empêche la modification des réponses
        //     for (i = 0; i < listeInput.length; i++) {
        //         listeInput[i].disabled = true;
        //     }
        //     timerON = false;
        //     if (jeuEnCours) {
        //         confirm("Le temps est écoulé !");
        //     }
        //     jeuEnCours = false;
        //     boutonFin.click()
        // }
    }
}, 1000);