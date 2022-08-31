const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

mongoose.connect('mongodb://127.0.0.1:27017/bunker', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, function (err) {
        if (err) throw err;
        console.log('Successfully connected');
    });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username : username}).exec();
    if (user) {
        res.status(500);
        res.json({
            message: "user already exists",
        });
        return;
    }
    const newUser = new User({ username: username, password: password});
    await newUser.save();
    res.send({
        message: "success",
    });
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})