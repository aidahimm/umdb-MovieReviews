
async function getAdmins (req, res) {
    try {
        let admin = await adminServices.getAdmin();
        return res.render('index', { admin: admin, title: 'All movies' });
        //json({ movie: movie, message: "Service Executed Successfully" })

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
module.exports = {getAdmins};


