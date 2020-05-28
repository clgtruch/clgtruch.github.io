//Using JSCalcment v2.5 Helluy 2020

var boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 0,
    pTemps = document.getElementById("temps"),
    jeuEnCours = true,
    listeCalculs = [
        new CalculRep("","En déduire la mesure en degrés :<br>- d'un angle plat","180"),
        new CalculRep("","- d'un angle droit","90"),
        new CalculRep("","- d'un angle nul","0"),
        new CalculRep("","La mesure d’un angle aigu est comprise entre .....° et .....°",["0","90"]),
        new CalculRep("","La mesure d’un angle obtus est comprise entre .....° et ......°",["90","180"])
    ]




newtr = document.createElement("tr");
newtr.style.borderTop = "solid 1px black";
newtr.innerHTML = "<td colspan='1'><p>Que peut-on en déduire pour la mesure d’un angle aigu ? et celle d’un angle obtus ?</p></td><td></td>";
listeCalculs[3].elements.tr.parentNode.insertBefore(newtr,listeCalculs[3].elements.tr);
listeCalculs[4].elements.inputs[0].parentNode.insertBefore(document.createElement("hr"),listeCalculs[4].elements.inputs[0]);
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