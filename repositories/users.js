const fs = require("fs");
const crypto = require("crypto");

class UsersRepository {
	constructor(filename) {
		if (!filename) {
			throw new Error("Creating a repository requires a filename");
		}
		this.filename = filename;
		try {
			fs.accessSync(this.filename);
		} catch (err) {
			fs.writeFileSync(this.filename, "[]");
		}
	}

	async getAll() {
		return JSON.parse(
			await fs.promises.readFile(this.filename, {
				encoding: "utf8"
			})
		);
	}

	async create(attrs) {
		attrs.id = this.randomId();
		const records = await this.getAll();
		records.push(attrs);
		await this.writeAll(records);
	}

	async writeAll(records) {
		await fs.promises.writeFile(
			this.filename,
			JSON.stringify(records, null, 2)
		);
	}

	randomId() {
		return crypto.randomBytes(4).toString("hex");
	}

	async getOne(id) {
		const records = await this.getAll();
		return records.find(record => record.id === id);
	}

	async delete(id) {
		const records = await this.getAll();
		const filteredRecords = records.filter(record => record.id !== id);
		await this.writeAll(filteredRecords);
	}

	async update(id, attrs) {
		const records = await this.getAll();
		const record = records.find(record => record.id === id);
		if (!record) {
			throw new Error(`Record with id ${id} not found`);
		}
		Object.assign(record, attrs);
		await this.writeAll(records);
	}
}

// test
const test = async () => {
	const repo = new UsersRepository("users.json");

	//await repo.create({ email: "test@test.com", password: "testPass" });

	//const users = await repo.getAll();

	//const user = await repo.getOne("c39f5f69");

	//console.log(user);

	//await repo.delete("1d69f2a1");

	await repo.update("7f1c2052", { password: "Changed!!!" });
};

test();
