///  --- VARIABLES --- ///

/* Calling all products */
const father = document.getElementById("father");
/* Calling the purchase button */
const purchaseBtn = document.getElementById("purchase");
/* Calling the dropdown */
const tableCart = document.querySelector("#list__cart tbody");
/* Calling the clear button */
const clearCart = document.getElementById("clear");

let newItems = [];

loadAll();

///  --- EVENTS --- ///

function loadAll() {
	/*Purchase*/
	father.addEventListener("click", addItem);
	/*Erase purchase*/
	cart.addEventListener("click", deleteItem);
	/*Clear cart */
	clearCart.addEventListener("click", emptyItem);
}

///  --- FUNCTIONS --- ///

/* Purchase register */
// By selecting the father, we navigate inside of it //
function addItem(e) {
	if (e.target.classList.contains("shopping")) {
		let item = e.target.parentElement.parentElement;
		console.log(item);

		/*Only once per item */
		let button = e.target;
		button.setAttribute("disabled", "");

		dataEntry(item);
	}
}

function dataEntry(item) {
	const infoItem = {
		image: item.querySelector("img").src,
		title: item.querySelector("h2").textContent,
		price: item.querySelector(".value").textContent,
		quantity: 1,
	};
	/* Convert to array */
	newItems = [...newItems, infoItem];
	//console.log(newItems);

	/* Number of items inside */
	counter.textContent = newItems.length;

	/* For the next function */
	keepIn(newItems);
}

///  --- DROPDOWN --- ///
function keepIn(items) {
	const purchase = document.createElement("tr");
	items.forEach((item) => {
		purchase.innerHTML = `
        <td>
            <img src= "${item.image}" style = "width: 100%;"/>
        </td>
        <td> "${item.title}"</td>
        <td> "${item.quantity}" </td>
        <td> "${item.price}" </td>
        
        <td>
            <a href="#" class = "delete" data-id= "${item.id}"> x </a>
        </td>`;
	});
	//console.log(purchase);
	tableCart.appendChild(purchase);
}

/// --- DELETE --- ///

function deleteItem(e) {
	if (e.target.classList.contains("delete")) {
		const currentItem = e.target.parentElement.parentElement;
		const itemId = currentItem.querySelector("a").getAttribute("data-id");
		console.log(itemId);

		currentItem.remove();
	}
}

/// --- DELETE ALL --- ///

function emptyItem(e) {
	e.preventDefault();
	tableCart.innerHTML = "";
}
