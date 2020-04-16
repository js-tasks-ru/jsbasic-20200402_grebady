/**
 * showSalary
 * @param {Array} data - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {
  let strNameBalance = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i]["age"] <= age){
      strNameBalance += data[i]["name"] + ", " + data[i]["balance"] + "\n"
    }
  }
  return strNameBalance.slice(0, strNameBalance.length - 1);
}
