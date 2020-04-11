var TABLEAU = document.getElementById("calculs"),
    boutonFin = document.getElementById("fin"),
    pScore = document.getElementById("score"),
    temps = 540,
    pTemps = document.getElementById("temps"),
    timerON = false,
    jeuEnCours = true,
    ID = 0,
    listeCalculs = [
        new CalculRep("7*3"),
        new CalculRep("","Complète :<br>49 = ...*...",["1","1"]),
        new CalculRep("","La moitié de 18","9"),
        new CalculRep("17-9"),
        new CalculRep("22+19"),
        new CalculRep("","Complète :<br>45+...=60","15"),
        new CalculRep("","Ajoute un quart d'heure à 1 h 45 min$.$","2:00","heure"),
        new CalculRep("","Complète :<img src='quest8$.$jpg' alt='quest8img'>'","55"),
        new CalculRep("","4 gommes pèsent 50g$.$<br>8 gommes pèsent ... g$.$","100"),
        new CalculRep("","Combien y-a-t-il de dizaines\
        en tout dans 234 ?","23.4"),
        new CalculRep("","Combien de milliers y a-t-il dans un million ?","1000"),
        new CalculRep("","Complète.<br>1000×...=1 000 000","1000"),
        new CalculRep("","<img src='quest13$.$jpg' alt='quest13img'>Il y a ... unités en tout$.$","1023"),
        new CalculRep("","Au judo, il y a 40\
        garçons et 3 fois plus de\
        filles.<br>\
        Il y a ... enfants en tout$.$","160"),
        new CalculRep("","Complète :<br>25cL + ... cL = 1L","75"),
        new CalculRep("","<img src='quest1617$.$jpg' alt='quest1617img'>",
        "Faux"),
        new CalculRep("","","Vrai"),
        new CalculRep("","Complète$.$<img src='quest18$.$jpg' alt='quest18img'>","0.6"),
        new CalculRep("12*5"),
        new CalculRep("","Coche la réponse possible","80 cm"),
        new CalculRep("","Une voiture roule à une vitesse constante de 50 km$/$h$.$\
        <br>Elle parcourt ... km en 1 heure","50"),
        new CalculRep("","Une voiture roule à une vitesse constante de 50 km$/$h$.$\
        <br>Elle parcourt ... km en 1 h 30 min$.$","75"),
        new CalculRep("","Compléter la suite logique$.$<br> 125 $/$ 150 $/$ 175 $/$ ...","200"),
        new CalculRep("","105*9.5<br>Recopie le nombre \
        le plus proche du résultat$.$<br>1 000 | 10 000 | 100 000","1000"),
        new CalculRep("","341 * 7<br>Recopie la bonne réponse \
        sans effectuer précisément le calcul$.$<br>1 117 | 2 387 | 7 341",
        "2387"),
        new CalculRep("","5 kg de pommes coûtent 11 €\
        9 kg de ces mêmes pommes\
        coûtent 19.80 €$.$<br>4 kg de pommes coûtent ... €$.$","8.8"),
        new CalculRep("120/5"),
        new CalculRep("","Un quart de 24€ est ...€$.$","6"),
        new CalculRep("","90 élèves ont été répartis en \
        groupes de 15 élèves$.$<br>Il y a ... groupes$.$","6"),
        new CalculRep("","Dans un village, on a le choix entre\
        4 couleurs pour peindre les murs et\
        3 couleurs pour la porte d'entrée.\
        En choisissant 1 couleur pour\
        les murs et 1 couleur pour la\
        porte, combien de maisons\
        différentes peut-on obtenir ?","12")
    ];

transformRadios(15,"Ces figures ont le même périmètre.",["Vrai","Faux"]);
transformRadios(16,"Ces figures ont la même aire.",["Vrai","Faux"]);
transformRadios(19,"La hauteur d'une table est :",["80 cm","80 dm","80 m"]);

listeCalculs[1].isCorrect = function(autoset=true){
    if (parseFloat(this.elements.inputs[0].value.split(",").join(".")) * parseFloat(this.elements.inputs[1].value.split(",").join(".")) == 49){
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

listeCalculs[15].elements.tdLabel.rowSpan = "2";
listeCalculs[16].elements.tdLabel.parentNode.removeChild(listeCalculs[16].elements.tdLabel);

function transformRadios(nb,quest,listeChoix){
    //Suppression des inputs existants
    for (var i = 0 ; i < listeCalculs[nb].elements.inputs.length ; i ++){
        listeCalculs[nb].elements.inputs[i].parentNode.removeChild(listeCalculs[nb].elements.inputs[i])
    }
    listeCalculs[nb].elements.inputs = [];
    var lbd = {
        labels : [],
        boutons : [],
        divBoutons : []
    };
    //on crée un label et une case pour chaque choix
    for (var i = 0 ; i < listeChoix.length ; i++){
        lbd.divBoutons[i] = document.createElement("div");

        lbd.labels.push(document.createElement("label"));
        lbd.labels[i].textContent = listeChoix[i];
        lbd.labels[i].htmlFor = nb + listeChoix[i];
        lbd.divBoutons[i].appendChild(lbd.labels[i])

        lbd.boutons.push(document.createElement("input"));
        lbd.boutons[i].type = "radio";
        lbd.boutons[i].name = "quest" + (nb+1) + "radio";
        lbd.boutons[i].style.display = "inline-block";
        lbd.boutons[i].id = nb + listeChoix[i];
        lbd.boutons[i].value = listeChoix[i];
        lbd.divBoutons[i].appendChild(lbd.boutons[i]);
    }
    listeCalculs[nb].elements.tdInputs.appendChild(document.createTextNode(quest));
    for (var i = 0 ; i < listeChoix.length ; i ++){
        listeCalculs[nb].elements.tdInputs.appendChild(lbd.divBoutons[i]);
        listeCalculs[nb].elements.inputs.push(lbd.boutons[i]);
    }
    listeCalculs[nb].areErrors = function(autoset=true){
        var ok = 0;
        for (var i = 0 ; i < this.elements.inputs.length ; i ++){
            if (this.elements.inputs[i].checked){
                ok = 1;
                break;
            }
        }
        if (ok){
            return false;
        } else {
            if (autoset){
                this.setError()
            }
            return true;
        }
    }

    listeCalculs[nb].isCorrect = function(autoset=true){
        var chec;
        for (var i = 0; i < this.elements.inputs.length ; i ++){
            if (this.elements.inputs[i].checked){
                chec = this.elements.inputs[i].value;
                break;
            }
        }
        if (chec == this.result[0]){
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

    listeCalculs[nb].setCorriger = function(jf){
        this.elements.tdInputs.style.background = jf ? "rgba(26, 129, 0, 0.479)" : "rgba(255, 0, 0, 0.397)";
    };

    listeCalculs[nb].setError = function(){
        this.elements.tdInputs.style.background = "rgba(255, 145, 0, 0.521)";
    };
    listeCalculs[nb].clearClass = function(){
        this.elements.tdInputs.style.background = "";
    }

    listeCalculs[nb].addEventListener("change",listeCalculs[nb].eventFocus);
}

pTemps.textContent = "Vous avez " + Math.floor(temps / 60) + " minutes pour tout compléter !";


        function arrondi(nb) {
            if (parseFloat(nb) == parseInt(nb)) {
                return nb;
            } else {
                var frmNb = ("" + nb).split(".");
                return typeof frmNb[1] != "undefined" ? (frmNb[1][0] >= 5 ? Math.ceil(nb) : Math.floor(nb)) : "undefined";
            }
        }

        function isNumber(str) {
            return !(isNaN(parseFloat(str)) && str != parseFloat(str));
        }

        function CalculRep(calc, compl = "", result = undefined, type = "auto") {

            if (typeof result == "string" || typeof result == "undefined") {
                result = [result];
            }

            this.result = result;
            this.calc = calc;

            //Définir le type de calcul :
            if (type == "auto") {
                if (typeof result[0] == "undefined") {
                    this.type = "nb";
                    this.autoNb = true;
                    var lisiCalc = this.calc.split("!");
                    for (var j = 1, d = lisiCalc.length; j < d; j += 2) {
                        lisiCalc[j] = "((" + lisiCalc[j].replace(/\/\//g, ")/(") + "))";
                    }
                    this.calc = lisiCalc.join("");
                } else {
                    this.autoNb = false;
                    for (var i = 0; i < result.length; i++) {
                        if (isNumber(result[i])) {
                            this.type = "nb";
                        } else {
                            this.type = "str";
                            break;
                        }
                    }
                }
            } else {
                this.type = type
            }

            //On définit ce qui s'affichera dans le label :
            var frmCalc = (calc + (typeof compl != "undefined" ? compl : "")).replace(/\*/g, "×").
            replace(/\//g, "÷").replace(/\./g, ",").replace(/\$\,\$/g, ".").replace(/\$\÷\$/g, "/").replace(/\,\,\,/g,"...").split("!");
            if (frmCalc.length > 1) {
                for (var j = 1, d = frmCalc.length; j < d; j += 2) {
                    frmCalc[j] = frmCalc[j].replace("÷÷", '</div><div class="denominateur">');
                    frmCalc[j] = "<div class=\"fraction\"><div class=\"numerateur\">" + frmCalc[j] + "</div></div>";
                }
            }
            this.display = frmCalc.join("");

            //Création des éléments HTML
            this.elements = {};
            //Label :
            this.elements.label = document.createElement("label");
            this.elements.label.innerHTML = this.display;
            this.elements.label.htmlFor = "calcn" + ID + "_0";
            //input(s) :
            this.elements.inputs = [];
            var c = this.type != "heure" ? result.length : result.length * 2;
            for (var i = 0; i < c; i++) {
                if (this.type != "heure") {
                    this.elements.inputs.push(document.createElement("input"));
                    this.elements.inputs[i].id = "calcn" + ID + "_" + i;
                    this.elements.inputs[i].placeholder = "Réponse";
                    this.elements.inputs[i].type = "text"
                } else {
                    if (i % 2 == 0) {
                        this.elements.inputs.push(document.createElement("input"));
                        this.elements.inputs[i].id = "calcn" + ID + "_" + i + "a";
                        this.elements.inputs[i].placeholder = "Heure(s)"
                        this.elements.inputs[i].type = "text"
                    } else {
                        this.elements.inputs.push(document.createElement("input"));
                        this.elements.inputs[i].id = "calcn" + ID + "_" + i + "b";
                        this.elements.inputs[i].placeholder = "Minute(s)"
                        this.elements.inputs[i].type = "text"
                    }
                }
            }

            //elements du tableau
            this.elements.tr = document.createElement("tr");
            this.elements.tr.className = "calcul";
            this.elements.tdNum = document.createElement("td").appendChild(document.createTextNode(ID + 1)).parentNode
            this.elements.tdLabel = document.createElement("td");
            this.elements.tdInputs = document.createElement('td');
            this.elements.tr.appendChild(this.elements.tdNum).parentNode.appendChild(this.elements.tdLabel).parentNode.appendChild(this.elements.tdInputs);

            //ajouter tout
            this.elements.tdLabel.appendChild(this.elements.label);
            for (var i = 0; i < this.elements.inputs.length; i++) {
                this.elements.tdInputs.appendChild(this.elements.inputs[i]);
                if (this.type == "heure") {  //Ajoute h ou min si il s'agit d'une question heure
                    this.elements.tdInputs.appendChild(document.createTextNode(i % 2 == 0 ? "h" : "min"));
                }
            }

            //Ajout du tr au tableau
            TABLEAU.appendChild(this.elements.tr);


            //Méthode qui supprime les classes erreur, juste et faux sur les inputs
            this.clearClass = function(){
                for (var i = 0 ; i < this.elements.inputs.length ; i ++){
                    var classes = this.elements.inputs[i].className.split(" "),
                        newClasses = [];
                    for (var j = 0 ; j < classes.length ; j ++){
                        if (classes[j] != "juste" && classes[j] != "faux" && classes[j] != "erreur"){
                            newClasses.push(classes[j]);
                        }
                    }
                    this.elements.inputs[i].className = newClasses.join(" ");
                }
            }

            //Méthode de vérification : vérifie si le contenu du/des inputs est correct
                this.areErrors = function (autoset = true) {
                    for (var i = 0; i < this.elements.inputs.length; i++) {
                        if ((this.type == "nb" || this.type == "heure") && !isNumber(this.elements.inputs[i].value)) {
                            if (autoset) {
                                this.setError();
                            }
                            return true;
                        } else if (this.type == "str") {
                            if (this.elements.inputs[i].value == ""){
                                if (autoset) {
                                    this.setError();
                                }
                                return true;
                            };
                        }
                    }
                    return false;
                }
                this.setError = function () {
                    for (var i = 0; i < this.elements.inputs.length; i++) {
                        this.elements.inputs[i].className = "erreur";
                    }
                }

            //Méthode de vérification : vérifie si la réponse est juste

                this.setCorriger = function(juste){
                    for (var i = 0; i < this.elements.inputs.length; i++) {
                        this.elements.inputs[i].className = juste ? "juste" : "faux";
                    }
                }

                this.isCorrect = function(autoset=true){
                    var corrects = []
                    for (var i = 0 ; i < this.elements.inputs.length ; i++){
                        if (this.type == "nb"){
                            if (this.autoNb){// SI le résultat a été calculé automatiquement
                                corrects.push(arrondi(eval(this.calc) * 100000) / 100000 == parseFloat(this.elements.inputs[i].value.split(",").join(".")));
                            } else {
                                corrects.push(parseFloat(this.result[i]) == parseFloat(this.elements.inputs[i].value.split(",").join(".")));
                            }
                        } else if (this.type == "heure" && i % 2 == 0){ //Si il s'agit d'une heure
                            corrects.push(parseFloat(this.result[i/2].split(":")[0]) == parseFloat(this.elements.inputs[i].value)
                                        && parseFloat(this.result[i/2].split(":")[1]) == parseFloat(this.elements.inputs[i+1].value));
                        } else if (this.type == "str"){
                            corrects.push(this.elements.inputs[i].value == this.result[i]);
                        }
                    }
                    for (var i = 0 ; i < corrects.length ; i ++){
                        if (corrects[i] == false){
                            if (autoset){
                                this.setCorriger(false);
                            }
                            return false;
                        }
                    }
                    if (autoset){
                        this.setCorriger(true);
                    }
                    return true;
                }
                

                //Définit ce qui se passe lorsque les inputs sont focus et blur
                this.eventFocus = function(e){
                    timerON = true;
                    obj.clearClass();
                };
                this.eventBlur = function(e){
                    obj.areErrors();
                };
                this.addEventListener = function(event,funct){
                    for (var i = 0, obj = this ; i < this.elements.inputs.length ; i ++){
                        this.elements.inputs[i].addEventListener(event,funct);
                    }
                }
                for (var i = 0, obj = this ; i < this.elements.inputs.length ; i ++){
                    this.elements.inputs[i].addEventListener("focus",this.eventFocus);
                    this.elements.inputs[i].addEventListener("blur",this.eventBlur);
                }
            ID += 1;
        }

boutonFin.addEventListener("click",function(e){
    if (jeuEnCours){
        var firstError;
        for (var i = 0 ; i < listeCalculs.length ; i ++){
            if (listeCalculs[i].areErrors()){
                if (typeof firstError == "undefined"){
                    firstError = i;
                }
            }
        }
        if (typeof firstError != "undefined"){
            listeCalculs[firstError].elements.inputs[0].focus()
        }

    }
    if (typeof firstError == "undefined"){
        var listeJF = 0; //nombre de réponses justes
        for (var i = 0 ; i < listeCalculs.length ; i ++){
            listeJF += listeCalculs[i].isCorrect() ? 1 : 0;
        }
        pScore.textContent = "Votre score est " + arrondi(listeJF/listeCalculs.length*30) + "/30";
        timerON = false;
    }
});

document.addEventListener("keyup",function(e){
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
            for (i = 0; i < listeInput.length; i++) {
                listeInput[i].addEventListener("focus",function(e){
                    e.currentTarget.blur();
                });
            }
            timerON = false;
            if (jeuEnCours){
                confirm("1Le temps est écoulé !");
            }
            jeuEnCours = false;
            boutonFin.click()
        }
    }
}, 1000);




























// for (var i = 0, c = listeCalculs.length; i < c; i++) {
//     dicoCalculs.push({});

//     //Traitement du formatage
//     var frmCalc = (listeCalculs[i][0] + (typeof listeCalculs[i][1] != "undefined" ? listeCalculs[i][1] : "")).replace(/\*/g, "×").replace(/\//g, "÷").replace(/\./g, ",").replace(/\$\,\$/g, ".").replace(/\$\÷\$/g, "/").split("!");
//     if (frmCalc.length > 1) {
//         for (var j = 1, d = frmCalc.length; j < d; j += 2) {
//             frmCalc[j] = frmCalc[j].replace("÷÷", '</div><div class="denominateur">');
//             frmCalc[j] = "<div class=\"fraction\"><div class=\"numerateur\">" + frmCalc[j] + "</div></div>";
//         }
//     }

//     frmCalc = frmCalc.join("");
//     var newCalcul = document.createElement("tr"),
//         newCalculLabel = document.createElement("label");
//     newCalcul.className = "calcul";
//     newCalculLabel.innerHTML = frmCalc;
//     newCalculLabel.htmlFor = "calcn" + i;
//     var tdForLabel = document.createElement("td"),
//         tdForNum = document.createElement("td");
//     tdForNum.appendChild(document.createTextNode(i + 1));
//     newCalcul.appendChild(tdForNum);
//     tdForNum.style.padding = "0px 10px 0px 10px"
//     newCalcul.appendChild(tdForLabel.appendChild(newCalculLabel).parentNode);
//     dicoCalculs[i].frmCalc = newCalcul; //ajoute le calcul dans le div

//     //Traitement du to machine
//     if (typeof listeCalculs[i][2] == "undefined") {
//         var lisiCalc = listeCalculs[i][0].split("!");
//         for (var j = 1, d = lisiCalc.length; j < d; j += 2) {
//             lisiCalc[j] = "((" + lisiCalc[j].replace(/\/\//g, ")/(") + "))";
//         }
//         dicoCalculs[i].lisiCalc = lisiCalc.join("");
//     } else {
//         dicoCalculs[i].lisiCalc = listeCalculs[i][2];
//     }

//     ////Traitement du type
//     if (listeCalculs[i][3] == "heure") {
//         dicoCalculs[i].type = "heure"
//     }
//     else if (typeof listeCalculs[i][2] != "undefined" && parseFloat(listeCalculs[i][2]) != listeCalculs[i][2]) {
//         dicoCalculs[i].type = "str"
//     } else {
//         dicoCalculs[i].type = "nb"
//     }

//     //Ajout du input
//     var newInput = document.createElement("input");
//     newInput.id = newInput.name = "calcn" + i + (dicoCalculs[i].type == "heure" ? "a" : "");
//     newInput.type = "text";
//     newInput.placeholder = (dicoCalculs[i].type == "heure" ? "Heure(s)" : "Réponse");
//     dicoCalculs[i].input = newInput;
//     var newTdForInput = document.createElement("td");
//     newCalcul.appendChild(newTdForInput.appendChild(newInput).parentNode);
//     if (dicoCalculs[i].type == "heure") {
//         newTdForInput.appendChild(document.createTextNode("h"));
//         var newInputMin = document.createElement("input");
//         newInputMin.id = newInput.name = "calcn" + i + "b";
//         newInputMin.type = "text";
//         newInputMin.placeholder = "Minute(s)";
//         dicoCalculs[i].inputMin = newInputMin;
//         newTdForInput.appendChild(newInputMin);
//         newTdForInput.appendChild(document.createTextNode("min"));
//         newTdForInput.className = "heuremin"
//     }

//     var blurInput = function (e) {
//         var rep = e.currentTarget.value.replace(/\,/g, "."),
//             num = parseInt(e.currentTarget.id.replace("calcn", "").replace("a", "").replace("b", ""));
//         e.currentTarget.className = (temps > 0 && (dicoCalculs[num].type == "nb" && (isNaN(parseFloat(rep)) || /* continue sur l'autre ligne*/
//             (parseFloat(rep) != rep && rep != ""))) ? "erreur" : ""); //définit si erreur ou pas
//         if (dicoCalculs[num].type == "heure") {
//             if (temps > 0 && (isNaN(parseFloat(dicoCalculs[num].input.value)) || (parseFloat(dicoCalculs[num].input.value) != dicoCalculs[num].input.value && dicoCalculs[num].input.value != "")) || (isNaN(parseFloat(dicoCalculs[num].inputMin.value)) || (parseFloat(dicoCalculs[num].inputMin.value) != dicoCalculs[num].inputMin.value && dicoCalculs[num].inputMin.value != ""))) {
//                 dicoCalculs[num].input.className = dicoCalculs[num].inputMin.className = "erreur"
//             } else {
//                 dicoCalculs[num].input.className = dicoCalculs[num].inputMin.className = ""
//             }
//         }
//     },
//         focusInput = function (e) {
//             timerON = true;
//             if (e.currentTarget.className == "erreur") {
//                 //infobulle erreur
//                 e.currentTarget.className = "";
//             }
//         };
//     newInput.addEventListener("blur", blurInput);
//     newInput.addEventListener("focus", focusInput);
//     if (typeof newInputMin != "undefined") {
//         newInputMin.addEventListener("blur", blurInput);
//         newInputMin.addEventListener("focus", focusInput);
//     }

//     divCalculs.appendChild(newCalcul);

// }


// //Quand on clique sur le bouton corriger
// var corriger = function (e) {
//     var listeJF = [], prer = false, compteur = 0;
//     for (var i = 0, c = dicoCalculs.length; i < c; i++) {
//         var rep = dicoCalculs[i].input.value.replace(/\,/g, "."); // , -> .
//         if (dicoCalculs[i].type == "nb") {
//             if (temps <= 0 || !isNaN(parseFloat(rep)) && !(parseFloat(rep) != rep && rep != "")) {
//                 var resultat = arrondi(eval(dicoCalculs[i].lisiCalc) * 100000) / 100000;
//                 listeJF.push(rep == resultat ? "juste" : "faux");
//             } else {
//                 dicoCalculs[i].input.className = "erreur"
//                 if (!prer) {
//                     dicoCalculs[i].input.focus();
//                     prer = true;
//                 }
//             }
//         } else if (dicoCalculs[i].type == "heure") {
//             var heure = parseInt(dicoCalculs[i].lisiCalc.split(":")[0]),
//                 min = parseInt(dicoCalculs[i].lisiCalc.split(":")[1]);
//             if (temps <= 0 || (!isNaN(parseFloat(rep)) && !(parseFloat(rep) != rep && rep != "")) && (!isNaN(parseFloat(dicoCalculs[i].inputMin.value)) && !(parseFloat(dicoCalculs[i].inputMin.value) != dicoCalculs[i].inputMin.value && dicoCalculs[i].inputMin.value != ""))) {
//                 listeJF.push(rep == heure && dicoCalculs[i].inputMin.value == min ? "juste" : "faux");

//             } else {
//                 dicoCalculs[i].input.className = dicoCalculs[i].inputMin.className = "erreur"
//                 if (!prer) {
//                     dicoCalculs[i].input.focus();
//                     prer = true;
//                 }

//             }
//         } else {
//             if (dicoCalculs[i].input.value != "" || temps <= 0) {
//                 listeJF.push(rep == dicoCalculs[i].lisiCalc ? "juste" : "faux");
//             } else {
//                 dicoCalculs[i].input.className = "erreur";
//                 if (!prer) {
//                     dicoCalculs[i].input.focus();
//                     prer = true;
//                 }
//             }
//         }
//     }
//     if (!prer) { //compter les juste faux
//         for (var i = 0, c = listeJF.length; i < c; i++) {
//             dicoCalculs[i].input.className = listeJF[i];
//             if (dicoCalculs[i].input.className == "juste") {
//                 compteur += 1;
//             }
//             if (typeof dicoCalculs[i].inputMin != "undefined") {
//                 dicoCalculs[i].inputMin.className = listeJF[i];
//             }
//         }
//         pScore.textContent = "Votre score : ";
//         pScore.appendChild(document.createElement("span"));
//         pScore.lastChild.id = "frmScore";
//         var score = arrondi((compteur / listeJF.length) * 30) + "/30"
//         pScore.lastChild.textContent = score;
//         timerON = false
//     }
// };


// boutonFin.addEventListener("click", corriger);

// document.addEventListener("keyup", function (e) {
//     if (e.keyCode == 13) {
//         document.activeElement.blur()
//         corriger(e);
//     }
// });

// setInterval(function () {
//     if (timerON) {
//         temps--;
//         pTemps.textContent = "Il vous reste " + Math.floor(temps / 60) + " minutes et " + temps % 60 + " secondes."
//         if (temps <= 0) {
//             pTemps.textContent = "Le temps est écoulé !";
//             pTemps.style.color = "red";
//             listeInput = document.getElementsByTagName("input");
//             for (i = 0; i < listeInput.length; i++) {
//                 listeInput[i].readonly = true;
//                 listeInput[i].blur()
//             }
//             timerON = false;
//             confirm("Le temps est écoulé !")
//             boutonFin.click()
//         }
//     }
// }, 1000);