const fs = require('fs').promises;
const { glob } = require('glob');

const { normalizeColor } = require('./normalize-color');

module.exports.findAllColors = async (
  paths
)=>{
  const allFiles = (await glob(paths,
    // TODO: Move this to a separate command option
    { ignore: 'node_modules/**' }
  ));

  console.log(`Total files watched: ${allFiles.length}`);

  const allFilesColors = (await Promise.all(allFiles.map(async f => {
    const content = await fs.readFile(f, 'utf-8');
    const regex = /(#[\dA-Fa-f]{3}|#[\dA-Fa-f]{6}|(rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*(?:\.\d+)?)\))|(hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,?\s*(\d*(?:\.\d+)?)\)))[^\d\w]/g;
    const colors = content.match(regex);
    return {
      file: f,
      colors,
    };
  }))).filter(f => !!f.colors);

  const allColors = {};
  allFilesColors.forEach(fileColors => {
    fileColors.colors.forEach(color => {
      const c = normalizeColor(color.substring(0, color.length - 1))
        .toLowerCase();
      if (!allColors[c]) {
        allColors[c] = [];
      }
      if (!allColors[c].includes(fileColors.file)) {
        allColors[c].push(fileColors.file);
      }
    });
  });

  return allColors;
};
