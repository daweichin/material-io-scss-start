const fs = require("fs");

const scrape = require("./scraper");

url =
  "https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=EA80FC&secondary.color=BF360C";

scrape(url).then(result => {
  final = JSON.stringify(result);
  final = final.replace(/['"]+/g, "");
  final = final.replace(/[{]+/g, "");
  final = final.replace(/[}]+/g, "");
  final = final.replace(/[:]+/g, ": ");
  final = final.replace(/,+/g, ";");
  final = "/* Material UI Color Theme */" + "\n" + final;
  fs.writeFileSync("app.scss", final);
});
