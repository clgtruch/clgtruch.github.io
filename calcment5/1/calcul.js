//JSCalcment v0.1 Helluy 2020

var listeCalculs = [
    /* Ecrire les calculs sous cette forme : ["9+9","complémentaire","solution"] (les deux derniers sont facultatifs)
    Séparer les calculs par une virgule*/
    ["!1//5!"],
    ["","Opposé de 4.7","-4.7"],
    ["!450//4!"],
    ["4-1.72"],
    ["","1 000 000-1 000-1","998999"],
    ["","Distance à zéro de -36","36"],
    ["1-4"],
    ["","!1//2! de 37","18.5"],
    ["!1//3!+!5//3!"],
    ["","!54//9!+?=0","-6"]
],
    divCalculs = document.getElementById("calculs"),
    dicoCalculs = [],
    boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    currentInputFocus = 0,
    temps = 0,
    pTemps = document.getElementById("temps"),
    timerON = false;

function arrondi(nb) {
    if (parseFloat(nb) == parseInt(nb)) {
        return nb;
    } else {
        var frmNb = ("" + nb).split(".");
        return (frmNb[1][0] >= 5 ? Math.ceil(nb) : Math.floor(nb));
    }
}

for (var i = 0, c = listeCalculs.length; i < c; i++) {
    dicoCalculs.push({});

    //Traitement du formatage
    var frmCalc = (listeCalculs[i][0] + (typeof listeCalculs[i][1] != "undefined" ? listeCalculs[i][1] : "")).replace(/\*/g, "×").replace(/\//g, "÷").replace(/\./g, ",").split("!");
    if (frmCalc.length > 1) {
        for (var j = 1, d = frmCalc.length; j < d; j += 2) {
            frmCalc[j] = frmCalc[j].replace("÷÷", '</div><div class="denominateur">');
            frmCalc[j] = "<div class='fraction'><div class='numerateur'>" + frmCalc[j] + "</div></div>";
        }
    }

    frmCalc = frmCalc.join("");
    var newCalcul = document.createElement("div"),
        newCalculLabel = document.createElement("label");
    newCalcul.className = "calcul";
    newCalculLabel.innerHTML = frmCalc;
    newCalculLabel.htmlFor = "calcn" + i;
    newCalcul.appendChild(newCalculLabel)
    dicoCalculs[i].frmCalc = newCalcul; //ajoute le calcul dans le div

    //Traitement du to machine
    if (typeof listeCalculs[i][2] == "undefined") {
        var lisiCalc = listeCalculs[i][0].split("!");
        for (var j = 1, d = lisiCalc.length; j < d; j += 2) {
            lisiCalc[j] = "((" + lisiCalc[j].replace(/\/\//g, ")/(") + "))";
        }
        dicoCalculs[i].lisiCalc = lisiCalc.join("");
    } else {
        dicoCalculs[i].lisiCalc = listeCalculs[i][2];
    }

    ////Traitement du type
    if (typeof listeCalculs[i][2] != "undefined" && parseFloat(listeCalculs[i][2]) != listeCalculs[i][2]){
        dicoCalculs[i].type = "str"
    } else {
        dicoCalculs[i].type = "nb"
    }

    //Ajout du input
    var newInput = document.createElement("input");
    newInput.id = newInput.name = "calcn" + i;
    newInput.type = "text";
    newInput.placeholder = "Réponse";
    dicoCalculs[i].input = newInput;
    newCalcul.appendChild(newInput);

    newInput.addEventListener("focus", function (e) {
        timerON = true;
        if (e.currentTarget.className == "erreur") {
            //infobulle erreur
            var annErreur = document.createElement("p"),
                num = parseInt(e.currentTarget.id.replace("calcn",""));
            annErreur.className = "annErreur";
            annErreur.textContent = (dicoCalculs[num].type == "nb" ? "Veuillez saisir un nombre" : "Veuillez saisir une réponse");
            e.currentTarget.parentNode.appendChild(annErreur)
        } else {
            //retrait de toute couleur
            e.currentTarget.className = "";
        }
    });

    newInput.addEventListener("blur", function (e) {
        if (e.currentTarget.className == "erreur") {
            //on retire l'infobulle
            e.currentTarget.parentNode.removeChild(e.currentTarget.parentNode.lastChild);
        }
        var rep = e.currentTarget.value.replace(/\,/g, "."),
            num = parseInt(e.currentTarget.id.replace("calcn",""));
        e.currentTarget.className = (dicoCalculs[num].type == "nb" && (isNaN(parseFloat(rep)) || /* continue sur l'autre ligne*/
        (parseFloat(rep) != rep && rep != "") ? "erreur" : "")); //définit si erreur ou pas
    });

    divCalculs.appendChild(newCalcul);

}


//Quand on clique sur le bouton corriger
var corriger = function (e) {
    var listeJF = [], prer = false, compteur = 0;
    for (var i = 0, c = dicoCalculs.length; i < c; i++) {
        var rep = dicoCalculs[i].input.value.replace(/\,/g, "."); // , -> .
        if (dicoCalculs[i].type == "nb"){
            if (!isNaN(parseFloat(rep)) && !(parseFloat(rep) != rep && rep != "")) {
                var resultat = arrondi(eval(dicoCalculs[i].lisiCalc)*100000)/100000;
                listeJF.push(rep == resultat ? "juste" : "faux");
            } else {
                dicoCalculs[i].input.className = "erreur"
                if (!prer) {
                    dicoCalculs[i].input.focus();
                    prer = true;
                }
            }
        } else {
            if (dicoCalculs[i].input.value != ""){
                listeJF.push(rep == dicoCalculs[i].lisiCalc ? "juste" : "faux");
            } else {
                dicoCalculs[i].input.className = "erreur";
                if (!prer) {
                    dicoCalculs[i].input.focus();
                    prer = true;
                }
            }
        }
    }
    if (!prer) { //compter les juste faux
        for (var i = 0, c = listeJF.length; i < c; i++) {
            dicoCalculs[i].input.className = listeJF[i];
            if (dicoCalculs[i].input.className == "juste") {
                compteur += 1;
            }
        }
        pScore.textContent = "Votre score : ";
        pScore.appendChild(document.createElement("span"));
        pScore.lastChild.id = "frmScore";
        var score = arrondi((compteur / listeJF.length) * 100) + "%"
        pScore.lastChild.textContent = score;
        timerON = false
    }
};


boutonFin.addEventListener("click", corriger);

document.addEventListener("keyup", function (e) {
    if (e.keyCode == 13) {
        document.activeElement.blur()
        corriger(e);
    }
});

setInterval(function () {
    if (timerON) {
        temps++
        pTemps.textContent = "Votre temps : " + temps + " secondes.";
    }
}, 1000);