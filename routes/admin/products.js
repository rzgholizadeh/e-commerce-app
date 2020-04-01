const express = require("express");
const { check, validationResult } = require("express-validator");

const productsRepo = require("../../repositories/products");
const productsNewTemplate = require("../../views/admin/products/new");
const { requireTitle, requirePrice } = require("./validators");

const router = express.Router();

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
	res.send(productsNewTemplate({}));
});

router.post("/admin/products/new", [requireTitle, requirePrice], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
	}
	req.on("data", data => {
		console.log(data.toString());
	});

	res.send("submitted");
});

module.exports = router;
