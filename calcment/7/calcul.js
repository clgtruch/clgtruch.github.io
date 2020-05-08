//Using JSCalcment v2.5 Helluy 2020

var boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 0,
    pTemps = document.getElementById("temps"),
    jeuEnCours = true,
    listeCalculs = [
        new CalculRep("","Division euclidienne de 65 par 9",["7","2"]),
        new CalculRep("","Division euclidienne de 40 par 8",["5","0"]),
        new CalculRep("","Division euclidienne de 28 par 4",["7","0"]),
        new CalculRep("","Division euclidienne de 13 par 13",["1","0"]),
        new CalculRep("","Division euclidienne de 9 par 12",["0","9"])
    ]

for (var i = 0, c = listeCalculs.length ; i < c ; i++){
    listeCalculs[i].addLabel(0,"Q:");
    listeCalculs[i].addLabel(1,"R:");
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