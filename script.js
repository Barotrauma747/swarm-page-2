
//Elements
const albumList = document.querySelectorAll('.album')
const itemList = document.querySelector('.item-list');
const itemForm = document.querySelectorAll('.item-form');
const signBtn = document.querySelectorAll('.btn2');
const counter = document.getElementById('cntr');
const crtBtn = document.querySelectorAll('.addToCart');
const rmvBtn = document.querySelectorAll('.remove-item-btn');

console.log(itemList);

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


//Add Item to Cart

albumList.forEach(function (item) {
    item.addEventListener('click', addToCart);

    function addToCart(e) {
        if (e.target.classList.contains('addToCart')) {
            console.log('works')
            addItemtoDOM();
        }
    }
})

//Create li-Element
function addItemtoDOM () {
    const li = document.createElement('li');
    li.className = "item";

    const remCntSec = removeAndCounterSection();

    li.appendChild(remCntSec);
    itemList.appendChild(li);
}

//Create 


//Create Remove Button and Counter Div
function removeAndCounterSection () {

        const div = document.createElement('div');
        div.className = "item-nmbr-rmv";
        

        const counter = document.createElement('form');
        counter.className = "item-nmbr";
        counter.innerHTML = '<input type="number" id="cntr" value="1" style="width:3em">';
    

        const button = document.createElement('button');
        button.className = "remove-item-btn";
        button.innerText = "Remove";

        div.appendChild(counter);
        div.appendChild(button);

        return div;
        //console.log(div);
}


// //Remove-Button
function onClickItem(e) {
     if (e.target.parentElement.classList.contains('item-nmbr-rmv')) {
         removeItem(e.target.parentElement.parentElement);
        }
}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        //Remove item from DOM
        item.remove();

        //Remove item from storage
        //removeItemFromStorage(item.textContent);

        //checkUI();
    }
}

itemList.addEventListener('click', onClickItem);