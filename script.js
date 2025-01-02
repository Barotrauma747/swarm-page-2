
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
            console.log(e.target.parentElement.firstElementChild);
            addItemtoDOM();
        }
    }
});

//Create li-Element
function addItemtoDOM () {
    const li = document.createElement('li');
    li.className = "item";

    const remCntSec = removeAndCounterSection();
    const itemInfoSec = itemInfo();

    li.appendChild(itemInfoSec);
    li.appendChild(remCntSec);
    itemList.appendChild(li);
}

//Create Item-Info section
function itemInfo () {
    const div = document.createElement('div');
    div.className = "item-info";

    const image = document.createElement('img');
    image.src = "./images/abyss.jpeg"

    const albumInfo = document.createElement('div');
    albumInfo.className = "album-info";

    const albumName = document.createElement('div');
    albumName.className = "album-Name";
    albumName.innerHTML = "<strong>Abyss</strong>";

    const price = document.createElement('div');
    price.className = "price";
    price.textContent = "9.99$";

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
        //Remove item from DOM
        item.remove();

        //Remove item from storage
        //removeItemFromStorage(item.textContent);

        //checkUI();
}

itemList.addEventListener('click', onClickItem);