/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let arrStr = str.split("-");
  let mappedArrStr = arrStr.map(function (word, index) {
    if (index != 0 && word != ""){
      return word[0].toUpperCase() + word.slice(1);
    }else{
      return word;
    }git 
  });
  return mappedArrStr.join("");
}
