const express = require('express')
const app = express()

app.use("/", express.static(__dirname + "/src"));
app.use("/", express.static(__dirname + "/build/contracts"));

app.get('/', function(req, res) {
    res.sendFile('src/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, err => {
    if(err) throw err;
    console.log("%c Server running", "color: green");
});