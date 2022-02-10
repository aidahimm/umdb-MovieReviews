const mongoDriver = require("../../Mongo");
const User = require("../models/user");

async function findUserByID(uid){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return await db.collection("users").findOne({userID: uid});
    } catch (e) {
        console.log(e);
    }
}

async function findUserByNameAndSurname(name, surname){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("users").find(
        {$and: [
                {name:{'$regex' : name, '$options' : 'i'}},
                {surname: {'$regex' : surname, '$options' : 'i'}}
            ]}).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function findUsersByCountry(country){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("users").find({country: country}).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function registerUser (uid, email, pwd, name, surname, country, dob){
    try{
        var db = await mongoDriver.mongo();
        let usr = await db.collection("users").findOne(
        {$or: [
                {userID: uid},
                {email: email}
            ]});
        console.log(usr)
        if (usr === null){
            var newUser = new User({
                userID: uid,
                email: email,
                password: pwd,
                name: name,
                surname: surname,
                country: country,
                dob: dob
            })
            await db.collection("users").insertOne(newUser);
        }else {
            throw Error("UserID or Email already exists");
        }
    } catch (e) {
        console.log(e);
    }
}

async function loginUser (uid, pwd){
    try {
        let db = await mongoDriver.mongo();
        let usr = await db.collection("users").findOne(
            {
                $and: [
                    {userID: uid},
                    {password: pwd}
                ]
            });
        if (usr === null){
            throw Error("Incorrect UserID or Email");
        }
    }catch (e) {
        console.log(e);
    }
}

async function updateUserProfile (uid, newEmail, newPwd, newName, newSurname, newCountry, newDob) {
    try{
        let newProfileInfo = {
            email: newEmail,
            password: newPwd,
            name: newName,
            surname: newSurname,
            country: newCountry,
            dob: newDob
        }
        let db = await mongoDriver.mongo();
        await db.collection("users").updateOne({userID: uid}, {$set: newProfileInfo});
    } catch (e) {
        console.log(e);
    }
}

async function deleteUser (uid){
    try{
        let db = await mongoDriver.mongo();
        await db.collection("users").deleteOne({userID: uid});
    } catch (e) {
        console.log(e);
    }
}

module.exports = {findUserByID, findUserByNameAndSurname ,findUsersByCountry, registerUser, loginUser, updateUserProfile, deleteUser};

