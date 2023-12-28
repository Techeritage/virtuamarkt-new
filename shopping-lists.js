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

//create product card for shopping list
const shoppingList = document.getElementById('shopping-list');
const productList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Initialize the total amount
let totalAmount = 0;
const emptydiv = document.getElementById("empty-alert");

function displayShoppingList() {
  shoppingList.innerHTML = '';
  productList.forEach((product) => {
    //class and id of the product card
    const uniqueId = product.id;
    const shopCard = document.createElement('div');
    shopCard.classList.add('shopcard');
    shopCard.id = `product-${uniqueId}`;

    const initialQuantity = product.quantity || 1; // Use a default of 1 if quantity is missing
    const productName = product.name || 'Product Name'; // Use a default if name is missing
    const productPrice = product.price || 0;

    //price times count div
    const pricedetail = document.createElement('div');
    pricedetail.classList.add("pricedetail");
    
    shopCard.appendChild(pricedetail);

    //product image container and image
    const shopCardImgCont = document.createElement('div');
    shopCardImgCont.classList.add('shopcard-img-cont');
    shopCard.appendChild(shopCardImgCont);
    const shopCardImg = document.createElement('img');
    shopCardImg.src = product.image;
    shopCardImgCont.appendChild(shopCardImg);

    //product details container
    const shopCardDetailCont = document.createElement('div');
    shopCardDetailCont.classList.add('shopcard-detail-cont');
    shopCard.appendChild(shopCardDetailCont);

    
    const shopCardDetail1 = document.createElement('div');
    shopCardDetail1.classList.add('shopcard-detail1');
    shopCardDetailCont.appendChild(shopCardDetail1);
    const shopCardTitle = document.createElement('p');
    shopCardTitle.textContent = productName;
    shopCardDetail1.appendChild(shopCardTitle);

    const shopCardDetail2 = document.createElement('div');
    shopCardDetail2.classList.add('shopcard-detail2');
    shopCardDetailCont.appendChild(shopCardDetail2);
    const shopCardPrice = document.createElement('h5');
    const naira = "&#8358;";
  
    shopCardDetail2.appendChild(shopCardPrice);

    const shopCardQuant = document.createElement('div');
    shopCardQuant.classList.add('shopcard-quant');

    const minusBtn = document.createElement('button');
    minusBtn.innerHTML = "&#8722;";
    minusBtn.classList.add('minus-btn');
    shopCardQuant.appendChild(minusBtn);

    const quant = document.createElement('span');
    quant.classList.add('quant');
    quant.id = "quant";
    shopCardQuant.appendChild(quant);

    const plusBtn = document.createElement('button');
    plusBtn.innerHTML = "&#43;";
    plusBtn.classList.add('plus-btn');
    shopCardQuant.appendChild(plusBtn);

    // Retrieve and display the quantity from localStorage
    let count = initialQuantity;
    quant.textContent = count;
    pricedetail.innerHTML = count + " &#215; " + naira + productPrice;
    const tot = count * productPrice;
    shopCardPrice.innerHTML = naira + tot;
    
    const storedProduct = productList.find((p) => p.id === uniqueId);
    if (storedProduct) {
      count = storedProduct.quantity;
    }

    plusBtn.addEventListener('click', () => {
      if (count >= 1) {
        count++;
      }
      quant.textContent = count;
      pricedetail.innerHTML = count + " &#215; " + naira + productPrice;
      const tot = count * productPrice;
      shopCardPrice.innerHTML = naira + tot;
      
      // Update the quantity in the shopping list in localStorage
      const storedProductIndex = productList.findIndex((p) => p.id === uniqueId);
      if (storedProductIndex !== -1) {
        productList[storedProductIndex].quantity = count;
        localStorage.setItem('shoppingList', JSON.stringify(productList));
      }

        // Update the total
      updateTotal();
    });

    minusBtn.addEventListener('click', () => {
      if (count > 1) {
        count--;
      }
      quant.textContent = count;
      pricedetail.innerHTML = count + " &#215 " + naira + productPrice;
      const tot = count * productPrice;
      shopCardPrice.innerHTML = naira + tot;
      
      // Update the quantity in the shopping list in localStorage
      const storedProductIndex = productList.findIndex((p) => p.id === uniqueId);
      if (storedProductIndex !== -1) {
        productList[storedProductIndex].quantity = count;
        localStorage.setItem('shoppingList', JSON.stringify(productList));
      }
        // Update the total
      updateTotal();
    });

    shopCardDetail2.appendChild(shopCardQuant);

    const shopCardDel = document.createElement('div');

    const delIcon = '<ion-icon name="trash-outline"></ion-icon>'
    shopCardDel.innerHTML = delIcon;
    shopCardDel.onclick = function () {
      removeFromShoppingList(uniqueId);
    };

    shopCardDetail2.appendChild(shopCardDel);

    shoppingList.appendChild(shopCard);
  });
}

if (productList.length == 0) {
  emptydiv.style.display = "block";
} else {
  emptydiv.style.display = "none";
  displayShoppingList();
}

// Function to update the total
function updateTotal() {
  totalAmount = 0;
  productList.forEach((product) => {
    const quantity = product.quantity || 1; // Use a default of 1 if quantity is missing
    const price = product.price || 0; // Use a default price if missing
    totalAmount += quantity * price;
  });

  // Update the "Total" div with the calculated total amount
  const totalDiv = document.getElementById('total');
  totalDiv.innerHTML = `&#8358;${totalAmount.toFixed(2)}`;
}

// Call updateTotal to initialize the total when the shopping list page loads
updateTotal();

//delete button function
function removeFromShoppingList(uniqueId) {
  const index = productList.findIndex((product) => product.id === uniqueId);
  
  if (index !== -1) {
    productList.splice(index, 1);

    localStorage.setItem('shoppingList', JSON.stringify(productList));
  }

  const productCard = document.getElementById(`product-${uniqueId}`);
  if (productCard) {
    productCard.remove();
  }
   // Update the total
   updateTotal();
   updateShoppingCartIcon();

   if (productList.length == 0) {
    emptydiv.style.display = "block";
  } else {
    emptydiv.style.display = "none";
    displayShoppingList();
  }
}

// Function to update the shopping cart icon
function updateShoppingCartIcon() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = productList.length; // Use the length of the productList
}

//call shopping cart icon
updateShoppingCartIcon();


//back icon functionality
const backIcon = document.getElementById('back');
backIcon.addEventListener('click',function() {
  window.history.back();
});

//footer nav active
const currentPage = window.location.pathname.split('/').pop();

switch (currentPage) {
  case 'index.html':
    document.getElementById("home-link").innerHTML = "<ion-icon name='home'></ion-icon> Home";
    document.getElementById("home-link").style.color ="rgb(0, 54, 172)";
    break;
  case 'stores-page.html':
    document.getElementById("stores-link").innerHTML = "<ion-icon name='storefront'></ion-icon> stores";
    document.getElementById('stores-link').style.color = "rgb(0, 54, 172)";
    break;
  case 'shopping-lists.html':
    document.getElementById("shopping-list-link").innerHTML = "<ion-icon name='cart'></ion-icon> shopping-list <div class='cart-count'><span id='cart-count'></span></div>";
    document.getElementById('shopping-list-link').style.color = "rgb(0, 54, 172)";
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