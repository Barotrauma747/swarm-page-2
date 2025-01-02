
//Elements
//const albums = document.querySelector('.');
const albumList = document.querySelectorAll('.album')
const itemForm = document.querySelectorAll('.item-form');
const signBtn = document.querySelectorAll('.btn2');
const counter = document.getElementById('cntr');


//Background-hover album cards
albumList.forEach(function (item) {
    
    item.addEventListener('mouseover', onMouseover)
    item.addEventListener('mouseout', onMouseout)
    
    function onMouseover () {
        item.style.backgroundColor = "#CCC";
    };

    function onMouseout () {
        item.style.backgroundColor = "#ffffff";
    };
});




console.log(albumList);