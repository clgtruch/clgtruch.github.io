//Using JSCalcment v2.3 Helluy 2020

var boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 0,
    pTemps = document.getElementById("temps"),
    lienSuite = document.getElementById("lienSuite"),
    jeuEnCours = true,
    listeCalculs = [
        new CalculRep("","a) L'.... d'un repère est le seul point",/^origine$/i),
        new CalculRep("","dont les .... sont égales à zéro$.$",/^coordonn[ée]e*s*$/i),
        new CalculRep("","b) Tous les points situés au dessus de l'... des abscisses",/^axe$/i),
        new CalculRep("","ont une ordonnée ... et ceux",/^positive$/i),
        new CalculRep("","situés au-dessous, une ordonnée ...",/^n[ée]gative\.?$/i),
        new CalculRep("","c) Tous les points situés à gauche de l'... des ordonnées",/^axe$/i),
        new CalculRep("","ont une ... négative",/^abscisse$/i),
        new CalculRep("","et ceux situés à droite, une .... positive$.$",/^abscisse$/i),
        new CalculRep("","d) Tous les points de l'axe des ... ont une abscisse égale à zéro$.$",/^ordonn[ée]es*$/i),
        new CalculRep("","e) Tous les points de l'axe des ... ont une ordonnée égale à zéro$.$",
        /^abscisses*$/i)
    ];

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