/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let _min = 99999, _max = -99999;
  let arrStr = str.split(",");
  let strWithout_ = arrStr.join(" ");
  let arrStrLettersNumbers = strWithout_.split(" ");
  for (let i = 0; i < arrStrLettersNumbers.length; i++) {
    if (typeof (+arrStrLettersNumbers[i]) == "number"){
      if (+arrStrLettersNumbers[i] > _max) _max = +arrStrLettersNumbers[i];
      if (+arrStrLettersNumbers[i] < _min) _min = +arrStrLettersNumbers[i];
    }
  }
  return  {
    min:_min,
    max: _max,
  }
}
