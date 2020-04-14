//Using JSCalcment v2.1 Helluy 2020

var boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 540,
    pTemps = document.getElementById("temps"),
    jeuEnCours = true,
    listeCalculs = [
        new CalculRep("")
    ];

listeCalculs[15].transformRadios("Ces figures ont le même périmètre.", ["Vrai", "Faux"]);
listeCalculs[16].transformRadios("Ces figures ont la même aire.", ["Vrai", "Faux"]);
listeCalculs[19].transformRadios("La hauteur d'une table est :", ["80 cm", "80 dm", "80 m"]);


listeCalculs[15].elements.tdLabel.rowSpan = "2";
listeCalculs[16].elements.tdLabel.parentNode.removeChild(listeCalculs[16].elements.tdLabel);


pTemps.textContent = "Vous avez " + Math.floor(temps / 60) + " minutes pour tout compléter !";

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
        pScore.textContent = "Votre score est " + arrondi(listeJF / listeCalculs.length * 30) + "/30";
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
        temps--;
        pTemps.textContent = "Il vous reste " + Math.floor(temps / 60) + " minutes et " + temps % 60 + " secondes."
        if (temps <= 0) {
            document.activeElement.blur()
            pTemps.textContent = "Le temps est écoulé !";
            pTemps.style.color = "red";
            listeInput = document.getElementsByTagName("input");
            //On empêche la modification des réponses
            for (i = 0; i < listeInput.length; i++) {
                listeInput[i].disabled = true;
            }
            timerON = false;
            if (jeuEnCours) {
                confirm("Le temps est écoulé !");
            }
            jeuEnCours = false;
            boutonFin.click()
        }
    }
}, 1000);