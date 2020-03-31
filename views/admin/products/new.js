const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors }) => {
	return layout({
		content: `
            <form method="POST">
                <input placecholder="Title" name="title" />
                <input placecholder="Price" name="price" />
                <input type="file" name="image" />
                <button>Submit</button>
            </form>
        `
	});
};
