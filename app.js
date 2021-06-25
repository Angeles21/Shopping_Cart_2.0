let newItems = [];

loadAll();

///  --- EVENTS --- ///

function loadAll() {
	/*Purchase*/
	document.getElementById("father").addEventListener("click", addItem);
	/*Erase purchase*/
	document.getElementById("cart").addEventListener("click", deleteItem);
	/*Clear cart */
	document.getElementById("clear").addEventListener("click", emptyItem);
}

///  --- FUNCTIONS --- ///

/* Purchase register */
// By selecting the document.getElementById("father"), we navigate inside of it //
function addItem(e) {
	if (e.target.classList.contains("shopping")) {
		let item = e.target.parentElement.parentElement;

		/*Only once per item */
		let button = e.target;
		button.setAttribute("disabled", "");
		dataEntry(item, button.getAttribute("data-id"));
	}
}

function dataEntry(item, id) {
	const infoItem = {
		image: item.querySelector("img").src,
		title: item.querySelector("h2").textContent,
		price: item.querySelector(".value").textContent,
		id,
		quantity: 1,
	};

	/* Convert to array */
	newItems = [...newItems, infoItem];
	//console.log(newItems);

	/* Number of items inside */
	document.getElementById("counter").textContent = `${newItems.length}`;

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
            <a href="#" class = "delete" data-id="${item.id}"> x </a>
        </td>`;
	});

	document.querySelector("#list__cart tbody").appendChild(purchase);
}

/// --- DELETE --- ///

function deleteItem(e) {
	if (e.target.classList.contains("delete")) {
		const currentItem = e.target.parentElement.parentElement;
		const itemId = parseInt(currentItem.querySelector("a").getAttribute("data-id"));
		const counter = document.getElementById("counter");

		/* Remove from cart counter */
		counter.textContent = `${parseInt(counter.textContent) - 1}`;

		/* Remove all from the table */
		currentItem.remove();
	}
}

/// --- DELETE ALL --- ///

function emptyItem(e) {
	e.preventDefault();
	document.querySelector("#list__cart tbody").innerHTML = "";
	document.getElementById("counter").textContent = "0";
	newItems = [];
}
