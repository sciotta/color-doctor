const hexSorter = require('hexsorter');

module.exports.sortColors = colors => {
  return hexSorter.sortColors(colors, 'mostBrightColor');
};
