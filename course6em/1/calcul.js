var listeCalculs = [
    /* Ecrire les calculs sous cette forme : ["9+9","complémentaire","solution"] (les deux derniers sont facultatifs)
    Séparer les calculs par une virgule*/
    ["7*5"],
    ["23+17"],
    ["","Complète :<br>Dans 20 300, il y a $.$$.$$.$$.$$.$ centaines$.$","203"],
    ["103-11"],
    ["","Complète :<br>4*$.$$.$$.$$.$$.$=28","7"],
    ["","Ajoute un quart d'heure à 2h 20min$.$","2:35","heure"],
    ["","La moitié de 52","26"],
    ["","Complète par une fraction : <img src='quest8$.$jpg' alt='quest8img'>","2/3"],
    ["","12 vis pèsent 30g$.$<br>24 vis pèsent $.$$.$$.$$.$$.$$.$ g$.$","60"],
    ["36/4"],
    ["(7*10)+(3*!1//100!)","<br><br><em>(Donner l'écriture décimale)<$/$em>"],
    ["","5 dizaines 23 unités =","73"],
    ["","Complète :<img src='quest13$.$jpg' alt='quest13img'>","3.6"],
    ["8*0.25"],
    ["","Avec 100 roses, un fleuriste fait 20 bouquets identiques$.$<br>\
    Il y a $.$$.$$.$$.$$.$$.$ roses dans chaque bouquet$.$","5"],
    ["","Le cinquième de 1<br><em>(Donner le résultat en écriture décimale)<$/$em>","0.2"],
    ["","Quel est le nombre 100 fois plus grand que 2 dixièmes ?","20"],
    ["","Quelle est l'aire du rectangle ?<img src='quest18$.$jpg' alt='quest18img'>","6"],
    ["","Le double de 12.5","25"],
    ["","Encadre la fraction par 2 entiers consécutifs<br>$.$$.$$.$$.$$.$<!7//3!<\
    $.$$.$$.$$.$$.$<em>(Séparer les deux réponses par un point virgule \
        <mark>;<$/$\mark>)<$/$em>","2;3"],
    ["","Le tiers de 12 œufs est $.$$.$$.$$.$$.$ œufs$.$","4"],
    ["","Le tiers de 120g est $.$$.$$.$$.$$.$g$.$","40"],
    ["","Deux-millions-deux-cent-deux-mille-deux","2202002"],
    ["","3 sucettes coûtent 2,10€<br>1 sucette coûte $.$$.$$.$$.$$.$€$.$","0.7"],
    ["","Le rectangle 2 est un agrandissement du 1$.$<br>Complète :\
    <img src='quest25$.$jpg' alt='quest25img'>","18"],
    ["","3.2 milliers","3200"],
    ["","Jules a 12 billes$.$ Il en a 3 fois moins que Lou$.$<br>\
    Combien Lou a-t-elle de billes ?","36"],
    ["","Complète :<br>1m³=$.$$.$$.$$.$$.$$.$L","1000"],
    ["","Recopie le plus grand nombre.<br>2.57 | 2.6 | 2.0672","2.6"],
    ["","Avec un choix de 2 entrées, 2 plats et 2 desserts, combien de repas\
    différents peut-on composer ?","8"]

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