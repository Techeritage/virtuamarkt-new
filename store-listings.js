const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {threshold: 0.5 });

sections.forEach((section) => {
    observer.observe(section);
});
//grab element for html page
const stBkImg = document.getElementById('bkimg');
const stLogo = document.getElementById('stlogo');
const products = document.getElementById('catprod');
const outView = document.getElementById("outview");
const div = document.querySelector(".show-conte");
const divImage = document.getElementById("show-img");
const divStoreName = document.getElementById("show-store-name");
const divName = document.getElementById("show-name");
const divPrice = document.getElementById("show-price");
const buttons = document.querySelectorAll(".button-value");
const alert = document.getElementById("alertBox4");

//get data from index.js
var urlParams = new URLSearchParams(window.location.search);
var storeIndex = urlParams.get("store");
var productsData = JSON.parse(localStorage.getItem("productsData"));
var cardDetails = productsData[storeIndex];
const productList = JSON.parse(localStorage.getItem('shoppingList')) || [];

//declare variables
var regina = cardDetails.name;
var bkImg = cardDetails.hero;
var logo = cardDetails.logo;
var prods = cardDetails.products;

//assign variables for store name, store bkimage and logo
document.getElementById("name").textContent = regina;
stBkImg.style.backgroundImage = `url(${bkImg})`;
stLogo.src = logo;

//craete product cards
prods.forEach((prod) => {

  const card = document.createElement('div');
  card.classList.add('card', prod.category, 'hide');
  const cardCont = document.createElement('div');
  cardCont.classList.add('cardcont');
  card.appendChild(cardCont);
  const imgCont = document.createElement('div');
  imgCont.classList.add('imgcont');
  cardCont.appendChild(imgCont);
  const prodImg = document.createElement('img');
  prodImg.src = prod.image;
  imgCont.appendChild(prodImg);
  const prodName = document.createElement('p');
  prodName.textContent = prod.name;
  cardCont.appendChild(prodName);
  const prodPrice = document.createElement('h4');
  const naira = "&#8358;";
  prodPrice.innerHTML = naira + prod.price;
  cardCont.appendChild(prodPrice);
  const shop = document.createElement('div');
  shop.textContent = "+";
  shop.classList.add("cart");
  card.appendChild(shop);

  //function to show product card details in full
  cardCont.addEventListener('click', ()=> displayCardDetail(prod));

  //function to add product to shopping list
  shop.addEventListener('click', () => {
    addToShoppingList(prod);
    // Call the function to update the cart icon
    updateShoppingCartIcon();
  });


  products.appendChild(card);
});

//product detail colse
outView.addEventListener('click', () => {
  div.style.bottom = "-100%";
});

//product detail for each cardCont
function displayCardDetail(prod) {
  div.style.bottom = "0";

  divName.textContent = prod.name;
  divPrice.innerHTML = "&#8358;" + prod.price;
  
  divImage.src = prod.image;
}

// Function to update the shopping cart icon
function updateShoppingCartIcon() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = productList.length; // Use the length of the productList
}

//add to shopping list
function addToShoppingList(prod) {
  productList.push(prod);
  localStorage.setItem('shoppingList', JSON.stringify(productList));
  
  //show success alert
  alert.style.display = "flex";
  setTimeout(function() {
  alert.style.display = "none";
  }, 2000);

  updateShoppingCartIcon();
}

// clear button function
const clear = document.getElementById('clear');
const input = document.getElementById('input');

input.addEventListener('input', ()=> {
  if(input.value.trim() !== "") {
    clear.style.display = "flex";
  } else {
    clear.style.display = "none";
  }
});

clear.addEventListener('click', ()=> {
  input.value = "";
  clear.style.display = "none";
});

//highlight active button and show product under it
function filterProduct(value) {
  //highlight active button with style
  buttons.forEach((button) => {
    const buttonText = button.innerText.replace(/\s/g, '');

    if (value.toUpperCase() == buttonText.toUpperCase()) {
      button.classList.add("wave");
      button.style.fontSize = "15px";
      button.style.fontWeight = "600";
      button.style.color = "black";
    } else {
      button.classList.remove("wave");
      button.style.fontSize = "13px";
      button.style.fontWeight = "400";
      button.style.color = "rgb(117 117 117)";
    }
  });

  //show product under active button
  let elements = document.querySelectorAll(".card");
  elements.forEach((element) => {
    if (element.classList.contains(value)) {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  });
}

//scroll carousel
const scrollBtn = document.querySelector(".catbtn");
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const scrollPosition = button.offsetLeft - (scrollBtn.clientWidth / 2) + (button.clientWidth / 2);

    scrollBtn.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  });
});

//back icon functionality
const backIcon = document.getElementById('back');
backIcon.addEventListener('click',function() {
  window.history.back();
});

//menu navigation
const close = document.getElementById("close");
const menuNav = document.getElementById("menu");

function show() {
  menuNav.style.right = "0";
}

close.addEventListener('click', () => {
  menuNav.style.right = "-100%";
});


//default active button
window.onload = () => {
  updateShoppingCartIcon();
  filterProduct("foodcupboard");
};