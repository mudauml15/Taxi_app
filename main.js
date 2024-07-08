let data = JSON.parse(localStorage.getItem('data')) || [];
    // let data = []
    loadTasksFromLocStorage(); // load tasks from local storage 

   

    function loadTasksFromLocStorage(){ //create load tasks function
        const savedData = localStorage.getItem('data');
     
        if (savedData) {
         this.data = JSON.parse(savedData);
        }
     
     }