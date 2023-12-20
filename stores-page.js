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

var storesData = JSON.parse(localStorage.getItem("productsData"));

//create cards that display store in the homepage
const storeCont = document.getElementById('stcard');

storesData.forEach((store, index) => {
  const storeCard = document.createElement("div");
  storeCard.classList.add("store-cards");
  const bkImage = `linear-gradient(to right, rgba(0, 0, 0, 0.507), rgba(0, 0, 0, 0.507)), url('${store.bkimage}')`;
  storeCard.style.backgroundImage = bkImage;
  const storeName = document.createElement('p');
  storeName.textContent = `${store.name} supermarket`;
  storeCard.appendChild(storeName);

  storeCard.addEventListener('click', () => {
    window.location.href = "store-listings.html?store=" + index;
  })

  storeCont.appendChild(storeCard);
});

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

//back icon functionality
const backIcon = document.getElementById('back');
backIcon.addEventListener('click',function() {
  window.history.back();
});

//footer nav active
const currentPage = window.location.pathname.split('/').pop();

switch (currentPage) {
  case 'index.html':
    document.getElementById("home-link").style.color ="rgb(0, 54, 172)";
    break;
  case 'stores-page.html':
    document.getElementById('stores-link').style.color = "rgb(0, 54, 172)";
    break;
  case 'shopping-lists.html':
    document.getElementById('shopping-list-link').style.color = "rgb(0, 54, 172)";
    break;
    case 'more.html':
    document.getElementById('more-link').style.color = "rgb(0, 54, 172)";
    break;
}

const productList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to update the shopping cart icon
function updateShoppingCartIcon() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = productList.length; // Use the length of the productList
}

//call shopping cart icon
updateShoppingCartIcon();

//menu navigation
const close = document.getElementById("close");
const menuNav = document.getElementById("menu");

function show() {
  menuNav.style.right = "0";
}

close.addEventListener('click', () => {
  menuNav.style.right = "-100%";
});