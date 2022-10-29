const fs = require("fs");
const path = require("path");

fs.readFileSync(path.join(__dirname, "../../public/md")).forEach(item => {
  console.log("item")
})