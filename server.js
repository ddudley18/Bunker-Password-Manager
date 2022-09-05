const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

const ObjectId = require('mongoose').Types.ObjectId;

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

const passwordsSchema = new mongoose.Schema({
    userId: ObjectId,
    passwords: [
        {
            checked: Boolean,
            text: String
        }
    ],
});
const Passwords = mongoose.model("Passwords", passwordsSchema);

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
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username : username}).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.json({
            message: "Invalid Login",
        });
        return;
    }
    const newUser = new User({ username: username, password: password});
    await newUser.save();
    res.send({
        message: "success",
    });
});

app.post("/passwords", async (req, res) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [username, password] = token.split(":");
    const passwordsItems = req.body;
    const user = await User.findOne({username : username}).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.json({
            message: "Invalid Access",
        });
        return;
    }
    const passwords = await Passwords.findOne({ userId: user._id }).exec();
    if (!passwords) {
        await Passwords.create({
            userId: user._id,
            passwords: passwordsItems,
        });
    } else {
        passwords.passwords = passwordsItems;
        await passwords.save();
    }
    res.json(passwordsItems);
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});