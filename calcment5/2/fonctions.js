//JSCalcment v2.3 Helluy 2020

var TABLEAU = document.getElementById("calculs"),
    timerON = false,
    ID = 0;

function isNumber(str) {
    var last, first = str.length;
    str = str.replace(/ /g,"");
    for (var i = 0, c = str.length ; i < c ; i++){
        if (str.charAt(i) != 0 || (str.charAt(i) == 0 && str.charAt(i+1) == ",")){
            last = i;
            break;
        }
    }
    if (/[,\.]/.test(str)){
        str = str.replace(/,/g,".");
        for (var i = str.length ; i > 0 ; i--){
            if (str.charAt(i) != 0 || str.charAt(i-1) != 0){
                first = i;
                break;
            }
        }
    }
    str = str.substring(last,first);
    return !(isNaN(parseFloat(str)) || str != parseFloat(str));
}

function CalculRep(calc, compl = "", result = undefined, type = "auto") {

    this.nb = ID;

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
        replace(/\//g, "÷").replace(/\.{1,1}/g, ",").replace(/\$\,\$/g, ".").replace(/\$\÷\$/g, "/").replace(/,{2,}/g, function(str){
            return str.replace(/,/g,".");
        }).
        replace(/i\$([0-9]+)/g,"<img src='quest$1.jpg' alt='quest$1img'>").split("!");
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
            this.elements.inputs[i].type = "text";
        } else {
            if (i % 2 == 0) {
                this.elements.inputs.push(document.createElement("input"));
                this.elements.inputs[i].id = "calcn" + ID + "_" + i + "a";
                this.elements.inputs[i].placeholder = "Heure(s)";
                this.elements.inputs[i].type = "text";
            } else {
                this.elements.inputs.push(document.createElement("input"));
                this.elements.inputs[i].id = "calcn" + ID + "_" + i + "b";
                this.elements.inputs[i].placeholder = "Minute(s)";
                this.elements.inputs[i].type = "text";
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
    this.clearClass = function () {
        for (var i = 0; i < this.elements.inputs.length; i++) {
            var classes = this.elements.inputs[i].className.split(" "),
                newClasses = [];
            for (var j = 0; j < classes.length; j++) {
                if (classes[j] != "juste" && classes[j] != "faux" && classes[j] != "erreur") {
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
                if (this.elements.inputs[i].value == "") {
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

    this.setCorriger = function (juste) {
        for (var i = 0; i < this.elements.inputs.length; i++) {
            this.elements.inputs[i].className = juste ? "juste" : "faux";
        }
    }

    this.isCorrect = function (autoset = true) {
        var corrects = []
        for (var i = 0; i < this.elements.inputs.length; i++) {
            if (this.type == "nb") {
                if (this.autoNb) {// SI le résultat a été calculé automatiquement
                    corrects.push(Math.round(eval(this.calc.replace(/ /g,"")) * 100000) / 100000 == parseFloat(this.elements.inputs[i].value.replace(/,/g,".").replace(/ /g,"")));
                } else {
                    corrects.push(parseFloat(this.result[i]) == parseFloat(this.elements.inputs[i].value.replace(/,/g,".").replace(/ /g,"")));
                }
            } else if (this.type == "heure" && i % 2 == 0) { //Si il s'agit d'une heure
                corrects.push(parseFloat(this.result[i / 2].split(":")[0]) == parseFloat(this.elements.inputs[i].value)
                    && parseFloat(this.result[i / 2].split(":")[1]) == parseFloat(this.elements.inputs[i + 1].value));
            } else if (this.type == "str") {
                corrects.push(this.elements.inputs[i].value.trim() == this.result[i]);
            }
        }
        for (var i = 0; i < corrects.length; i++) {
            if (corrects[i] == false) {
                if (autoset) {
                    this.setCorriger(false);
                }
                return false;
            }
        }
        if (autoset) {
            this.setCorriger(true);
        }
        return true;
    }


    //Définit ce qui se passe lorsque les inputs sont focus et blur
    this.eventFocus = function (e) {
        timerON = true;
        obj.clearClass();
    };
    this.eventBlur = function (e) {
        obj.areErrors();
    };
    this.addEventListener = function (event, funct) {
        for (var i = 0, obj = this; i < this.elements.inputs.length; i++) {
            this.elements.inputs[i].addEventListener(event, funct);
        }
    }
    for (var i = 0, obj = this; i < this.elements.inputs.length; i++) {
        this.elements.inputs[i].addEventListener("focus", this.eventFocus);
        this.elements.inputs[i].addEventListener("blur", this.eventBlur);
    }
    //Ajout 2.2 : Remplace automatiquement les symboles par les chiffres associés pour les nombres
        //Ne fonctionne pas pour le 6 des claviers dits Windows car la même touche est utilisé pour le -
        //Fonctionne pour tous les chiffres sur claviers Mac (aucun symbole "réservé")
        //A une protection de touches réservées(blocage de la fonctionnalité) (, + - . /) pour des claviers de configuration bizaroïde...
    if (this.type == "nb" || this.type == "heure"){
        this.addEventListener("keydown",function(e){
            if (~[48,49,50,51,52,53,54,55,56,57].indexOf(e.keyCode) && !~["-",",","+",".","/"].indexOf(e.key)){
                e.preventDefault();
                var start = e.currentTarget.selectionStart;
                e.currentTarget.value = e.currentTarget.value.substring(0,start) + (e.keyCode - 48) + 
                e.currentTarget.value.substring(e.currentTarget.selectionEnd,e.currentTarget.value.length);
                e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1; //repositionnement du curseur
        }});
    }
/////////////////////////////////////////////////////////////////////////////////////
    //Permet de transformer le champ de réponse en boutons radios
    this.transformRadios = function (quest, listeChoix) {
        //Suppression des inputs existants
        for (var i = 0; i < this.elements.inputs.length; i++) {
            this.elements.inputs[i].parentNode.removeChild(this.elements.inputs[i])
        }
        this.elements.inputs = [];
        var lbd = {
            labels: [],
            boutons: [],
            divBoutons: []
        };
        //on crée un label et une case pour chaque choix
        for (var i = 0; i < listeChoix.length; i++) {
            lbd.divBoutons[i] = document.createElement("div");

            lbd.labels.push(document.createElement("label"));
            lbd.labels[i].textContent = listeChoix[i];
            lbd.labels[i].htmlFor = this.nb + listeChoix[i];
            lbd.divBoutons[i].appendChild(lbd.labels[i])

            lbd.boutons.push(document.createElement("input"));
            lbd.boutons[i].type = "radio";
            lbd.boutons[i].name = "quest" + (this.nb + 1) + "radio";
            lbd.boutons[i].style.display = "inline-block";
            lbd.boutons[i].id = this.nb + listeChoix[i];
            lbd.boutons[i].value = listeChoix[i];
            lbd.divBoutons[i].appendChild(lbd.boutons[i]);
        }
        this.elements.tdInputs.appendChild(document.createTextNode(quest));
        for (var i = 0; i < listeChoix.length; i++) {
            this.elements.tdInputs.appendChild(lbd.divBoutons[i]);
            this.elements.inputs.push(lbd.boutons[i]);
        }
        this.areErrors = function (autoset = true) {
            var ok = 0;
            for (var i = 0; i < this.elements.inputs.length; i++) {
                if (this.elements.inputs[i].checked) {
                    ok = 1;
                    break;
                }
            }
            if (ok) {
                return false;
            } else {
                if (autoset) {
                    this.setError()
                }
                return true;
            }
        }

        this.isCorrect = function (autoset = true) {
            var chec;
            for (var i = 0; i < this.elements.inputs.length; i++) {
                if (this.elements.inputs[i].checked) {
                    chec = this.elements.inputs[i].value;
                    break;
                }
            }
            if (chec == this.result[0]) {
                if (autoset) {
                    this.setCorriger(true);
                }
                return true;
            } else {
                if (autoset) {
                    this.setCorriger(false);
                }
                return false;
            }
        }

        this.setCorriger = function (jf) {
            this.elements.tdInputs.style.background = jf ? "rgba(26, 129, 0, 0.479)" : "rgba(255, 0, 0, 0.397)";
        };

        this.setError = function () {
            this.elements.tdInputs.style.background = "rgba(255, 145, 0, 0.521)";
            console.log(this.elements.inputs[0])
            this.elements.inputs[0].focus();
        };
        this.clearClass = function () {
            this.elements.tdInputs.style.background = "";
        }

        this.addEventListener("change", this.eventFocus);
        
    }
    ID += 1;
}