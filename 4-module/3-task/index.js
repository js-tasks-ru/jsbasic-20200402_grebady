/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
      if (table.rows[i].cells[3].dataset.available === undefined){
        table.rows[i].hidden = true;
      }
      if (table.rows[i].cells[3].dataset.available === "true"){
        table.rows[i].classList.add("available");
      }
      if (table.rows[i].cells[3].dataset.available === "false"){
          table.rows[i].classList.add("unavailable");
      }
      if (table.rows[i].cells[2].innerText == "m") {
        table.rows[i].classList.add("male");
      }
      if (table.rows[i].cells[2].innerText == "f") {
        table.rows[i].classList.add("female");
      }
      if (+table.rows[i].cells[1].innerText < 18) {
        table.rows[i].style.textDecoration = "line-through";
      }
  }
}
