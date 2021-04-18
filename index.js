const fs = require("fs");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use("/static", express.static("./public/"));

app.get("/", (req, res) => {
  return res
    .status(200)
    .end(fs.readFileSync("./index.html", { encoding: "utf-8" }));
});

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});
