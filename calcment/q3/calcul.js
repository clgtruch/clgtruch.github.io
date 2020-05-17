//Using JSCalcment v2.5 Helluy 2020

var boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 0,
    pTemps = document.getElementById("temps"),
    jeuEnCours = true,
    listeCalculs = [
        new CalculRep("","Un multiple de 3 supérieur à 100 :",["0"]),
        new CalculRep("","Un diviseur de 325 supérieur à 1 :",["0"]),
        new CalculRep("","Le reste de la division euclidienne de 15 par 4 :",["3"]),
        new CalculRep("","Le nombre compris entre 20 et 30 qui est divisible par 9 :",["27"]),
        new CalculRep("","Un multiple de 4 supérieur à 3333 :",["0"]),
        new CalculRep("","Le plus grand multiple de 7 inférieur à 48 :",["42"]),
        new CalculRep("","Le plus grand multiple de 61 inférieur à 75 :",["61"])
    ];

listeCalculs[0].isCorrect = function(autoset=true){
    if (parseFloat(this.elements.inputs[0].value.replace(/ /g,"")) % 3 == 0 && parseFloat(this.elements.inputs[0].value.replace(/ /g,"")) > 100){
        if (autoset){
            this.setCorriger(true);
        }
        return true;
    } else {
        if (autoset){
            this.setCorriger(false);
        }
        return false;
    }
}

listeCalculs[1].isCorrect = function(autoset=true){
    if (325 % parseFloat(this.elements.inputs[0].value.replace(/ /g,"")) == 0 && parseFloat(this.elements.inputs[0].value.replace(/ /g,"")) > 1){
        if (autoset){
            this.setCorriger(true);
        }
        return true;
    } else {
        if (autoset){
            this.setCorriger(false);
        }
        return false;
    }
}

listeCalculs[4].isCorrect = function(autoset=true){
    if (parseFloat(this.elements.inputs[0].value.replace(/ /g,"")) % 4 == 0 && parseFloat(this.elements.inputs[0].value.replace(/ /g,"")) > 3333){
        if (autoset){
            this.setCorriger(true);
        }
        return true;
    } else {
        if (autoset){
            this.setCorriger(false);
        }
        return false;
    }
}

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