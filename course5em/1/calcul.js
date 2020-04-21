//Using JSCalcment v2.2 Helluy 2020

var boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 540,
    pTemps = document.getElementById("temps"),
    jeuEnCours = true,
    listeCalculs = [
        new CalculRep("9*5"),
        new CalculRep("100-27"),
        new CalculRep("","Départ: 13h40<br>Arrivée: 15h17<br>Quelle est la durée du trajet ?","1:37","heure"),
        new CalculRep("","0.4 km = ....m","400"),
        new CalculRep("","!3//4! de 20","15"),
        new CalculRep("0.12 + 0.3"),
        new CalculRep("","i$7<br>Aire de la figure 1 = ........ unités d'aire","31"),
        new CalculRep("","6 brioches coûtent 15€$.$<br>9 brioches coûtent ....€$.$","22.5"),
        new CalculRep("!15//10 000!","<br><br><em>(Donner l'écriture décimale)<$/$em>"),
        new CalculRep("","25% de 16","4"),
        new CalculRep("","Compléter avec une écriture décimale : <br>i$11","1.25"),
        new CalculRep("29 - 9 * 2"),
        new CalculRep("","i$13<br> Le volume en litres de ce pavé droit est ..... L$.$","24000"),
        new CalculRep("","2.5 h =","2:30","heure"),
        new CalculRep("12 * 99 + 12"),
        new CalculRep("","i$16<br>? = ...... cm","7.5"),
        new CalculRep("!15//2!","<br><br><em>(Donner l'écriture décimale)<$/$em>"),
        new CalculRep("","L'arrondi, au dixième, du périmètre de ce cercle est .... cm$.$<br>i$18","31.4"),
        new CalculRep("","Dans un bouquet de 50 fleurs, il y a 12 roses.<br>\
        Donner le pourcentage de roses ?","24"),
        new CalculRep("","Dans !1//3!, combien de fois !1//6! ?","2"),
        new CalculRep("","Compléter :<br>i$21","3.08"),
        new CalculRep("","10% de 75","7.5"),
        new CalculRep("","i$23<br>Le périmètre de ce rectangle est ...... cm$.$","14"),
        new CalculRep("12*2.5"),
        new CalculRep("3.8+!2//100!","<br><br><em>(Donner l'écriture décimale)<$/$em>"),
        new CalculRep("","!1//2! + ... = 0.62","0.12"),
        new CalculRep("","1 kg de pommes coûte 2,50 €$.$<br>\
        200g de pommes coûtent ... €$.$","0.5"),
        new CalculRep("","Recopier le plus grand nombre :<br>\
        <br>!7//3! | !9//4! | !11//13!<br><br>\
        <em>Rappel : utiliser $/$ pour la barre de fraction <$/$em>","7/3"),
        new CalculRep("","Un véhicule se déplace à 80 km$/$h$.$<br>\
        En 1 h 15 min, il parcourt ...... km$.$","100"),
        new CalculRep("","Donner l'aire, en cm², de la figure représentée sur papier millimétré$.$<br>\
        i$30","3.16")
    ];


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
        pScore.textContent = "Votre score est " + Math.round(listeJF / listeCalculs.length * 30) + "/30";
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