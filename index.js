const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// server
const server = express();

// middleware def
server.use(express.static(path.join(__dirname, "public")));
server.use(bodyParser.urlencoded({ extended: false }));

// route request handlers
const handleLogin = (req, res) => {
  //   //   console.log(req);
  //   let body = "";
  //   req.on("data", (chunk) => {
  //     body += chunk;
  //   });
  //   req.on("end", () => {
  //     // parse with regExp

  //     console.log(body);
  //   });
  console.log(req.body);
  console.log(req.body.name);
  res.send("Done");
};

// route
server.post("/login", handleLogin);

server.listen(3000, () => console.log("server is ready"));
