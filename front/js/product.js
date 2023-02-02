// RÉCUPÉRER L'ID DU PRODUIT CONTENU DANS L'URL
let str = location;
let url = new URL(str);
let monId = url.searchParams.get("id");

// faire un appel 'fetch' à l'api pour aller chercher la valeur de 'monId'
fetch(`http://127.0.0.1:3000/api/products/${monId}`, { method: 'GET' })
    .then(function (response) {
        return response.json()
    })
    .then(function (product) {

        // PLACER L'IMAGE
        let imageContainer = document.querySelector(".item__img");
        const imageProd = document.createElement('img');
        imageContainer.appendChild(imageProd);
        imageProd.setAttribute('alt', product.altTxt);
        imageProd.setAttribute('src', product.imageUrl);

        // PLACER LE TITRE
        let titleContainer = document.querySelector("#title");
        titleContainer.innerHTML = product.name;

        // PLACER LE PRIX
        let priceContainer = document.querySelector("#price");
        priceContainer.innerHTML = product.price;

        // PLACER LA DESCRIPTION
        let descContainer = document.querySelector("#description");
        descContainer.innerHTML = product.description;

        // PLACER LES CHOIX DE COULEURS
        let colorsContainer = document.querySelector("#colors");
        // On parcours le tableau 'colors' de l'élément 'product' (élément individuel du tableau 'products')
        // et on défini chaque élément de ce tableau 'colors' en tant que variable 'color'
        for (let color of product.colors) {
            //on crée dans le html une constante 'option'
            const option = document.createElement('option');
            //on assigne à cette option une valeur
            option.value = color;
            //on inscrit cette option dans le html
            option.innerHTML = color;
            //on ajoute cette option en tant que enfant dans 'colorsContainer'
            colorsContainer.appendChild(option);
        }
    })

/* ÉCOUTER LES CHOIX UTILISATEUR À ENVOYER AU LOCALSTORAGE
    On déclare une variable pour cibler le bouton 'Ajouter au panier'.
    On ajoute un écouteur d'évènement à ce bouton sur le clic qui appelle une fonction sans paramètres,
    puis on déclare une variable 'colorInput' pour stocker le choix de couleur
    puis une variable 'quantityInput' pour stocker le choix de quantité.

    Si le localStorage contient déjà un tableau 'prodStorage' (par un éventuel ajout précédent),
        on déclare une variable 'productsUsers' qui nous retourne les valeurs de prodStorage. 
        Ces valeurs sont retournés sous la forme d'un tableau.
        Cette variable 'productsUsers' est le tableau des choix utilisateur,
        -> on ajoute au tableau 'productsUsers' cet élément 'prodStorage' et ses valeurs associées.
    On met à jour le 'prodStorage' avec ces nouvelles données,
    et on vérifie dans la console le contenu du tableau : console.table(productsUsers);.

    Et si le localStorage ne contient rien,
        alors on crée dans le localStorage une clé 'prodStorage'. 
        -> Cette clé contiendra pour valeur un tableau contenant les ID, couleurs et quantités demandées.
*/

const buttonAddToCart = document.querySelector("#addToCart");

buttonAddToCart.addEventListener('click', function () {
    const colorInput = document.querySelector("#colors");
    const quantityInput = document.querySelector("#quantity");
    if (localStorage.getItem('prodStorage') !== null) {
        let productsUsers = JSON.parse(localStorage.getItem('prodStorage'));
        productsUsers.push({ 'id': monId, 'color': colorInput.value, 'quantity': quantityInput.value });
        localStorage.setItem('prodStorage', JSON.stringify(productsUsers));
    } else {
        localStorage.setItem('prodStorage', JSON.stringify([{ 'id': monId, 'color': colorInput.value, 'quantity': quantityInput.value }]));
    }
})