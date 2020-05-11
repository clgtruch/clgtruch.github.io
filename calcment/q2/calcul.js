//Using JSCalcment v2.5 Helluy 2020

var boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 0,
    pTemps = document.getElementById("temps"),
    jeuEnCours = true,
    listeCalculs = [
        new CalculRep("", "Le nombre 56 est divisible par 8 car le reste de la division euclidienne de 56 par ... <br>est égal à ...", ["8", "0"]),
        new CalculRep("", "Le nombre 49 est divisible par ... car le reste <br>de la division euclidienne de ..... <br>par .... <br>est égal à ....", ["0", "0", "0", "0"]),
        new CalculRep("", "Le nombre 6 est un diviseur de ... car le reste <br>de la division euclidienne de ..... <br>par .... <br>est égal à ....", ["0", "0", "0", "0"]),
        new CalculRep("", "Le nombre 1 058 est divisible par ... <br>car son chiffre des unités est ...", ["2", "8"]),
        new CalculRep("", "Le nombre 430 est divisible par ...<br> car son chiffre des unités est ...", ["0", "0"]),
        new CalculRep("", "........ est divisible par 2, 5 et 10, <br>car son chiffre des unités est .....", ["0", "0"]),
        new CalculRep("", "......... est divisible par 5 mais pas par 2 et par 10, <br>car son chiffre des unités est .....", ["0", "0"]),
        new CalculRep("", "1218 est divisible par .... <br>car 1 + 2 + 1 + 8 = .... et 12 est divisible par 3$.$", ["3", "12"])
    ]

listeDivisChf = [0, 0, 0, 1058, 430]

listeCalculs[1].isCorrect = function (autoset = true) {
    if (49 % parseFloat(this.elements.inputs[0].value) == 0 && parseFloat(this.elements.inputs[1].value) == 49 && parseFloat(this.elements.inputs[0].value) == parseFloat(this.elements.inputs[2].value)
        && parseFloat(this.elements.inputs[3].value) == 0) {
        if (autoset) {
            this.setCorriger(true)
        }
        return true;
    } else {
        if (autoset) {
            this.setCorriger(false)
        }
        return false;
    }
}

listeCalculs[2].isCorrect = function (autoset = true) {
    if (parseFloat(this.elements.inputs[0].value) % 6 == 0 && parseFloat(this.elements.inputs[1].value) == parseFloat(this.elements.inputs[0].value) && parseFloat(this.elements.inputs[2].value) == 6
        && parseFloat(this.elements.inputs[3].value) == 0) {
        if (autoset) {
            this.setCorriger(true)
        }
        return true;
    } else {
        if (autoset) {
            this.setCorriger(false)
        }
        return false;
    }
}

listeCalculs[3].isCorrect = function(autoset=true){
    if (parseFloat(this.elements.inputs[0].value) == 2 && this.elements.inputs[1].value.trim() === "8"){
        if (autoset) {
            this.setCorriger(true)
        }
        return true;
    } else {
        if (autoset) {
            this.setCorriger(false)
        }
        return false;
    }
}

listeCalculs[4].isCorrect = function (autoset = true) {
    if (430 % parseFloat(this.elements.inputs[0].value) == 0 && this.elements.inputs[1].value.trim() === "0") {
        if (autoset) {
            this.setCorriger(true)
        }
        return true;
    } else {
        if (autoset) {
            this.setCorriger(false)
        }
        return false;
    }
}

listeCalculs[5].isCorrect = function (autoset = true) {
    if (parseFloat(this.elements.inputs[0].value) % 10 == 0 && this.elements.inputs[1].value.trim() === "0") {
        if (autoset) {
            this.setCorriger(true)
        }
        return true;
    } else {
        if (autoset) {
            this.setCorriger(false)
        }
        return false;
    }
}

listeCalculs[6].isCorrect = function (autoset = true) {
    if (parseFloat(this.elements.inputs[0].value) % 5 == 0 && parseFloat(this.elements.inputs[0].value) % 10 != 0 && this.elements.inputs[1].value.trim() === "5") {
        if (autoset) {
            this.setCorriger(true)
        }
        return true;
    } else {
        if (autoset) {
            this.setCorriger(false)
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