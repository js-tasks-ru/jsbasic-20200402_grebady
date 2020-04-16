/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let arrStr = str.split("-");
  let camelizedStr = arrStr[0];
  for (let i = 1; i < arrStr.length; i++) {
    camelizedStr += arrStr[i][0].toUpperCase() + arrStr[i].slice(1);
  }
  return camelizedStr;
}
