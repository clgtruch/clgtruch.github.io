//Using JSCalcment v2.5 Helluy 2020

var boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 0,
    pTemps = document.getElementById("temps"),
    jeuEnCours = true,
    listeCalculs = [
        new CalculRep("","Combien pèsent neuf pains de 0,340 kg ?","9 × 0,340"),
        new CalculRep("","Quelle est la somme de 8 termes égaux à 4,3 ?","8 × 4,3"),
        new CalculRep("","Combien coûtent 3,2 kg d’abricots à 2,70 € le kilogramme ?","3,2 × 2,7"),
        new CalculRep("","Quel est le nombre qui ajouté à 4,67 donne 13 ?","13 - 4,67"),
        new CalculRep("","Je raccourcis de 2,3 cm un segment et j’obtiens un segment de 8,9 cm$.$<br> Combien mesurait le segment de départ ?","8,9 + 2,3"),
        new CalculRep("","17 boîtes de conserves identiques pèsent ensemble 5 950 g$.$<br> Combien pèse une boîte ?","5 950 : 17"),
        new CalculRep("","Quel est le nombre qui multiplié par 5 donne 14 ?","14 : 5")
    ];

listeCalculs[0].transformRadios("",["9 + 0,340","9 × 0,340","9 - 0,340","9 : 0,340"]);
listeCalculs[1].transformRadios("",["8 + 4,3","8 × 4,3","8 - 4,3","8 : 4,3"]);
listeCalculs[2].transformRadios("",["3,2 + 2,7","3,2 × 2,7","3,2 - 2,7","3,2 : 2,7"]);
listeCalculs[3].transformRadios("",["13 + 4,67","13 × 4,67","13 - 4,67","13 : 4,67"]);
listeCalculs[4].transformRadios("",["8,9 + 2,3","8,9 × 2,3","8,9 - 2,3","8,9 : 2,3"]);
listeCalculs[5].transformRadios("",["5 950 + 17","5 950 × 17","5 950 - 17","5 950 : 17"]);
listeCalculs[6].transformRadios("",["14 + 5","14 × 5","14 - 5","14 : 5"]);
////////////////

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