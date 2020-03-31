const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const productsRouter = require("./routes/admin/products");

const app = express();

// applying middleware globally (order matters)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: ["someRandomCharacters"] // the encryption key
	})
);
app.use(authRouter);
app.use(productsRouter);

app.listen(7000, () => {
	console.log("Listening...");
});
