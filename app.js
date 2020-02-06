const fs = require("fs");
const scrape = require("./scraper");
const { jsonToSCSS, writeScss } = require("./utilities");
const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  console.log("hello from server");

  res.render("./public/index.html");
});

app.post("/api", (req, res) => {
  let test = req.body.test_url;
  console.log("the url is " + test);
  scrape(test)
    .then(result => {
      // Formatting the JSON String to make it easy to copy-paste into any scss file
      final = JSON.stringify(result);
      const scss = jsonToSCSS(final);
      const fileData = writeScss(scss);
      fs.writeFileSync(`./public/temp/app.scss`, fileData);
      return fileData;
    })
    .then(fileData => res.send(fileData))
    .catch(err => res.send(err));
});

app.listen(port, console.log("listening on port 3000"));
