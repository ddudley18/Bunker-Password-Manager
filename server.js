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
            text: String,
            id: String,
        },
    ],
});
const Passwords = mongoose.model("Passwords", passwordsSchema, "Passwords");

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username : username}).exec();
    if (user) {
        res.status(500);
        res.send({
            message: "user already exists",
        });
        return;
    }
    await User.create({ username, password });
    res.send({
        message: "success",
    });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username : username}).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.send({
            message: "Invalid Login",
        });
        return;
    }
    res.send({
        message: "success",
    });
});

app.post("/passwords", async (req, res) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [username, password] = token.split(":");
    const passwordsItems = req.body;
    const user = await User.findOne({ username }).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.send({
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
        console.log("LOOOOOOOOOOOOOOK AT ME")
        console.log(passwordsItems);
    } else {
        passwords.passwords = passwordsItems;
        await passwords.save();
    }
    res.send(passwordsItems);
});

app.get("/passwords", async (req, res) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [username, password] = token.split(":");
    const user = await User.findOne({ username }).exec();
    if (!user || user.password !== password) {
        res.status(403);
        res.send({
            message: "Invalid Access",
        });
        return;
    }
    const passwordsStructured = await Passwords.findOne({ userId: user._id }).populate("passwords").exec();
    if (passwordsStructured != null) {
        const { passwords } = passwordsStructured;
        // const { passwords } = passwordsYo[0];
        res.json(passwords.passwords);
        res.send();
    } else {
        res.send("EMPTY");
    }
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});