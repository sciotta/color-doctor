#! /usr/bin/env node

const { Command } = require('commander');
const figlet = require("figlet");

const { findAllColors } = require('./colors/find-colors-by-paths');
const { sortByBright } = require('./colors/sort-colors');
const { generateReport } = require('./files/generate-report');

const findColors = async function(dirs) {
  const showIncidences = this.opts().incidences;
  const saveFormat = this.opts().format;

  const colors = await findAllColors(dirs);
  
  const hexColors = [
    ...new Set(Object.keys(colors)
  )];

  const sortedColors = sortByBright(hexColors);
  const mappedColors = sortedColors.map((colorHex) => {
    return {
      hex: colorHex,
      incidences: colors[colorHex].length
    }
  });

  if (saveFormat === 'csv') {
    if (showIncidences) {
      console.dir(mappedColors, {'maxArrayLength': null});
    } else {
      console.dir(sortedColors, {'maxArrayLength': null});
    }
    console.log('Total colors: ' + hexColors.length);
  }

  if (saveFormat === 'report') {
    generateReport(sortedColors)
  }
};

const program = new Command();

console.log(figlet.textSync("Color-Doctor"));

program
  .name('color-doctor')
  .description('CLI to help improve colors of web front-end projects')
  .version('0.1.1');

program
  .command('find-colors')
  .description('Find for color declarations inside some folders')
  .argument('<dirs...>')
  .option('-i, --incidences', 'count incidences', false)
  .option('-f --format <string>', 'csv or report (HTML)', 'csv')
  .action(findColors);

program.parse();