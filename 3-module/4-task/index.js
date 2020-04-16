/**
 * showSalary
 * @param {Array} data - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(data, age) {
    return data
      .filter(function (person) {
            return person.age <= age;
      })
      .map(function (filteredPerson) {
          return filteredPerson.name + ", " + filteredPerson.balance;
      })
      .join("\n");
}
