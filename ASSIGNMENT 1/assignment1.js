//Invoke the function using window onload
window.addEventListener('load', 
  function() { 
    alert('page is fully loaded');
  }, false);

function  createTable() {
    //Reading user input
    var rowCount = parseInt(document.getElementById('row-count').value, 10);
    var colCount = parseInt(document.getElementById('col-count').value, 10);
    //Loading table from button click "Create the table"
    var table = document.getElementById('myTable');
    //Loop function for row
    for (var r = 0; r < rowCount; r++) {
      //Creating row
      var row = table.insertRow(r);
      //Loop function for column
      for (var c = 0; c < colCount; c++) {
        //Creating cell
        var cell = row.insertCell(c)
        //First number of multiplication
        const fn = r + 1;
        //Second number of multiplication
        const sn = c +1;
        //Multiplication
        const mul = fn * sn
        //Writing loop result and multiplication
        cell.textContent = (`${fn } x ${sn} = ${mul}`);
      }
    }
    //Clear the table, restart the function, and reloading page
    document.querySelector('button').addEventListener('click', () => {
        document.getElementById('clear').removeChild(document.querySelector('table'));
    location.reload();
      })
  }
