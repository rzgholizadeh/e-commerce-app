const express = require("express");
const cartsRepo = require("../repositories/carts");
const productsRepo = require("../repositories/products");
const cartShowTemplate = require("../views/carts/show");

const router = express.Router();

router.post("/cart/products", async (req, res) => {
	let cart;
	if (!req.session.cartId) {
		// create a cart
		cart = await cartsRepo.create({ items: [] });
		// store the cartId on req.session.cartId
		req.session.cartId = cart.id;
	} else {
		// a cart exists with this id
		cart = await cartsRepo.getOne(req.session.cartId);
	}
	const existingItem = cart.items.find(item => item.id === req.body.productId);
	if (existingItem) {
		// increament quantitiy
		existingItem.quantity++;
	} else {
		// add the item to the cart
		cart.items.push({ id: req.body.productId, quantity: 1 });
	}
	await cartsRepo.update(cart.id, {
		items: cart.items
	});

	res.redirect("/");
});

router.get("/cart", async (req, res) => {
	if (!req.session.cartId) {
		return res.redirect("/");
	}
	const cart = await cartsRepo.getOne(req.session.cartId);
	for (let item of cart.items) {
		const product = await productsRepo.getOne(item.id);
		item.product = product;
	}
	res.send(cartShowTemplate({ items: cart.items }));
});

module.exports = router;
