const userService = require("../data/services/userService");


async function findUserByUsername (req, res) {
    try {
        let user = await userService.findUserByUsername(req.body.username);
        return res.status(200).json({ user: user, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findUserByNameAndSurname (req, res) {
    try {
        let users = await userService.findUserByNameAndSurname(req.body.name, req.body.surname);
        return res.status(200).json({ users: users, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findUsersByCountry (req, res) {
    try {
        let users = await userService.findUsersByCountry(req.body.country);
        return res.status(200).json({ users: users, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function findUsersByNFollowers (req, res) {
    try {
        let users = await userService.findUsersByNFollowers(req.body.min, req.body.max);
        return res.status(200).json({ users: users, message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function registerUser (req, res) {
    try {
        await userService.registerUser(req.body.username, req.body.email, req.body.password, req.body.gender, req.body.name, req.body.surname, req.body.country, req.body.dob);
        return res.status(200).json({ message: "Task executed successfully"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function loginUser (req, res) {
    try {
        await userService.loginUser(req.body.username, req.body.password);
        return res.status(200).json({ message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function updateUserProfile (req,res){
    try {
        await userService.updateUserProfile(req.body.username, req.body.email, req.body.password, req.body.gender, req.body.name, req.body.surname, req.body.country, req.body.dob);
        return res.status(200).json({ message: "Task executed successfully"});

    }catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function deleteUser (req, res) {
    try {
        await userService.deleteUser(req.body.username);
        return res.status(200).json({ message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports = {findUserByUsername, findUserByNameAndSurname, findUsersByCountry, findUsersByNFollowers, registerUser, loginUser, updateUserProfile, deleteUser};
