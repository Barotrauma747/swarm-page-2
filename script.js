
//Elements
//const albums = document.querySelector('.');
const albumList = document.querySelectorAll('.album')
const itemForm = document.querySelectorAll('.item-form');
const signBtn = document.querySelectorAll('.btn2');

albumList.forEach(function (item) {
    
    item.addEventListener('mouseover', onMouseover)
    item.addEventListener('mouseout', onMouseout)
    
    function onMouseover () {
        item.style.borderColour = "#CCC";
        item.style.border = "solid 1px";
    };

    function onMouseout () {
        item.style.border = "0px";
    };
});




console.log(albumList);