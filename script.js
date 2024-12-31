
//Elements
const albums = document.querySelector('.album');
const itemForm = document.querySelectorAll('.item-form');
const signBtn = document.querySelectorAll('.btn2');




function onMouseover () {
    albums.style.backgroundColor = "#CCC"
};

function onMouseout () {
    albums.style.backgroundColor = "#ffffff"
}

console.log(albums);


//Event Listeners
albums.addEventListener('mouseover', onMouseover);
albums.addEventListener('mouseout', onMouseout);