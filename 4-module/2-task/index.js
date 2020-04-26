/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
  let matrixFromTable = table.rows;
  for(let i = 0, j = matrixFromTable.length - 1; i < matrixFromTable.length; i++, j--){
      matrixFromTable[i].cells[i].style.background = "red";
      matrixFromTable[j].cells[i].style.background = "red";
  }
}
