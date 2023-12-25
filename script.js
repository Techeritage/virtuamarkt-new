//typing text animation
const textToDisplay = "Your Ultimate Food Price Guide";
  const text = document.getElementById("text");
  const cursor = document.getElementById("cursor");
  let letterIndex = 0;

  function type() {
    if (letterIndex < textToDisplay.length) {
      text.textContent += textToDisplay.charAt(letterIndex);
      letterIndex++;
      setTimeout(type, 100);
    }
  }

  type();

  //copyright date function
const date = new Date();
const year = date.getFullYear();

document.getElementById("year").textContent = year;
  
//craete full store data with their products
const stores = [
  {
    name: 'Shoprite',
    bkimage: 'images/background/shoprite-bk.jpeg',
    hero: 'images/hero/bk1.jpg',
    logo: 'images/logo/shoprite-logo.jpeg',
    products: [
      {
        name: 'Mama pride parboiled rice - 10kg',
        price: 5000,
        image: 'images/product/product1.jpg',
        category: 'foodcupboard',
        id: 1,
        quantity: 1,
      },
      {
        name: 'Milo chocolate - 350g',
        price: 2500,
        image: 'images/product/product2.jpg',
        category: 'breakfast',
        id: 2,
        quantity: 1,
      },
      {
        name: 'Nestle golden morn - 900g',
        price: 1500,
        image: 'images/product/product3.jpg',
        category: 'lunch',
        id: 3,
        quantity: 1,
      },
      {
        name: 'Kings pure vegetable oil - 2ltrs',
        price: 2700,
        image: 'images/product/product4.jpg',
        category: 'dinner',
        id: 4,
        quantity: 1,
      },
      {
        name: 'Nivea cocoa body lotion - 400ml',
        price: 1900,
        image: 'images/product/product5.jpg',
        category: 'supper',
        id: 5,
        quantity: 1,
      },
      {
        name: 'Ayoola potato flour - 500g',
        price: 1600,
        image: 'images/product/product6.jpg',
        category: 'soup',
        id: 6,
        quantity: 1,
      }
    ],
  },
  {
    name: 'Spar',
    bkimage: 'images/background/spar-bk.jpeg',
    hero: 'images/hero/bk2.jpg',
    logo: 'images/logo/Spar.webp',
    products: [
      {
        name: 'rice',
        price: 5000,
        image: 'images/product/product1.jpg',
        category: 'foodcupboard',
        id: 7,
        quantity: 1,
      },
      {
        name: 'milo',
        price: 2500,
        image: 'images/product/product2.jpg',
        category: 'breakfast',
        id: 8,
        quantity: 1,
      },
      {
        name: 'Golden morn',
        price: 1500,
        image: 'images/product/product3.jpg',
        category: 'lunch',
        id: 9,
        quantity: 1,
      },
      {
        name: 'Kings vegetable oil',
        price: 2700,
        image: 'images/product/product4.jpg',
        category: 'dinner',
        id: 10,
        quantity: 1,
      },
      {
        name: 'Nivea body cream',
        price: 1900,
        image: 'images/product/product5.jpg',
        category: 'supper',
        id: 11,
        quantity: 1,
      },
      {
        name: 'Ayoola Poundo Yam',
        price: 1600,
        image: 'images/product/product6.jpg',
        category: 'soup',
        id: 12,
        quantity: 1,
      }
    ],
  },
  {
    name: 'Bokku',
    bkimage: 'images/background/bokku-bk2.jpeg',
    hero: 'images/hero/bk3.jpg',
    logo: 'images/logo/bokku-logo.png',
    products: [
      {
        name: 'rice',
        price: 5000,
        image: 'images/product/product1.jpg',
        category: 'foodcupboard',
        id: 13,
        quantity: 1,
      },
      {
        name: 'milo',
        price: 2500,
        image: 'images/product/product2.jpg',
        category: 'breakfast',
        id: 14,
        quantity: 1,
      },
      {
        name: 'Golden morn',
        price: 1500,
        image: 'images/product/product3.jpg',
        category: 'lunch',
        id: 15,
        quantity: 1,
      },
      {
        name: 'Kings vegetable oil',
        price: 2700,
        image: 'images/product/product4.jpg',
        category: 'dinner',
        id: 16,
        quantity: 1,
      },
      {
        name: 'Nivea body cream',
        price: 1900,
        image: 'images/product/product5.jpg',
        category: 'supper',
        id: 17,
        quantity: 1,
      },
      {
        name: 'Ayoola Poundo Yam',
        price: 1600,
        image: 'images/product/product6.jpg',
        category: 'soup',
        id: 18,
        quantity: 1,
      }
    ],
  }
];

//save data for interconnection within  the webpage
localStorage.setItem("productsData", JSON.stringify(stores));

//create cards that display store in the homepage
const storeCont = document.getElementById('stcard');

for (let i = 0; i < 3; i++) {
  const store = stores[i];

  const storeCard = document.createElement("div");
  storeCard.classList.add("store-card");
  const bkImage = `url(${store.bkimage})`;
  storeCard.style.backgroundImage = bkImage;

  // Use an IIFE to capture the current value of i
  (function(index) {
    storeCard.addEventListener('click', () => {
      window.location.href = "store-listings.html?store=" + index;
    });
  })(i); // Pass the current value of i to the IIFE

  storeCont.appendChild(storeCard);
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

//menu navigation
const close = document.getElementById("close");
const menuNav = document.getElementById("menu");

function show() {
  menuNav.style.right = "0";
}

close.addEventListener('click', () => {
  menuNav.style.right = "-100%";
});
const productList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to update the shopping cart icon
function updateShoppingCartIcon() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = productList.length; // Use the length of the productList
}

//call shopping cart icon
updateShoppingCartIcon();

window.onload = () => {
  document.getElementById("home-link").style.color ="rgb(0, 54, 172)";
};
