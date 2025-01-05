
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
const total = document.querySelector('.balance')

//Album const
const pathogenesis = cardList.firstElementChild;
const abyss = pathogenesis.nextElementSibling;
const ruinous = abyss.nextElementSibling;
const pulsing = ruinous.nextElementSibling;

//console.log(abyss);

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


function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(function (item) {
        if (item === 'Pathogenesis') {
            addItemToDOM(pathogenesis)
        } else if (item === 'Abyss') {
            addItemToDOM(abyss) 
        } else if (item === 'Ruinous') {
            addItemToDOM(ruinous)
        } else if (item === 'Pulsing Convalescence') {
            addItemToDOM(pulsing)
        } else {
            console.log('album not yet in const');
        }
    })

    checkUI();
}


//Add Item to Cart

function addItemToCart (e) {

if (e.target.classList.contains('addToCart')) {;
//console.log(e.target.parentElement);

// albumList.forEach(function (item) {
//     item.addEventListener('click',addToCart);

    
            addItemToDOM(e.target.parentElement);

            addItemToStorage(e.target.parentElement.firstElementChild.nextElementSibling.firstElementChild.textContent);

            addPriceToStorage(e.target.parentElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.textContent)

            //console.log(e.target.parentElement);
        }
        checkUI()
    }


function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function addPriceToStorage(item) {
    const pricesFromStorage = getPricesFromStorage();

    pricesFromStorage.push(item);

    localStorage.setItem('prices', JSON.stringify(pricesFromStorage))
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


function getPricesFromStorage() {

    let pricesFromStorage;
    
    //Check if anything is in the local storage
    if(localStorage.getItem('prices') === null) {
        pricesFromStorage = []; 
    } else {
        pricesFromStorage = JSON.parse(localStorage.getItem('prices')); 
    }

    return pricesFromStorage; 
}


function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


function removePricesFromStorage(item) {
    let pricesFromStorage = getPricesFromStorage();

    //Filter out item to be removed without removing all duplicates
    let idx = pricesFromStorage.indexOf(item)
    if(idx >= 0) {
        pricesFromStorage.splice(idx,1)
    }

    //Explanation: the indexOf() method gives me the index number of the item (in this case the price - e.g. "9.99").
    //If that index number is bigger or equal to 0 (an index number of '-1' would be the output if that number didn't occur in the array).
    //Then I splice the array to modify the original array - here I use the idx output as my starting index-number (because that's my item number) and then remove only this one - so '.splice(starting index nr, amount of numbers to be removed)

    // pricesFromStorage = pricesFromStorage.filter((i) => i !== item);

    // Re-set to local storage
    localStorage.setItem('prices', JSON.stringify(pricesFromStorage));
}


function sumOfPrices () {
    const prices = getPricesFromStorage();
    const pricesNumber = prices.map(Number);
    
    let sum = 0;

    pricesNumber.forEach(num => sum += num);

    return sum.toFixed(2);
}
//console.log(sumOfPrices());


//Create li-Element
function addItemToDOM (arg) {
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
    
    //console.log(arg2);

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
    price.textContent = `${arg2.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.textContent}`
    const curr = document.createElement('div');
    curr.className = "price";
    curr.textContent = '$';

    const packageVersion = document.createElement('div');
    packageVersion.className = "package-form";
    
    const select = document.createElement('select');
    select.id = "package-version";
    select.name = "Choose Version";
    select.innerHTML = '<option value="1">Digipack</option><option value="2">Jewel Case</option>';

    packageVersion.appendChild(select);
    albumInfo.appendChild(albumName);
    albumInfo.appendChild(price);
    albumInfo.appendChild(curr);
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
        removeItemFromStorage(item.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.textContent);

        //Remove price from storage
        removePricesFromStorage(item.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.textContent)
        
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
    checkUI();
}


function newsletterSignUp(e) {
    if(e.target.classList.contains('signup-btn')) {
        alert('You are signed up for the ITS Newsletter')
    }
}


function checkUI() {

    const items = itemList.querySelectorAll('li');
    total.textContent = `Total: ${sumOfPrices()}$`;

    if (items.length === 0) {
        checkOutBtn.style.display = 'none';
        clearBtn.style.display = 'none';
    } else {
        checkOutBtn.style.display = 'block';
        clearBtn.style.display = 'block';
    }


}

checkUI();

itemList.addEventListener('click', onClickItem);
shoppingCart.addEventListener('click', clearAll);
cardList.addEventListener('click', addItemToCart)
document.addEventListener('DOMContentLoaded', displayItems);
document.addEventListener('click', newsletterSignUp);


