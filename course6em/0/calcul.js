var listeCalculs = [
    /* Ecrire les calculs sous cette forme : ["9+9","complémentaire","solution"] (les deux derniers sont facultatifs)
    Séparer les calculs par une virgule*/
    ["6*6"],
    ["18+9"],
    ["", "La moitié de 24", "12"],
    ["", "71+$.$$.$$.$=100", "29"],
    ["(5*100)+(8*1)"],
    ["", 'Compléter : <br><img src="quest6$.$jpg" alt="quest6img">', "15"],
    ["72-50"],
    ["", "Ajoute une demi-heure à 1h20min$.$", "1:50", "heure"],
    ["", "<img src='quest9$.$jpg' alt='quest9img'><br>Quelle est la fraction de la\
    bande qui est grisée ?<br>(Rappel : écrire le trait de fraction avec un $/$)", "3/4"],
    ["", "8 stylos coûtent 5€<br>16 stylos coûtent $.$$.$$.$ €", "10"],
    ["", "Compléter :<br>$.$$.$$.$$.$$.$*9=54", "6"],
    ["", "Recopier le plus grand nombre :<br>1.23 | 1.3 | 1.042", "1.3"],
    ["", 'Compléter : <br><img src="quest13$.$jpg" alt="quest13img">',"19.6"],
    ["12*20"],
    ["", "Compléter : <br>0.5L = $.$$.$$.$$.$$.$$.$$.$mL", "500"],
    ["", "Combien d'unités font 35 dizaines et 4 centaines ?", "750"],
    ["", "Le périmètre de ce triangle isocèle est égal à 17 cm. <br>Complète.<img src='quest17$.$jpg' alt='quest17img'>", "5"],
    ["", "Combien faut-il de pièces de 10 centimes pour avoir 2.80€ ?", "28"],
    ["", "Donne un multiple de 8 compris entre 34 et 44", "40"],
    ["", "Recopie le plus grand nombre : <br>1 | !4//3! | !5//8!", "4/3"],
    ["25*4"],
    ["25*16"],
    ["5+!2//100!+!9//1000!", "<br><br><em>(Donner l'écriture décimale)<$/$em>"],
    ["", "Alex a 12 billes, il en a le triple de Sara$.$<br>Combien Sara a-t-elle de billes ?", "4"],
    ["5.2*100"],
    ["", "Compléter :<br>1+!1//4!+$.$$.$$.$$.$$.$$.$$.$=2<br><br><em>(Donner le résultat en écriture fractionnaire)<$/$em>", "3/4"],
    ["", "Un train part à 11 h 22 min et arrive à 12 h 15 min$.$<br>Quelle est la durée du trajet ?", "0:53", "heure"],
    ["1000000-1000-1"],
    ["", "4 cubes empilés ont une hauteur de 10 cm$.$<br>La hauteur de 6 cubes empilés est $.$$.$$.$$.$$.$$.$$.$$.$ cm$.$", "15"],
    ["", "Combien y a-t-il de petits cubes dans ce pavé droit ?<br>\
    <img src='quest30$.$jpg' alt='quest30img'>", "24"]
],
    divCalculs = document.getElementById("calculs"),
    dicoCalculs = [],
    boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    currentInputFocus = 0,
    temps = 540,
    pTemps = document.getElementById("temps"),
    timerON = false;

pTemps.textContent = "Vous avez " + Math.floor(temps / 60) + " minutes pour tout compléter !"

function arrondi(nb) {
    if (parseFloat(nb) == parseInt(nb)) {
        return nb;
    } else {
        var frmNb = ("" + nb).split(".");
        return typeof frmNb[1] != "undefined" ? (frmNb[1][0] >= 5 ? Math.ceil(nb) : Math.floor(nb)) : "undefined";
    }
}

for (var i = 0, c = listeCalculs.length; i < c; i++) {
    dicoCalculs.push({});

    //Traitement du formatage
    var frmCalc = (listeCalculs[i][0] + (typeof listeCalculs[i][1] != "undefined" ? listeCalculs[i][1] : "")).replace(/\*/g, "×").replace(/\//g, "÷").replace(/\./g, ",").replace(/\$\,\$/g, ".").replace(/\$\÷\$/g, "/").split("!");
    if (frmCalc.length > 1) {
        for (var j = 1, d = frmCalc.length; j < d; j += 2) {
            frmCalc[j] = frmCalc[j].replace("÷÷", '</div><div class="denominateur">');
            frmCalc[j] = "<div class=\"fraction\"><div class=\"numerateur\">" + frmCalc[j] + "</div></div>";
        }
    }

    frmCalc = frmCalc.join("");
    var newCalcul = document.createElement("tr"),
        newCalculLabel = document.createElement("label");
    newCalcul.className = "calcul";
    newCalculLabel.innerHTML = frmCalc;
    newCalculLabel.htmlFor = "calcn" + i;
    var tdForLabel = document.createElement("td"),
        tdForNum = document.createElement("td");
    tdForNum.appendChild(document.createTextNode(i + 1));
    newCalcul.appendChild(tdForNum);
    tdForNum.style.padding = "0px 10px 0px 10px"
    newCalcul.appendChild(tdForLabel.appendChild(newCalculLabel).parentNode);
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
    if (listeCalculs[i][3] == "heure") {
        dicoCalculs[i].type = "heure"
    }
    else if (typeof listeCalculs[i][2] != "undefined" && parseFloat(listeCalculs[i][2]) != listeCalculs[i][2]) {
        dicoCalculs[i].type = "str"
    } else {
        dicoCalculs[i].type = "nb"
    }

    //Ajout du input
    var newInput = document.createElement("input");
    newInput.id = newInput.name = "calcn" + i + (dicoCalculs[i].type == "heure" ? "a" : "");
    newInput.type = "text";
    newInput.placeholder = (dicoCalculs[i].type == "heure" ? "Heure(s)" : "Réponse");
    dicoCalculs[i].input = newInput;
    var newTdForInput = document.createElement("td");
    newCalcul.appendChild(newTdForInput.appendChild(newInput).parentNode);
    if (dicoCalculs[i].type == "heure") {
        newTdForInput.appendChild(document.createTextNode("h"));
        var newInputMin = document.createElement("input");
        newInputMin.id = newInput.name = "calcn" + i + "b";
        newInputMin.type = "text";
        newInputMin.placeholder = "Minute(s)";
        dicoCalculs[i].inputMin = newInputMin;
        newTdForInput.appendChild(newInputMin);
        newTdForInput.appendChild(document.createTextNode("min"));
        newTdForInput.className = "heuremin"
    }

    var blurInput = function (e) {
        var rep = e.currentTarget.value.replace(/\,/g, "."),
            num = parseInt(e.currentTarget.id.replace("calcn", "").replace("a", "").replace("b", ""));
        e.currentTarget.className = (temps > 0 && (dicoCalculs[num].type == "nb" && (isNaN(parseFloat(rep)) || /* continue sur l'autre ligne*/
            (parseFloat(rep) != rep && rep != ""))) ? "erreur" : ""); //définit si erreur ou pas
        if (dicoCalculs[num].type == "heure") {
            if (temps > 0 && (isNaN(parseFloat(dicoCalculs[num].input.value)) || (parseFloat(dicoCalculs[num].input.value) != dicoCalculs[num].input.value && dicoCalculs[num].input.value != "")) || (isNaN(parseFloat(dicoCalculs[num].inputMin.value)) || (parseFloat(dicoCalculs[num].inputMin.value) != dicoCalculs[num].inputMin.value && dicoCalculs[num].inputMin.value != ""))) {
                dicoCalculs[num].input.className = dicoCalculs[num].inputMin.className = "erreur"
            } else {
                dicoCalculs[num].input.className = dicoCalculs[num].inputMin.className = ""
            }
        }
    },
        focusInput = function (e) {
            timerON = true;
            if (e.currentTarget.className == "erreur") {
                //infobulle erreur
                e.currentTarget.className = "";
            }
        };
    newInput.addEventListener("blur", blurInput);
    newInput.addEventListener("focus", focusInput);
    if (typeof newInputMin != "undefined") {
        newInputMin.addEventListener("blur", blurInput);
        newInputMin.addEventListener("focus", focusInput);
    }

    divCalculs.appendChild(newCalcul);

}


//Quand on clique sur le bouton corriger
var corriger = function (e) {
    var listeJF = [], prer = false, compteur = 0;
    for (var i = 0, c = dicoCalculs.length; i < c; i++) {
        var rep = dicoCalculs[i].input.value.replace(/\,/g, "."); // , -> .
        if (dicoCalculs[i].type == "nb") {
            if (temps <= 0 || !isNaN(parseFloat(rep)) && !(parseFloat(rep) != rep && rep != "")) {
                var resultat = arrondi(eval(dicoCalculs[i].lisiCalc) * 100000) / 100000;
                listeJF.push(rep == resultat ? "juste" : "faux");
            } else {
                dicoCalculs[i].input.className = "erreur"
                if (!prer) {
                    dicoCalculs[i].input.focus();
                    prer = true;
                }
            }
        } else if (dicoCalculs[i].type == "heure") {
            var heure = parseInt(dicoCalculs[i].lisiCalc.split(":")[0]),
                min = parseInt(dicoCalculs[i].lisiCalc.split(":")[1]);
            if (temps <= 0 || (!isNaN(parseFloat(rep)) && !(parseFloat(rep) != rep && rep != "")) && (!isNaN(parseFloat(dicoCalculs[i].inputMin.value)) && !(parseFloat(dicoCalculs[i].inputMin.value) != dicoCalculs[i].inputMin.value && dicoCalculs[i].inputMin.value != ""))) {
                listeJF.push(rep == heure && dicoCalculs[i].inputMin.value == min ? "juste" : "faux");

            } else {
                dicoCalculs[i].input.className = dicoCalculs[i].inputMin.className = "erreur"
                if (!prer) {
                    dicoCalculs[i].input.focus();
                    prer = true;
                }

            }
        } else {
            if (dicoCalculs[i].input.value != "" || temps <= 0) {
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
            if (typeof dicoCalculs[i].inputMin != "undefined") {
                dicoCalculs[i].inputMin.className = listeJF[i];
            }
        }
        pScore.textContent = "Votre score : ";
        pScore.appendChild(document.createElement("span"));
        pScore.lastChild.id = "frmScore";
        var score = arrondi((compteur / listeJF.length) * 30) + "/30"
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
        temps--;
        pTemps.textContent = "Il vous reste " + Math.floor(temps / 60) + " minutes et " + temps % 60 + " secondes."
        if (temps <= 0) {
            pTemps.textContent = "Le temps est écoulé !";
            pTemps.style.color = "red";
            listeInput = document.getElementsByTagName("input");
            for (i = 0; i < listeInput.length; i++) {
                listeInput[i].readonly = true;
                listeInput[i].blur()
            }
            timerON = false;
            confirm("Le temps est écoulé !")
            boutonFin.click()
        }
    }
}, 1000);