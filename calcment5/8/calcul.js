//Using JSCalcment v2.6 Helluy 2020

var boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 0,
    pTemps = document.getElementById("temps"),
    jeuEnCours = true,
    listeCalculs = [
        new CalculRep("-13 - 13"),
        new CalculRep("-5 - 6 + 13"),
        new CalculRep("27 - 13 - 15"),
        new CalculRep("-2 - 23 - 33"),
        new CalculRep("!1//2! + !3//4!"),
        new CalculRep("13.5 * 5"),
        new CalculRep("","2% de 48","0.96"),
        new CalculRep("0.3 * 0.3")
    ]

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
        pScore.textContent = "Votre score est " + Math.round(listeJF / listeCalculs.length * 100) + "%";
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