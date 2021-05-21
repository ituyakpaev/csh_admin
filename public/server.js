const express = require("express");
const app = express();

app.use(function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD");

    response.send(JSON.stringify({
        link: 'http://files.hodoor.world/main/b29a6ebb-bcef-435f-ae14-14d4a01a5881.jpeg'
    }))
});

app.listen(3001);
