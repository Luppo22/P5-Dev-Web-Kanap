// On appelle l'API via fetch
fetch('http://127.0.0.1:3000/api/products/', { method: 'GET' })
  .then(function (response) {
    return response.json()
  })
  .then(function (products) {

    // créer une variable 'itemsContainer' dans '#items'
    var itemsContainer = document.querySelector("#items");

    // Pour chaque élément 'product' du tableau 'products'
    for (let product of products){

      // CRÉATION DU LIEN
      let productId = product._id;
      const link = document.createElement('a');
      itemsContainer.appendChild(link);
      link.href = `product.html?id=${productId}`;
      const article = document.createElement('article');
      link.appendChild(article);

      // CRÉATION DE L'IMAGE
      const image = document.createElement('img');
      article.appendChild(image);
      image.setAttribute('alt',product.altTxt);
      image.setAttribute('src',product.imageUrl);

      // CRÉATION DU TITRE (H3)
      const productName = document.createElement('h3');
      productName.innerText = product.name;
      article.appendChild(productName);

      // CRÉATION DU TEXTE DE DESCRIPTION (P)
      const productDescription = document.createElement('p');
      productDescription.innerText = product.description;
      article.appendChild(productDescription);
    }
  })