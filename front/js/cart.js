// créer une variable 'userProduct' qui récupère les valeurs de la clé 'prodStorage' du localStorage
let userProducts = JSON.parse(localStorage.getItem('prodStorage'));

// On parcours le tableau userProducts, en créant une variable 'productItem'(chaque item stocké dans le localStorage)
// et pour chacune de ces items …
function initializeProducts() {
    // CRÉATION DES ÉLÉMENTS HTML DANS LA SECTION '#cart__items'
    // créer une variable 'cartContainer' dans '#cart__items'
    let cartContainer = document.querySelector("#cart__items");
    let totalProductsQuantity = 0;
    let totalProductsEuros = 0;

    userProducts.forEach(productItem => {
        //on fait un appel à l'API via fetch
        fetch(`http://127.0.0.1:3000/api/products/${productItem.id}`, { method: 'GET' })
            .then(function (response) {
                return response.json()
            })
            .then(function (productApi) {
                /* Pour les ID sélectionnées, affiche dans la console toute les valeurs des clés 
                du tableau 'products'(colors, _id, name, price, imageUrl, description, altTxt)
                console.log(productApi);*/

                /* CRÉATION DE LA BALISE HTML 'ARTICLE'*/
                let articleElement = document.createElement('article');
                articleElement.className = "cart__item";
                cartContainer.appendChild(articleElement);

                /* CRÉATION DE LA BALISE HTML 'DIV' ("cart__item__img") CONTENANT L'IMAGE*/
                let divImage = document.createElement('div');
                divImage.className = "cart__item__img";
                let productImage = document.createElement('img');
                productImage.setAttribute('alt', productApi.altTxt);
                productImage.setAttribute('src', productApi.imageUrl);
                articleElement.appendChild(divImage);
                divImage.appendChild(productImage);

                /* CRÉATION DE LA BALISE HTML 'DIV'("cart__item__content") */
                let divCartItemContent = document.createElement('div');
                articleElement.appendChild(divCartItemContent);
                divCartItemContent.className = "cart__item__content";

                /* CRÉATION DE LA BALISE HTML 'DIV'("cart__item__content__description") CONTENANT TITRE, PRIX */
                let divCartItemContentDescr = document.createElement('div');
                divCartItemContentDescr.className = "cart__item__content__description";
                divCartItemContent.appendChild(divCartItemContentDescr);

                // PLACER LE TITRE
                let titleContainer = document.createElement('h2');
                titleContainer.innerHTML = productApi.name;
                divCartItemContentDescr.appendChild(titleContainer);

                // PLACER LA COULEUR CHOISIE
                let colorContainer = document.createElement('p');
                colorContainer.innerHTML = productItem.color;
                divCartItemContentDescr.appendChild(colorContainer);

                // PLACER LE PRIX
                let priceContainer = document.createElement('p');
                priceContainer.innerHTML = productApi.price + ' €';
                divCartItemContentDescr.appendChild(priceContainer);

                /* CRÉATION DE LA BALISE HTML 'DIV'("cart__item__content__settings") CONTENANT QUANTITÉ */
                let divCartItemContentSet = document.createElement('div');
                divCartItemContentSet.className = "cart__item__content__settings";
                divCartItemContent.appendChild(divCartItemContentSet);

                // CRÉATION DE LA DIV ("cart__item__content__settings__quantity") 
                let divCartItemContentSetQuant = document.createElement('div');
                divCartItemContentSetQuant.className = "cart__item__content__settings__quantity";
                divCartItemContentSet.appendChild(divCartItemContentSetQuant);


                // PLACER LA QUANTITÉ CHOISIE
                // On crée une variable 'quantityContainer' dans laquelle on va créer une balise 'p'
                // On crée dedans un contenu qui est le selecteur 'quantity' de 'productItem'
                // On assigne 'quantityContainer' en tant que enfant de 'divCartItemContent'
                // On crée une variable 'quantityInput' dans laquelle on va créer une balise 'input'
                // On crée dans cet 'input' un contenu qui est le selecteur 'quantity' de 'productItem'
                // On ajoute à cet élément la classe css 'itemQuantity', le type et le nom
                // On assigne 'quantityInput' en tant que enfant de 'divCartItemContent'

                let quantityContainer = document.createElement('p');
                quantityContainer.innerHTML = `Qté : `;
                divCartItemContentSetQuant.appendChild(quantityContainer);
                let quantityInput = document.createElement('input');
                quantityInput.value = productItem.quantity;
                quantityInput.min = 1;
                quantityInput.max = 100;
                quantityInput.className = "itemQuantity";
                quantityInput.type = 'number';
                quantityInput.name = "itemQuantity";
                divCartItemContentSetQuant.appendChild(quantityInput);

                // On met à jour le prix total lorsque la quantité est modifié dans la page
                quantityInput.addEventListener('change', function () {
                    totalProductsEuros += productApi.price * productItem.quantity;
                    showTotalPrice(totalProductsEuros);
                });

                // CRÉATION DE L'ÉLÉMENT 'SUPPRIMER' ("cart__item__content__settings__delete") 
                let divCartItemContentSetDel = document.createElement('div');
                divCartItemContentSet.appendChild(divCartItemContentSetDel);
                divCartItemContentSetDel.className = "cart__item__content__settings__delete";
                let deleteItem = document.createElement('p');
                deleteItem.className = "deleteItem";
                deleteItem.innerHTML = 'supprimer';
                divCartItemContentSetDel.appendChild(deleteItem);
                deleteItem.addEventListener('click', function (event) {
                    userProducts = userProducts.filter(el => el.id !== productItem.id || el.color !== productItem.color);
                    localStorage.setItem("prodStorage", JSON.stringify(userProducts));
                    //console.log(userProducts);
                    location.reload();
                });

                // CALCUL DES QUANTITÉS D'ARTICLES + CALCUL DU PRIX TOTAL
                totalProductsQuantity += parseInt(productItem.quantity);
                showTotalQuantity(totalProductsQuantity);

                // Récupération du prix total
                totalProductsEuros += productApi.price * productItem.quantity;
                showTotalPrice(totalProductsEuros);
            })
    });
}

// Récupération du total des quantités
function showTotalQuantity(totaux) {
    let productTotalQuantityContainer = document.getElementById('totalQuantity');
    productTotalQuantityContainer.innerHTML = totaux;
}
function showTotalPrice(totalProductsEuros) {
    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalProductsEuros;
}

// CHECK FORMULAIRE
// on sélectionne le formulaire ayant la classe 'cart__order__form'
let formContainer = document.querySelector(".cart__order__form");

// déclaration du regex utilisé pour le prénom, le nom et la ville
let nameRegex = new RegExp("^[a-zA-Z ,.'-]+$");

//validation du prénom
function validateFirstName(inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (inputFirstName.value === '') {
        return firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
    if (!nameRegex.test(inputFirstName.value)) {
        return firstNameErrorMsg.innerHTML = 'Format non correct.';
    }
    else {
        return firstNameErrorMsg.innerHTML = '';
    }
};
//validation du nom
function validateLastName(inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (inputLastName.value === '') {
        return lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
    if (!nameRegex.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = 'Format non correct.';
    }
    else {
        return lastNameErrorMsg.innerHTML = '';
    }
};
//validation de l'adresse
let addressRegex = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
function validateAddress(inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;
    if (inputAddress.value === '') {
        return addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
    if (!addressRegex.test(inputAddress.value)) {
        return addressErrorMsg.innerHTML = 'Format non correct.';
    }
    else {
        return addressErrorMsg.innerHTML = '';
    }
};
//validation de la ville
function validateCity(inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;
    if (inputCity.value === '') {
        return cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
    if (!nameRegex.test(inputCity.value)) {
        return cityErrorMsg.innerHTML = 'Format non correct.';
    }
    else {
        return cityErrorMsg.innerHTML = '';
    }
};
//validation de l'email
let mailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
function validateEmail(inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;
    if (inputEmail.value === '') {
        return emailErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
    if (!mailRegex.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = 'Format non correct.';
    }
    else {
        emailErrorMsg.innerHTML = '';
    }
};

// Ecoute de la modification du prénom avec l'id 'firstName'
formContainer.firstName.addEventListener('change', function () {
        validateFirstName(this);
});

// Ecoute de la modification du nom
formContainer.lastName.addEventListener('change', function () {
    validateLastName(this);
});

// Ecoute de la modification de l'adresse
formContainer.address.addEventListener('change', function () {
    validateAddress(this);
});

// Ecoute de la modification de la ville
formContainer.city.addEventListener('change', function () {
    validateCity(this);
});

// Ecoute de la modification du mail
formContainer.email.addEventListener('change', function () {
    validateEmail(this);
});

// On liste les données du formulaire, et les id d'articles
function createContactElement() {
    // SUBMIT COMMANDER
    //Récupération des données du formulaire
    let firstNameElement = document.getElementById('firstName');
    let lastNameElement = document.getElementById('lastName');
    let adressElement = document.getElementById('address');
    let cityElement = document.getElementById('city');
    let mailElement = document.getElementById('email');

    return {
        // créer l'objet 'contact'
        contact: {
            firstName: firstNameElement.value,
            lastName: lastNameElement.value,
            address: adressElement.value,
            city: cityElement.value,
            email: mailElement.value,
        },
        // créer un tableau 'products' avec la liste des Id de userProducts
        products: userProducts.map(product => product.id)
    }
}

function validerlacommande() {
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(createContactElement()),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            window.location = "confirmation.html?id=" + data.orderId;
        })
        .catch((error) => {
            alert("API HS : " + error);
        });
}

if (userProducts) {
    initializeProducts();

    let orderButton = document.querySelector("#order");
    orderButton.addEventListener("click", (eventOnClick) => {
        // désactiver l'envoi par defaut du bouton "Commander" //
        eventOnClick.preventDefault();
        validerlacommande();
    });
}