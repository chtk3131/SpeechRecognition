var http = require("http");
var fs = require("fs");

var settings = require("./settings");

var server = http.createServer();

server.on("request", (req, res) => {
  var url = req.url;
  console.log(url);

  if (url == "/hoge.js") {
    fs.readFile(__dirname + "/hoge.js", "utf-8", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write(data);
      res.end();
    });
  } else if (url == "/main.css") {
    fs.readFile(__dirname + "/hoge.js", "utf-8", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  } else {
    fs.readFile(__dirname + "/public/index.html", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("not found");
        return res.end();
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
});

server.listen(settings.port, settings.host);

console.log("listen");
