const express = require('express')
const app = express()
const port = 3000

app.use("/", express.static(__dirname + "/src"));
app.use("/", express.static(__dirname + "/build/contracts"));

app.get('/', function(req, res) {
    res.sendFile('src/index.html');
});

app.listen(process.env.port || 3000);