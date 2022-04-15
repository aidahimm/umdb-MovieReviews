const mongoDriver = require("../../Mongo");
const User = require("../models/user");

async function findUserByUsername(username){
    try {
        // Connect to the MongoDB cluster
        let db = await mongoDriver.mongo();
        return await db.collection("users").findOne({username: username});
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

async function findUsersByNFollowers(min, max){
    try{
        let db = await mongoDriver.mongo();
        return await db.collection("users").aggregate([
            {$match: {numFollowers: {'$gte': min, '$lte': max}}},
            {$sort: {numFollowers: -1}}]).toArray();
    } catch (e) {
        console.log(e);
    }
}

async function registerUser (username, email, pwd, gender, name, surname, country, dob){
    try{
        var db = await mongoDriver.mongo();
        let usr = await db.collection("users").findOne(
        {$or: [
                {username: username},
                {email: email}
            ]});
        if (usr === null){
            let tot = await db.collection("users").count()+ 1
            var newUser = new User({
                _id: parseInt(tot),
                username: username,
                email: email,
                password: pwd,
                gender: gender,
                name: name,
                surname: surname,
                country: country,
                dob: Date.parse(dob)
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
                    {username: uid},
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

async function updateUserProfile (username, newEmail, newPwd, newGender, newName, newSurname, newCountry, newDob) {
    try{
        let newProfileInfo = {
            email: newEmail,
            password: newPwd,
            gender: newGender,
            name: newName,
            surname: newSurname,
            country: newCountry,
            dob: Date.parse(newDob)
        }
        let db = await mongoDriver.mongo();
        await db.collection("users").updateOne({username: username}, {$set: newProfileInfo});
    } catch (e) {
        console.log(e);
    }
}

async function deleteUser (username){
    try{
        let db = await mongoDriver.mongo();
        await db.collection("users").deleteOne({username: username});
    } catch (e) {
        console.log(e);
    }
}

module.exports = {findUserByUsername, findUserByNameAndSurname ,findUsersByCountry, findUsersByNFollowers, registerUser, loginUser, updateUserProfile, deleteUser};

