/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let sum = 0;
  for (let field in salaries){
    if(typeof salaries[field] == "number"){
      sum += salaries[field];
    }
  }
  return sum;
}
