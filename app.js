const express = require('express')
const app = express()
const port = 3000

app.use("/", express.static(__dirname + "/src"));
app.use("/", express.static(__dirname + "/build/contracts"));

app.get('/', function(req, res) {
    res.sendFile('src/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(port, err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});