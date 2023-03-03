#! /usr/bin/env node

const { Command } = require('commander');
const figlet = require("figlet");

const { findAllColors } = require('./colors/find-colors-by-paths');
const { sortColors } = require('./colors/sort-colors');

const findColors = async function(dirs) {
  const showIncidences = this.opts().incidences;
  const colors = await findAllColors(dirs);
  
  const hexColors = [
    ...new Set(Object.keys(colors)
  )];

  const sortedColors = sortColors(hexColors);
  const mappedColors = sortedColors.map((colorHex) => {
    return {
      hex: colorHex,
      incidences: colors[colorHex].length
    }
  });

  if (showIncidences) {2
    console.dir(mappedColors, {'maxArrayLength': null});
  } else {
    console.dir(sortedColors, {'maxArrayLength': null});
  }
  console.log('Total colors: ' + hexColors.length);
};

const program = new Command();

console.log(figlet.textSync("Front-Doctor"));

program
  .name('front-doctor')
  .description('CLI to help improve web front-end projects')
  .version('0.1.1');

program
  .command('find-colors')
  .description('Find for color declarations inside some folders')
  .argument('<dirs...>')
  .option('-i, --incidences', 'count incidences', false)
  .option('-f --format <string>', 'csv or json', 'csv')
  .action(findColors);

program.parse();