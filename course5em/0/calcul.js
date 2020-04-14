//Using JSCalcment v2.1 Helluy 2020

var boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 540,
    pTemps = document.getElementById("temps"),
    jeuEnCours = true,
    listeCalculs = [
        new CalculRep("7*5"),
        new CalculRep("45+27"),
        new CalculRep("","Compléter :<br>3.7+...=8","4.3"),
        new CalculRep("","1.2 kg = ...g","1200"),
        new CalculRep("","2 h 51 min + 3 h 20 min","6:11","heure"),
        new CalculRep("","50% de 128","64"),
        new CalculRep("","Le produit de 5 par 12","60"),
        new CalculRep("","Écriture décimale de !5//10 000!","0.0005"),
        new CalculRep("","Le périmètre d'un carré mesure 48 cm$.$<br>\
        La longueur de son côté est .... cm","12"),
        new CalculRep("","Le triple de 27","81"),
        new CalculRep("10 000-2"),
        new CalculRep("","Compléter :<br>!1//4!+.......=0.35","0.1"),
        new CalculRep("","Quel est le point d'abscisse !1//3! ?<br>i$13","B"),
        new CalculRep("","i$14<br>? = .......cm","3"),
        new CalculRep("17-7*2"),
        new CalculRep("","1.5 h =","1:30","heure"),
        new CalculRep("","i$17","8"),
        new CalculRep("15*101"),
        new CalculRep("1.23+0.6"),
        new CalculRep("","4 brioches coûtent 12.40€.<br>\
        6 brioches coûtent ....€$.$","18.6"),
        new CalculRep("5*0.25"),
        new CalculRep("","Compléter :i$22","1.99"),
        new CalculRep("","Dans un groupe de 10 élèves, il y a 3 filles$.$<br>\
        Le pourcentage de filles dans ce groupe est ....%$.$","30"),
        new CalculRep("","Compléter :<br>7 * ..... = 5","5/7"),
        new CalculRep("","Compléter :i$25<br>? = ....°","65"),
        new CalculRep("","Yacine possède 30€$.$<br>\
        Il donne les !4//5! de cet argent à son frère$.$<br><br>\
        Il lui reste ....€$.$","6"),
        new CalculRep("","Dans !2//3! combien de fois !1//6! ?","4"),
        new CalculRep("","Donner le volume, en litres, d'un cube de 2 m d'arête$.$","800"),
        new CalculRep("","2 cm² + 7 mm² = ....cm²","2.07"),
        new CalculRep("","i$30MB = ...... cm","2.8")
    ];

listeCalculs[12].transformRadios("Cocher la réponse :",["A","B","C","D","E"]);

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