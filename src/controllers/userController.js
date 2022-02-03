const userService = require("../data/services/userService");

async function getUser (req, res) {
    try {
        let user = await userService.getUser();
        return res.status(200).json({ user: user, message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports = {getUser};
