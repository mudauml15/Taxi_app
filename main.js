let data = JSON.parse(localStorage.getItem('data')) || [];
    // let data = []
    loadTasksFromLocStorage(); // load tasks from local storage 
    readAll(); 
   

    function loadTasksFromLocStorage(){ //create load tasks function
        const savedData = localStorage.getItem('data');
     
        if (savedData) {
         data = JSON.parse(savedData);
        }
     
     }



     // function to read the data and show in inner html 
function readAll() {
    let tData = document.getElementById('table_data');
    let elements = "";
    data.forEach((d, index) => {
        elements += `
            <table class="table">


        <div class = " total">
        <h1 id = "display"> </h1>
         </div>

        <thead>
            
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Remove</th>
                <th>Update</th>
        </thead>
        <tbody id="table_data">

         <tr>
            <td>${d.pointA}</td>
            <td>${d.pointB}</td>
            <td>${d.amount}</td>
            <td><button onclick="del(${index})">Delete</button></td>
             <td>
              <button onclick="edit(${index})">Edit</button>
            </td>
          </tr>

        </tbody>

    </table>

        
       `;
    });
    tData.innerHTML = elements;
    tot()
    
}

// function to add items 
function add() {
    let pointA = document.getElementById('pointA').value;
    let pointB = document.getElementById('pointB').value;
    let amount = Number(document.getElementById('amount').value);


    if (pointA.trim() !==''  && pointB.trim() !== '' && amount !== 0) { 
        let newObject = {pointA, pointB, amount };
        data.push(newObject);
        localStorage.setItem('data', JSON.stringify(data));

        readAll();
        tot();

        document.getElementById('pointA').value = '';
        document.getElementById('pointB').value = '';
        document.getElementById('amount').value = '';

       
    } else {
        alert('Please Fill in all inputs.');
    }
    
}

// function to edited items
function edit(index) {
    let pointAInput = document.getElementById('pointA');
    let pointBInput = document.getElementById('pointB');
    let amountInput = document.getElementById('amount');

      // this is to fill the form fields with selected item data
  pointAInput.value = data[index].pointA;
  pointBInput.value = data[index].pointB;
  amountInput.value = data[index].amount;

    // Store the index of the item being edited
    pointAInput.setAttribute('data-index', index);
    pointBInput.setAttribute('data-index', index);
    amountInput.setAttribute('data-index', index);

     // Replace add button with update button
     let addButton = document.getElementById('addButton');
     addButton.innerHTML = 'Update';
     addButton.onclick = function() {
         update(index);
  
  
  }
}

function update(index) {
    let pointAInput = document.getElementById('pointA');
    let pointBInput = document.getElementById('pointB');
    let amountInput = document.getElementById('amount');

      // Update data at the specified index
      data[index].pointA = pointAInput.value;
      data[index].pointB = pointBInput.value;
      data[index].amount = Number(amountInput.value);

        // Update localStorage and refresh display
    localStorage.setItem('data', JSON.stringify(data));
    readAll();
    tot();

    
  

}


// deleting the index also minus the item from the index
function del(index) {
    if (index >= 0 && index < data.length) {
        let deletedAmount = data[index].amount;
        data.splice(index, 1);
        localStorage.setItem('data', JSON.stringify(data));
        readAll(); // Update table display after deletion
        subtractFromTotal(deletedAmount); // Update total after deletion
    } 
    tot()
}

// function for subtract the amount from the total amount 
function subtractFromTotal(amount) {
    let totalDisplay = document.getElementById('display');
    let currentTotal = Number(totalDisplay.innerHTML.replace('Your total is: ', ''));

    if (!isNaN(currentTotal)) {
        let newTotal = currentTotal - amount;
        totalDisplay.innerHTML = "Your total is: " + newTotal.toFixed(2); 
    } 

}


// function for totalAmount
function tot() {
    let totalAmount = 0;
    data.forEach((d) => {
        totalAmount += d.amount;
    });

    
    
    
    let totalDisplay = document.getElementById('display');
    totalDisplay.innerHTML = "Your total is: " + totalAmount.toFixed(2);
}


