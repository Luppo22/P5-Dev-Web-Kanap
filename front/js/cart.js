// créer une variable 'userProduct' qui récupère les valeurs de la clé 'prodStorage' du localStorage
let userProducts = JSON.parse(localStorage.getItem('prodStorage'));

if (userProducts) {
    initializeProducts();

    let orderButton = document.querySelector("#order");
    orderButton.addEventListener("click", (eventOnClick) => {
        // désactiver l'envoi par defaut du bouton "Commander" //
        eventOnClick.preventDefault();
        validerlacommande();
    });
}

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

                /* CRÉATION DE LA BALISE HTML 'ARTICLE'
                On crée une variable 'articleElement' (qui viendra dans cartContainer qui est dans '#cart__items'),
                dans laquelle on va créer une balise html 'article' */
                let articleElement = document.createElement('article');
                // On ajoute à cet élément html la classe css 'cart__item'
                articleElement.className = "cart__item";
                // On assigne 'articleElement' en tant que enfant dans 'cartContainer'
                cartContainer.appendChild(articleElement);

                /* CRÉATION DE LA BALISE HTML 'DIV' ("cart__item__img") CONTENANT L'IMAGE
                On crée une variable 'divImage' dans laquelle on va créer une balise html 'div'*/
                let divImage = document.createElement('div');
                // On ajoute à cet élément html 'div' la classe css 'cart__item__img'
                divImage.className = "cart__item__img";
                // On crée une variable 'productImage' dans laquelle on va créer une balise html 'img'
                let productImage = document.createElement('img');
                // créer le texte alternatif de 'image'
                productImage.setAttribute('alt', productApi.altTxt);
                // créer l'url' de 'image'
                productImage.setAttribute('src', productApi.imageUrl);
                // On assigne 'divImage' en tant que enfant de 'articleElement'
                articleElement.appendChild(divImage);
                // On assigne 'productImage' en tant que enfant de 'divImage'
                divImage.appendChild(productImage);

                /* CRÉATION DE LA BALISE HTML 'DIV'("cart__item__content") 
                On crée une variable 'divCartItemContent' dans laquelle on va créer une balise html 'div'*/
                let divCartItemContent = document.createElement('div');
                // On assigne 'divCartItemContent' en tant que enfant de 'article'
                articleElement.appendChild(divCartItemContent);
                // On ajoute à cet élément html 'div' la classe css 'cart__item__content'
                divCartItemContent.className = "cart__item__content";

                /* CRÉATION DE LA BALISE HTML 'DIV'("cart__item__content__description") CONTENANT TITRE, PRIX 
                On crée une variable 'divCartItemContent' dans laquelle on va créer une balise html 'div'*/
                let divCartItemContentDescr = document.createElement('div');
                // On ajoute à cet élément html 'div' la classe css 'cart__item__content'
                divCartItemContentDescr.className = "cart__item__content__description";
                // On assigne 'divCartItemContentDescr' en tant que enfant de 'divCartItemContent'
                divCartItemContent.appendChild(divCartItemContentDescr);

                // PLACER LE TITRE
                // On crée une variable 'titleContainer' dans laquelle on va créer une balise 'h2'
                let titleContainer = document.createElement('h2');
                // On crée dedans un contenu qui est le selecteur 'name' de 'productsApi'
                titleContainer.innerHTML = productApi.name;
                // On assigne 'titleContainer' en tant que enfant de 'divCartItemContent'
                divCartItemContentDescr.appendChild(titleContainer);

                // PLACER LA COULEUR CHOISIE
                // On crée une variable 'colorContainer' dans laquelle on va créer une balise 'p'
                let colorContainer = document.createElement('p');
                // On crée dedans un contenu qui est le selecteur 'color' de 'productItem'
                colorContainer.innerHTML = productItem.color;
                // On assigne 'colorContainer' en tant que enfant de 'divCartItemContentDescr'
                divCartItemContentDescr.appendChild(colorContainer);

                // PLACER LE PRIX
                // On crée une variable 'priceContainer' dans laquelle on va créer une balise 'p'
                let priceContainer = document.createElement('p');
                // On crée dedans un contenu qui est le selecteur 'price' de 'productsApi'
                //colorContainer.innerHTML = prodStorage.color;
                priceContainer.innerHTML = productApi.price + ' €';
                // On assigne 'priceContainer' en tant que enfant de 'divCartItemContent'
                divCartItemContentDescr.appendChild(priceContainer);


                /* CRÉATION DE LA BALISE HTML 'DIV'("cart__item__content__settings") CONTENANT QUANTITÉ 
                On crée une variable 'divCartItemContent' dans laquelle on va créer une balise html 'div'*/
                let divCartItemContentSet = document.createElement('div');
                // On ajoute à cet élément html 'div' la classe css 'cart__item__content__settings'
                divCartItemContentSet.className = "cart__item__content__settings";
                // On assigne 'divCartItemContentSet' en tant que enfant de 'divCartItemContent'
                divCartItemContent.appendChild(divCartItemContentSet);


                // CRÉATION DE LA DIV ("cart__item__content__settings__quantity") 
                let divCartItemContentSetQuant = document.createElement('div');
                // On ajoute à cet élément html 'div' la classe css 'cart__item__content__settings'
                divCartItemContentSetQuant.className = "cart__item__content__settings__quantity";
                // On assigne 'divCartItemContentSetQuant' en tant que enfant de 'divCartItemContentSet'
                divCartItemContentSet.appendChild(divCartItemContentSetQuant);


                // PLACER LA QUANTITÉ CHOISIE
                // On crée une variable 'quantityContainer' dans laquelle on va créer une balise 'p'
                let quantityContainer = document.createElement('p');
                // On crée dedans un contenu qui est le selecteur 'quantity' de 'productItem'
                quantityContainer.innerHTML = `Qté : `;
                // On assigne 'quantityContainer' en tant que enfant de 'divCartItemContent'
                divCartItemContentSetQuant.appendChild(quantityContainer);
                // On crée une variable 'quantityInput' dans laquelle on va créer une balise 'input'
                let quantityInput = document.createElement('input');

                quantityInput.addEventListener('change', function () {

                    totalProductsEuros += productApi.price * productItem.quantity;
                    showTotalPrice(totalProductsEuros);
                });

                // On crée dans cet 'input' un contenu qui est le selecteur 'quantity' de 'productItem'
                quantityInput.value = productItem.quantity;
                quantityInput.min = 1;
                quantityInput.max = 100;
                // On ajoute à cet élément la classe css 'itemQuantity', le type et le nom
                quantityInput.className = "itemQuantity";
                quantityInput.type = 'number';
                quantityInput.name = "itemQuantity";
                // On assigne 'quantityInput' en tant que enfant de 'divCartItemContent'
                divCartItemContentSetQuant.appendChild(quantityInput);


                // CRÉATION DE LA DIV ("cart__item__content__settings__delete") 
                let divCartItemContentSetDel = document.createElement('div');
                // On assigne 'divCartItemContentSetDel' en tant que enfant de 'divCartItemContentSet'
                divCartItemContentSet.appendChild(divCartItemContentSetDel);
                // On y ajoute la classe 'cart__item__content__settings__delete' à cette div
                divCartItemContentSetDel.className = "cart__item__content__settings__delete";
                // On crée un texte 'p' dans une variable 'divCartItemContentSetDelTxt'
                let deleteItem = document.createElement('p');
                // On ajoute à 'p' la classe 'deleteItem'
                deleteItem.className = "deleteItem";
                // on défini le contenu de ce texte
                deleteItem.innerHTML = 'supprimer';
                // On assigne 'divCartItemContentSetDelTxt' en tant que enfant de 'divCartItemContentSetDel'
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
// déclaration du regex utilisé pour l'adresse' 
let addressRegex = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

//validation du prénom
function validateFirstName(inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    // si la valeur de 'inputFirstName' est vide
    if (inputFirstName.value === '') {
        //alors on affiche ce message d'alerte
        return firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
    // si la valeur de 'inputFirstName' ne corresponds pas à 'nameRegex'
    if (!nameRegex.test(inputFirstName.value)) {
        //alors on affiche ce message d'alerte
        return firstNameErrorMsg.innerHTML = 'Format non correct.';
    }
    // et si ça corresponds à 'nameRegex'
    else {
        //alors on efface les messages d'alerte
        return firstNameErrorMsg.innerHTML = '';
    }
};
//validation du nom
function validateLastName(inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    // si la valeur de 'inputLastName' est vide
    if (inputLastName.value === '') {
        //alors on affiche ce message d'alerte
        return lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
    // si la valeur de 'inputLastName' ne corresponds pas à 'nameRegex'
    if (!nameRegex.test(inputLastName.value)) {
        //alors on affiche ce message d'alerte
        lastNameErrorMsg.innerHTML = 'Format non correct.';
    }
    // et si ça corresponds à 'nameRegex'
    else {
        //alors on efface les messages d'alerte
        return lastNameErrorMsg.innerHTML = '';
    }
};
//validation de l'adresse
const validateAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;
    // si la valeur de 'inputAddress' est vide ''
    if (inputAddress.value === '') {
        //alors on affiche ce message d'alerte
        return addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
    // et si la valeur de 'inputAddress' n'est pas conforme à 'addressRegex'
    if (!addressRegex.test(inputAddress.value)) {
        //alors on affiche ce message d'alerte
        return addressErrorMsg.innerHTML = 'Format non correct.';
    }
    // et si ça corresponds à 'addressRegex'
    else {
        //alors on efface les messages d'alerte
        return addressErrorMsg.innerHTML = '';
    }
};
//validation de la ville
const validateCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;
    // si la valeur de 'inputCity' est vide ''
    if (inputCity.value === '') {
        //alors on affiche ce message d'alerte
        return cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
    // et si la valeur de 'inputCity' n'est pas conforme à 'cityRegex'
    if (!nameRegex.test(inputCity.value)) {
        //alors on affiche ce message d'alerte
        return cityErrorMsg.innerHTML = 'Format non correct.';
    }
    // et si ça corresponds à 'cityRegex'
    else {
        //alors on efface les messages d'alerte
        return cityErrorMsg.innerHTML = '';
    }
};
//validation de l'email
let mailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
const validateEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;
    // si la valeur de 'inputEmail' est vide ''
    if (inputEmail.value === '') {
        //alors on affiche ce message d'alerte
        return emailErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
    }
    // et si la valeur de 'inputEmail' n'est pas conforme à 'mailRegex'
    if (!mailRegex.test(inputEmail.value)) {
        //alors on affiche ce message d'alerte
        emailErrorMsg.innerHTML = 'Format non correct.';
    }
    else {
        //alors on efface les messages d'alerte
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

// On liste
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
