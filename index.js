const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");

const app = express();

// applying middleware globally
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send(`
        <div>
            <form method="POST">
                <input name="email" placeholder="email"/>
                <input name="password" placeholder="password"/>
                <input name="passwordConfirmation" placeholder="password confirmation"/>
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

app.post("/", async (req, res) => {
	const { email, password, passwordConfirmation } = req.body;
	const existingUser = await usersRepo.getOneBy({ email });
	if (existingUser) {
		return res.send("Email already in use");
	}
	if (password !== passwordConfirmation) {
		return res.send("Passwrods must match");
    }
	res.send("Account created.");
});

app.listen(7000, () => {
	console.log("Listening...");
});
