
module.exports = {
    create: (req, res) => {
        console.log(req.body)
        res.send("this is your create user page")
    }
}
