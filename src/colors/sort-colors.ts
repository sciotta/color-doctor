const hexSorter = require('hexsorter');

module.exports.sortByBright = colors => {
  return hexSorter.sortColors(colors, 'mostBrightColor');
};
