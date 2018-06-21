let taille = 4;
let tab = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, " "]
];
let refTab = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, " "]
];

function draw() {
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab.length; j++) {
            $('.row' + i + ' .cas' + j).html(tab[i][j]);

        }
    }
}

//recherche les coordonnées x,y de la case vide
function emptyPosition() {

    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab.length; j++) {
            if (tab[i][j] === " ") {
                return {"i": i, "j": j};
            }
        }
    }
}

//vérifie que la cellule voisine est vide
function cellIsEmpty(i, j) {
    return (cellExist(i, j) && (tab[i][j] === " "));
}

//vérifie que la cellule existe
function cellExist(i, j) {
    return ((i >= 0 && i < taille) && (j >= 0 && j < taille));
}

//vérfie que la cellule pleine est permutable avec la cellule voisine qui doit être vide
function cellPermutable(i, j) {
    return (cellIsEmpty(i, j - 1)
        || cellIsEmpty(i, j + 1)
        || cellIsEmpty(i - 1, j)
        || cellIsEmpty(i + 1, j))
}

//permute la cellule vide avec la cellule pleine
function permute(i, j) {
    if (!cellExist(i, j)) {
        return;
    }

    // où est la case vide ?
    let emptyCase = emptyPosition(); // retourne un objet
    console.log(emptyCase);

    // est-ce permutable ?
    let casePerm = cellPermutable(i, j);
    console.log("p " + casePerm);
    console.log("i " + i);
    console.log("j " + j);
    //récupère la valeur de la cellule pleine

    // permuter
    if (casePerm === true) {
        //récupére la valeur de la cellule vide
        let newEmptyCase = tab[emptyCase.i][emptyCase.j];
        tab[emptyCase.i][emptyCase.j] = tab[i][j];
        tab[i][j] = newEmptyCase;


        // console.log("empty " + fullCase);
        draw();
        // youWin();
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function mixWithPermute(i, j) {

    let tirage = getRandom(0, 4);
    console.log("t " + tirage);
    if (tirage == 0 && cellPermutable(i, j - 1)) {
        permute(i, j - 1);
    }
    else if (tirage == 1 && cellPermutable(i, j + 1)) {
        permute(i, j + 1);
    }
    else if (tirage == 2 && cellPermutable(i + 1, j)) {
        permute(i + 1, j);
    }
    else if (tirage == 3 && cellPermutable(i - 1, j)) {
        permute(i - 1, j);
    }
};


// function pour faire un mélange aléatoire
function mix(tab) {

    let simpleArray = [];
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab.length; j++) {
            simpleArray.push(tab[i][j]);
        }
    }
    for (var x = simpleArray.length - 1; x > 0; x--) {
        var rand = Math.floor(Math.random() * (x + 1));
        var temp = simpleArray[x];

        simpleArray[x] = simpleArray[rand];
        simpleArray[rand] = temp;
    }
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab.length; j++) {
            tab[i][j] = simpleArray[tab.length * i + j];
        }
    }
    draw();
};

function youWin() {
    for (i = 0; i < tab.length; i++) {
        for (j = 0; j < tab.length; j++) {
            if (tab[i][j] !== refTab[i][j]) {
                return false;
            }
        }
    }
    alert("Vous avez gagné !");
};

//fonction qui vérifie la parité de la case vide
function parityV() {
    let caseVide = emptyPosition();
    let sum = caseVide.i + caseVide.j;
    let par;
    if (sum % 2 === 0) {
        par = "pair";
    } else {
        par = "impair";
    }
    return par;
}

//fonction qui vérifie la parité des permutations
function countPermutation(tableau) {
    let simpleArray = [];
    let tmp;
    let compteur = 0;
    let par;
    for (let i = 0; i < tableau.length; i++) {
        for (let j = 0; j < tableau.length; j++) {
            simpleArray.push(tableau[i][j]);
        }
    }
    for(let i = 0; i < simpleArray.length; i++) {
        if (simpleArray[i] === " ") {
            simpleArray[i] = 16;
        }
    }

        for (let i = 0; i < simpleArray.length; i++) {
        let k = i;
        for (let j = i + 1; j < simpleArray.length; j++) {
            if (simpleArray[j] < simpleArray[k]) {
                k = j;
            }
        }
        console.log(simpleArray);

        if (k !== i) {
            tmp = simpleArray[k];
            simpleArray[k] = simpleArray[i];
            simpleArray[i] = tmp;
            compteur++;
        }
    }

    if (compteur % 2 === 0) {
        par = "pair";
    } else {
        par = "impair"
    }
    return par;
}

//fonction qui vérifie si la partie est gagnable
function winnable() {
    let pV = parityV();
    let pT = countPermutation(tab);
    console.log(pV);
    console.log(pT);
    if (pV === pT) {
        alert("Le jeu est résolvable");
        console.log("ok");
    } else {
        alert("Le jeu n'est pas résolvable");
        console.log("pas ok");

    }
}


$(document).ready(function () {
    $("#parity").hide(function () {
    $("#reinitialize").on('click', function () {
        $("#reinitialize").off('click');

        for (let i = 0; i < tab.length; i++) {
            $("table").append("<tr class='row" + i + "'></tr>");
            for (let j = 0; j < tab.length; j++) {
                $(".row" + i).append("<td id='c" + tab[i][j] + "' class='cas" + j + "'>" + tab[i][j] + "</td>");
                $('.row' + i + ' .cas' + j).click(function () {
                    permute(i, j);
                    youWin();
                })
            }
        }
    })
    });
    $("#mix").click(function () {
        for (let a = 0; a < 100; a++) {
            let emptyCase = emptyPosition();
            mixWithPermute(emptyCase.i, emptyCase.j);
        }
        $("#reinitialize").hide();
        $("#parity").show();
    });

    $("#aleatoire").click(function () {
        mix(tab);
        $("#parity").show();
    });
    $("#parity").click(function () {
        winnable();
        $("#parity").hide();
    });
    $("#game").click(function () {
        draw();
    })

});


