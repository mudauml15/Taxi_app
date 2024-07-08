let data = JSON.parse(localStorage.getItem('data')) || [];
    // let data = []
    loadTasksFromLocStorage(); // load tasks from local storage 
    readAll(); 
   

    function loadTasksFromLocStorage(){ //create load tasks function
        const savedData = localStorage.getItem('data');
     
        if (savedData) {
         this.data = JSON.parse(savedData);
        }
     
     }



     // function to read the data and show in inner html 
function readAll() {
    let tData = document.getElementById('table_data');
    let elements = "";
    data.forEach((d, index) => {
        elements += `
            <table class="table">
        <thead>
            
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Remove</th>
        </thead>
        <tbody id="table_data">

         <tr>
            <td>${d.pointA}</td>
            <td>${d.pointB}</td>
            <td>${d.amount}</td>
            <td><button onclick="del(${index})">Delete</button></td>
          </tr>

        </tbody>

    </table>

        
       `;
    });
    tData.innerHTML = elements;
    
}