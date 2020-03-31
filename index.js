const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");

const app = express();

// applying middleware globally (order matters)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: ["someRandomCharacters"] // the encryption key
	})
);
app.use(authRouter);

app.listen(7000, () => {
	console.log("Listening...");
});
