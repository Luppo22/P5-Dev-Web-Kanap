/* Récupération de l'id dans l'url et l'afficher dans la page
*/
let str = location;
let url = new URL(str);
let recuperationId = url.searchParams.get("id");
//console.log (recuperationId)

let idSelector = document.getElementById("orderId");
idSelector.innerHTML = "<br><br><strong>" + recuperationId;

//Vider localStorage
localStorage.removeItem("prodStorage");