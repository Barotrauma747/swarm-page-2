
//Elements
const albums = document.querySelector('.album');
const itemForm = document.querySelectorAll('.item-form');
const signBtn = document.querySelectorAll('.btn2');




function onMouseover () {
    albums.style.borderColour = "#CCC"
    albums.style.border = "solid 3px"
};

function onMouseout () {
    albums.style.border = "0px";
}

console.log(albums);


//Event Listeners
albums.addEventListener('mouseover', onMouseover);
albums.addEventListener('mouseout', onMouseout);