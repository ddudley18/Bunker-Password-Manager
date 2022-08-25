const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
    res.send("Sucessfully Loaded Page");
})

app.listen(port, () => {
    console.log('Listening at http://localhost:4000');
})