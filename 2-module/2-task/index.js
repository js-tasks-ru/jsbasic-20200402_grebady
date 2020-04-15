/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  let checker = true;
  for(let key in obj){
    return !checker;
  }
  return checker;

}
