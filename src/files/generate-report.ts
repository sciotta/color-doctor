import fs from 'fs'
const ejs = require("ejs");

module.exports.generateReport = (hexColors) => {

  const template = fs.readFileSync("./src/templates/index.ejs", "utf8");

  const data = {
    hexColorsStrSeparatedByComma: hexColors.map(function(hex) { return "'" + hex + "'"; }).join(", "),
  };

  const output = ejs.render(template, data);
  fs.writeFileSync('report.html', output);
}