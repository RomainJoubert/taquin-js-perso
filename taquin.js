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
        let fullCase = tab[i][j];
        tab[i][j] = newEmptyCase;
        tab[emptyCase.i][emptyCase.j] = fullCase;

        // console.log("empty " + fullCase);
        draw();
        youWin();
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
function mix(tab){
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
    for(i = 0; i < tab.length; i++) {
        for(j = 0 ; j < tab.length; j ++) {
            if (tab[i][j] !== refTab[i][j]) {
                return false;
            }
        }
    }
    alert("Vous avez gagné !");
};


$(document).ready(function () {
    $("#reinitialize").on('click', function () {
        $("#reinitialize").off('click');
        for (let i = 0; i < tab.length; i++) {
            $("table").append("<tr class='row" + i + "'></tr>");
            for (let j = 0; j < tab.length; j++) {
                $(".row" + i).append("<td id='c" + tab[i][j] + "' class='cas" + j + "'>" + tab[i][j] + "</td>");
                $('.row' + i + ' .cas' + j).click(function () {
                    permute(i, j);

                })
            }

        }

    });
    $("#mix").click(function () {
        for (let a = 0; a < 100; a++) {
            let emptyCase = emptyPosition();
            mixWithPermute(emptyCase.i, emptyCase.j);
        }
    });

    $("#aleatoire").click(function () {
        mix(tab);
    });

});


