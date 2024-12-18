document.addEventListener('DOMContentLoaded', () => {  
    const searchBtn = document.getElementById('search-btn');  
    const searchInput = document.getElementById('search-input');  
    const addToCartButtons = document.querySelectorAll('.add-to-cart');  
    const cartCount = document.getElementById('cart-count');  
    let cartItems = localStorage.getItem('cartItems') ? parseInt(localStorage.getItem('cartItems')) : 0;  

    // Update the cart count display  
    cartCount.textContent = cartItems;  

    // Modal elements  
    const modal = document.getElementById('myModal');  
    const modalResult = document.getElementById('modal-result');  
    const closeModal = document.getElementsByClassName('close')[0];  

    // Search functionality  
    searchBtn.addEventListener('click', () => {  
        const query = searchInput.value.toLowerCase();  
        const products = document.querySelectorAll('.product');  
        products.forEach(product => {  
            const productName = product.querySelector('p').textContent.toLowerCase();  
            product.style.display = productName.includes(query) ? 'block' : 'none';  
        });  
    });  

    // Add to cart functionality  
    addToCartButtons.forEach(button => {  
        button.addEventListener('click', () => {  
            cartItems += 1;  
            cartCount.textContent = cartItems;  
            localStorage.setItem('cartItems', cartItems); // Save cart items to localStorage  
            notifyTransaction();  
        });  
    });  

    function notifyTransaction() {  
        alert('A new transaction has been made!');  
        console.log('Transaction notification sent.');  
    }  

    // Redirect to the shop page  
    function redirectToShop() {  
        console.log('Redirecting to shop...'); // Confirm function execution  
        setTimeout(() => {  
            window.location.href = 'shop.html'; // Redirect to the shop page  
        }, 2000); // Delay for 2 seconds to show the modal message  
    }  

    // Handle Sign In Form Submission  
    const signInForm = document.getElementById('sign-in-form');  
    if (signInForm) {  
        signInForm.addEventListener('submit', (e) => {  
            e.preventDefault();  
            const email = document.getElementById('email').value;  
            const password = document.getElementById('password').value;  

            // Basic validation  
            if (!email || !password) {  
                showModal('Please fill in all fields for sign in.');  
                return;  
            }  

            // Simulate successful login (replace with actual authentication logic)  
            localStorage.setItem('isLoggedIn', 'true'); // Set login status in localStorage  
            console.log('User signed in. Redirecting...'); // Log for debugging  
            showModal('Sign in successful! Redirecting to shop...');  
            redirectToShop(); // Call the redirect function  
        });  
    }  

    // Handle Register Form Submission  
    const registerForm = document.getElementById('register-form');  
    if (registerForm) {  
        registerForm.addEventListener('submit', (e) => {  
            e.preventDefault();  
            const registerEmail = document.getElementById('register-email').value;  
            const registerPassword = document.getElementById('register-password').value;  
            const confirmPassword = document.getElementById('confirm-password').value;  

            // Basic validation  
            if (!registerEmail || !registerPassword || !confirmPassword) {  
                showModal('Please fill in all fields for registration.');  
                return;  
            }  

            if (registerPassword !== confirmPassword) {  
                showModal('Passwords do not match.');  
                return;  
            }  

            // Simulate successful registration (replace with actual registration logic)  
            console.log('User registered. Redirecting...'); // Log for debugging  
            showModal('Registration successful! Redirecting to shop...');  
            redirectToShop(); // Call the redirect function  
        });  
    }  

    // Handle Sell Item Form Submission  
    const sellItemForm = document.getElementById('sell-item-form');  
    if (sellItemForm) {  
        sellItemForm.addEventListener('submit', (e) => {  
            e.preventDefault();  

            if (!localStorage.getItem('isLoggedIn')) {  
                showModal('You must be logged in to sell an item.');  
                return;  
            }  

            const itemName = document.getElementById('item-name').value;  
            const itemDescription = document.getElementById('item-description').value;  
            const itemPrice = document.getElementById('item-price').value;  
            const itemImage = document.getElementById('item-image').files[0];  

            // Basic validation  
            if (!itemName || !itemDescription || !itemPrice || !itemImage) {  
                showModal('Please fill in all fields to sell an item.');  
                return;  
            }  

            // Create a new item object  
            const newItem = {  
                name: itemName,  
                description: itemDescription,  
                price: parseFloat(itemPrice),  
                image: URL.createObjectURL(itemImage) // Create a URL for the image file  
            };  

            // Update the shop with the new item  
            updateShop(newItem);  
            showModal('Item submitted successfully!');  
            sellItemForm.reset();  
        });  
    }  

    // Function to update the shop  
    function updateShop(item) {  
        const shopItemsContainer = document.querySelector('.shop-items'); // Ensure this container exists in your HTML  
        const itemElement = document.createElement('div');  
        itemElement.classList.add('shop-item');  
        itemElement.innerHTML = `  
            <h4>${item.name}</h4>  
            <p>${item.description}</p>  
            <p>Price: $${item.price.toFixed(2)}</p>  
            <img src="${item.image}" alt="${item.name}" width="100">  
        `;  
        shopItemsContainer.appendChild(itemElement);  
    }  

    // Show modal function  
    function showModal(message) {  
        modalResult.innerText = message;  
        modal.style.display = 'block';  
    }  

    // Close modal function  
    closeModal.onclick = function () {  
        modal.style.display = 'none';  
    };  

    // Close modal when clicking outside of modal  
    window.onclick = function (event) {  
        if (event.target == modal) {  
            modal.style.display = 'none';  
        }  
    };  
});