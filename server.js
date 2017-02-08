var parser = require("./index.js"),
    http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.write(JSON.stringify(parser("/Users/Mrson/Desktop/test")));
    res.end();
}).listen(3000);

// console.log(parser("/Users/Mrson/Desktop/vue2.0-taopiaopiao"));

