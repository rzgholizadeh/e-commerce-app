const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repositories/users");

const app = express();

// applying middleware globally
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: ["someRandomCharacters"] // the encryption key
	})
);

app.get("/signup", (req, res) => {
	res.send(`
        <div>
            ID: ${req.session.userId}
            <form method="POST">
                <input name="email" placeholder="email"/>
                <input name="password" placeholder="password"/>
                <input name="passwordConfirmation" placeholder="password confirmation"/>
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

app.post("/signup", async (req, res) => {
	const { email, password, passwordConfirmation } = req.body;
	const existingUser = await usersRepo.getOneBy({ email });
	if (existingUser) {
		return res.send("Email already in use");
	}
	if (password !== passwordConfirmation) {
		return res.send("Passwrods must match");
	}

	const user = await usersRepo.create({ email, password });
	req.session.userId = user.id;

	res.send("Account created.");
});

app.get("/signout", (req, res) => {
	req.session = null;
	res.send("logged out");
});

app.get("/signin", (req, res) => {
	res.send(`  
    <div>
        <form method="POST">
            <input name="email" placeholder="email"/>
            <input name="password" placeholder="password"/>
            <button>Sign In</button>
        </form>
    </div>
`);
});

app.post("/signin", async (req, res) => {
    
});

app.listen(7000, () => {
	console.log("Listening...");
});
