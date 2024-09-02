//
// #perso.position_face_1       : Bas
// #perso.position_gauche_1
// #perso.position_droite_1
// #perso.position_dos_1        : Haut
//
// ANIMER UNE DIRECTION (posirtion du bonhomme).
// MOTEUR (setInterval) qui doit faire que #perso,
// passe de .position_face_1 à .position_face_2
// Donc enlever la class .position_face_1 et la remplacer par .position_face_2
// 2 => 3 ....
// arriver à 12 on repart en 1.

// DEPLACEMENT AU CLAVIER
//
//
//

//--------------------------------<div id='perso' class='position_dos_1'></div>
let largeurWin = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let hauteurWin = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;


let personnage = document.querySelector('#perso');
let num = 1;
let maxNum = 13;
let animeTourne_b = false;
let timerId;
let pernum = 1;
let positionBH = "";
let largeurEtiquetteRouge = 5;
let margeX = 95 + largeurEtiquetteRouge;
let margeY = 160 + largeurEtiquetteRouge;
let posBH = { x: 50, y: 500, maxX: largeurWin - margeX, maxY: hauteurWin - margeY, pasX: 7, pasY: 7 };

let action = { bas: false, gauche: false, haut: false, droit: false }


// evenement RESIZE
// si on redimensionne le navigateur, je redemande, la valeur de sa largeur.
window.onresize = function() {
    //console.log('largeurWin ' + largeurWin);
    largeurWin = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    hauteurWin = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // here the marge is given to x and y on top of the red tag size for that it doesnt goes out of the border 
    posBH.maxX = largeurWin - margeX;
    posBH.maxY = hauteurWin - margeY;

    if (posBH.x > posBH.maxX) {
        posBH.x = posBH.maxX;
    }

    if (posBH.y > posBH.maxY) {
        posBH.y = posBH.maxY;
    }
}

function afficheBH(_num) {

    console.log(_num);
    for (let i = 0; i < maxNum; i++) {
        //personnage.classList.remove('position_face_' + i);
        personnage.classList.remove('position_gauche_' + i);

    }
    //personnage.classList.add('position_face_' + _num);
    personnage.classList.add('position_gauche_' + _num);

}

window.onload = function() {
    initClock();

    bougePersonnage();
}

setInterval(function() {

    bougePersonnage();

}, 80); // 20fps, jeux sont en 30fps, les dessins animés : 12fps (80ms)

//---------------------------------------- PLAY AND STOP
function playPer() {
    if (animeTourne_b == false) {
        timerId = setInterval(function() {

            bougePersonnage();

        }, 50);
        animeTourne_b = true;
    }

}

function stopPer() {
    clearInterval(timerId);
    animeTourne_b = false;
}

//----------------------------------------------- ACTION CLAVIER

// when the key is pressed in our keyboard. 
// e stands for an event and code is variable of event which stores our key detail
// here in this switch case we are just setting true to the boolean value for the pressed key in our keyboard
window.onkeydown = function(e) {
    switch (e.code) {
        case "ArrowDown":
            action.bas = true;
            break;
        case "ArrowUp":
            action.haut = true;
            break;

        case "ArrowRight":
            action.droit = true;
            break;

        case "ArrowLeft":
            action.gauche = true;
            break;

        default:
            break;
    }
}

// here the boolean is set to false when the key is released 
window.onkeyup = function(e) {
    switch (e.code) {
        case "ArrowDown":
            action.bas = false;
            break;
        case "ArrowUp":
            action.haut = false;
            break;
        case "ArrowRight":
            action.droit = false;
            break;
        case "ArrowLeft":
            action.gauche = false;
            break;
    }
}

//------------------------------------------------------------ MAIN FUNCTION INSIDE SETINTERVAL
function bougePersonnage() {

    //--------------------------------------------------------
    // Position clavier ... x,y
    //
    if (action.bas) {
        if (posBH.y < posBH.maxY) {
            posBH.y += posBH.pasY;
        }
        positionBH = "face";
    }
    if (action.haut) {
        if (posBH.y > largeurEtiquetteRouge) {
            posBH.y -= posBH.pasY;
        }
        positionBH = "dos";

    }
    if (action.droit) {
        if (posBH.x < posBH.maxX) {
            posBH.x += posBH.pasX;
        }
        positionBH = "droite";

    }
    if (action.gauche) {
        if (posBH.x > 2 * largeurEtiquetteRouge) {
            posBH.x -= posBH.pasX;
        }
        positionBH = "gauche";

    }


    // if (posBH.y > maxY || posBH < 0) {
    //     posBH.y += -1;
    // }
    personnage.style.top = posBH.y + "px";
    personnage.style.left = posBH.x + "px";

    //--------------------------------------------------------
    // Position CSS
    //

    // Annuler toutes les positions
    //enlever la class position_face_1 si ca exist.

    personnage.className = "";

    // personnage.classList.remove('position_' + positionBH + '_' + num);

    // a verifier is num est entre 1 et 12

    num++;
    if (num == maxNum) {
        num = 1;
    }

    personnage.classList.add('position_' + positionBH + '_' + num);
    //personnage.setAttribute("data-imagecle", '"' + num + '"'); // si num = 3; "3"
    personnage.setAttribute("data-imagecle", "" + num); // si num = 3; "3"

}


//                      num
// bougePersonnage      1       2
// bougePersonnage      2       3

//bougePersonnage       12      1 (max)


// bougePersonnage      1      2