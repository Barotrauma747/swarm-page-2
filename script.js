
//Elements
const albumList = document.querySelectorAll('.album');
const shoppingCart = document.querySelector('.shopping-cart')
const cartItem = document.querySelectorAll('li')
const cardList = document.querySelector('.cards');
const itemList = document.querySelector('.item-list');
const itemForm = document.querySelectorAll('.item-form');
const signBtn = document.querySelectorAll('.btn2');
const counter = document.getElementById('cntr');
const crtBtn = document.querySelectorAll('.addToCart');
const rmvBtn = document.querySelectorAll('.remove-item-btn');
const checkOutBtn = document.querySelector('#checkout-btn');
const clearBtn = document.querySelector('.clearAll');

//console.log(shoppingCart);

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
            addItemtoDOM(item);
            addItemToStorage(item.firstElementChild.nextElementSibling.firstElementChild.textContent);
        }
    }
    checkUI()
});


function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {

    let itemsFromStorage;
    
    //Check if anything is in the local storage
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = []; 
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items')); 
    }

    return itemsFromStorage; 
}

//Create li-Element
function addItemtoDOM (arg) {
    const li = document.createElement('li');
    li.className = "item";

    const remCntSec = removeAndCounterSection(arg);
    const itemInfoSec = itemInfo(arg);

    li.appendChild(itemInfoSec);
    li.appendChild(remCntSec);
    itemList.appendChild(li);

    checkUI();
}

//Create Item-Info section
function itemInfo (arg2) {
    
    // console.log(arg2.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.textContent);

    const div = document.createElement('div');
    div.className = "item-info";

    const image = document.createElement('img');
    image.src = arg2.firstElementChild.src;

    const albumInfo = document.createElement('div');
    albumInfo.className = "album-info";

    const albumName = document.createElement('div');
    albumName.className = "album-Name";
    albumName.innerHTML = `<strong>${arg2.firstElementChild.nextElementSibling.firstElementChild.textContent}</strong>`;

    const price = document.createElement('div');
    price.className = "price";
    price.textContent = `${arg2.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.textContent}${arg2.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.textContent}`;

    const packageVersion = document.createElement('div');
    packageVersion.className = "package-form";
    
    const select = document.createElement('select');
    select.id = "package-version";
    select.name = "Choose Version";
    select.innerHTML = '<option value="1">Digipack</option><option value="2">Jewel Case</option>';

    packageVersion.appendChild(select);
    albumInfo.appendChild(albumName);
    albumInfo.appendChild(price);
    albumInfo.appendChild(packageVersion);
    div.appendChild(image);
    div.appendChild(albumInfo);

    return div;

}


//Create Remove Button and Counter Div
function removeAndCounterSection () {

        const div = document.createElement('div');
        div.className = "item-nmbr-rmv";
        

        const counter = document.createElement('form');
        counter.className = "item-nmbr";
        counter.innerHTML = '<input type="number" class="cntr" value="1" min="0" style="width:3em">';
    

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
        //Remove item from DOM
        item.remove();

        //Remove item from storage
        //removeItemFromStorage(item.textContent);

        checkUI();
}


//Clear Cart Button
function clearAll (e) {
    if (e.target.classList.contains('clearAll')){
        localStorage.clear();
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild)
        }
    }
}

function checkUI() {

    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        checkOutBtn.style.display = 'none';
        clearBtn.style.display = 'none';
    } else {
        checkOutBtn.style.display = 'block';
        clearBtn.style.display = 'block';
    }
}


itemList.addEventListener('click', onClickItem);
shoppingCart.addEventListener('click', clearAll);

