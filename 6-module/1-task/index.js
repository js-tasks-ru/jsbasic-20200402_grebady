/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    let table = document.createElement("table");
    let mainRow = document.createElement("tr");
    let textMainRow = ["Имя", "Возраст", "Зарплата", "Город"];
    for (let i = 0; i < 4; i++) {
      let th = document.createElement("th");
      th.innerHTML = textMainRow[i];
      mainRow.append(th);
    }
    table.append(mainRow);
    for (let i = 0; i < rows.length; i++) {
      let row = document.createElement("tr");
      for (let pieceOfInfo in rows[i]){
        let th = document.createElement("th");
        th.innerHTML = rows[i][pieceOfInfo];
        row.append(th);
      }
      let th = document.createElement("th");
      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "X";
      th.append(deleteButton);
      row.append(th);
      table.append(row);
    }
    document.addEventListener("click", deleteRow);
    function deleteRow(event) {
        if (event.target.closest("button")){
          event.target.closest("tr").remove();
        }
    }
    this.elem = table;
  }
}
