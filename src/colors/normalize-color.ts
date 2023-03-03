function decimalToHex(d, padding) {
  let hex = Number(d)
    .toString(16);
  padding = typeof (padding) === 'undefined' || padding === null ? padding = 2 : padding;
  while (hex.length < padding) {
    hex = '0' + hex;
  }
  return hex;
}


module.exports.normalizeColor = (color) => {
  let c = color.toLowerCase();

  if (c.length === 7) return c;
  if (c.length === 4) {
    return c.substr(0, 2) + c.substr(1, 1) + c.substr(2, 1) + c.substr(2, 1) + c.substr(3, 1) + c.substr(3, 1);
  }
  if (c.includes('rgb')) {
    const matches = c.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    return '#' + decimalToHex(matches[1], 2) + decimalToHex(matches[2], 2) + decimalToHex(matches[3], 2);
  }
};
