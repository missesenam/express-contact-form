const http = require("http");
const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");

// Function to serve static files
const serveStaticFile = (filePath, contentType, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
};

// Function to handle form submissions
const handleLogin = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const params = new URLSearchParams(body);
    console.log("Form Data:", Object.fromEntries(params));
    console.log("Name:", params.get("name"));

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Login successful!");
  });
};

// HTTP server
const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  if (req.method === "GET") {
    const ext = path.extname(filePath);
    let contentType = "text/html";

    if (ext === ".css") contentType = "text/css";
    else if (ext === ".js") contentType = "application/javascript";

    serveStaticFile(filePath, contentType, res);
  } else if (req.method === "POST" && req.url === "/login") {
    handleLogin(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Start the server
server.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
