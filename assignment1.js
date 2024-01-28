//Invoke the function using window onload
window.addEventListener('load', 
  function() { 
    alert('page is fully loaded');
  }, false);
  
function createTable(){
    let row = document.getElementById("rows").value;
    let col = document.getElementById("cols").value;

    console.log(row);
    console.log(col);

    var newTable="<table border='1'>";

    //create row
    for (let r=1; r<=row; r++)
    {
        newTable+="<tr>";

            //create coloumn
            for(let c=1; c<=col; c++){
            
                //Multiplication 
                let mul = c*r;
                //Display multiplication in Table
                newTable+="<td>"+r+" x "+c+" = "+mul+" </td>";
            }
        
            newTable+="</tr>";
    }

    newTable +="</table>";

    document.getElementById('tableArea').innerHTML=newTable;

}