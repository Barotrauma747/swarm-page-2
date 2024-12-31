
//Elements
const albums = document.querySelectorAll('.album');
const itemForm = document.querySelectorAll('.item-form');
const signBtn = document.querySelectorAll('.btn2');


//Event Listeners
albums.addEventListener('mouseover', highLightItem);

function highLightItem () {
    albums.style.backgroundColor = "#CCC"
}

console.log(albums);