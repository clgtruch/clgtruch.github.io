//Using JSCalcment v2.3 Helluy 2020

var boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 0,
    pTemps = document.getElementById("temps"),
    lienSuite = document.getElementById("lienSuite"),
    jeuEnCours = true,
    listeCalculs = [
        new CalculRep("","Données :<br>(dvv3vv)$/$$/$(dvv4vv)<br>(dvv3vv)$/$$/$(dvv5vv)<br>Figure :<br>i$1",/^si\s+deux\s+droites\s+sont\s+parall[eè]les\s+[àa]\s+(?:une|la)\s+m[eê]me\s+troisi[èe]me\s+droite[,\s]+alors\s+elles\s+sont\s+parall[èe]les\s+entre[-\s]+elles\.?$/i),
        new CalculRep("","Données :<br>(dvv1vv)⊥(dvv2vv)<br>(dvv1vv)$/$$/$(dvv3vv)<br>Figure :<br>i$2",/^si\s+deux\s+droites\s+sont\s+parall[èe]les\s+et\s+si\s+une\s+troisi[èe]me\s+droite\s+est\s+perpendiculaire\s+[àa]\s+l[\s']+une[,\s]+alors\s+elle\s+est\s+perpendiculaire\s+[aà]\s+l[\s']+autre\.?$/i),
        new CalculRep("","Données :<br>(AB)⊥(AC)<br>(AB)⊥(BE)<br>Figure :<br>i$3",/^si\s+deux\s+droites\s+sont\s+perpendiculaires\s+[àa]\s+(?:une|la)\s+m[êe]me\s+troisi[eè]me\s+droite[,\s]+alors\s+elles\s+sont\s+parall[èe]les\s+entre[-\s]+elles\.?$/i)
    ];

var tdinp = document.querySelectorAll(".tdinput"),
    textar = document.querySelectorAll("textarea");

for (var i = 0, c = tdinp.length ; i < c ; i++){
    console.log("ouo")
    textar[i].style.height = tdinp[i].offsetHeight + "px";
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
        timerON = false;
    }
});

document.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
        document.activeElement.blur();
        boutonFin.click();
    }
});

// setInterval(function () {
//     if (timerON) {
//         temps++;
//         pTemps.textContent = "Votre temps : " + temps + " secondes"
//         // if (temps <= 0) {
//         //     document.activeElement.blur()
//         //     pTemps.textContent = "Le temps est écoulé !";
//         //     pTemps.style.color = "red";
//         //     listeInput = document.getElementsByTagName("input");
//         //     //On empêche la modification des réponses
//         //     for (i = 0; i < listeInput.length; i++) {
//         //         listeInput[i].disabled = true;
//         //     }
//         //     timerON = false;
//         //     if (jeuEnCours) {
//         //         confirm("Le temps est écoulé !");
//         //     }
//         //     jeuEnCours = false;
//         //     boutonFin.click()
//         // }
//     }
// }, 1000);