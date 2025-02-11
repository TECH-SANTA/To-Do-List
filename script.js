const inputBox = document.getElementById('input-box');  // Get input field
const listContainer = document.getElementById('list-container');  // Get list container
const form = document.getElementById('form'); // Get form
const sortTodo = document.getElementById('sort-todo');  // Get sort dropdown


form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    if (inputBox.value.trim() === '') {
        alert('Please enter a task'); // Show alert if input field is empty
    }
     else {
        let li = document.createElement('li');
        li.textContent = inputBox.value;
        li.classList.add('active'); // Default status is Active 

        // Add delete button (×)
        let span = document.createElement('span');
        span.innerHTML = "\u00D7";  
        li.appendChild(span);

        listContainer.appendChild(li);
        inputBox.value = ''; // Clear input field

        filterTasks(); // Apply filtering after adding a new task
        saveData();  // Save data to local storage
    }
});

listContainer.addEventListener('click', function(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle('check-box'); // Add checkbox effect
        event.target.classList.toggle('completed'); 
        event.target.classList.toggle('active');
        filterTasks(); // Reapply filtering when toggling task status
        saveData();  // Save data to local storage
    } else if (event.target.tagName === "SPAN") {  
        event.target.parentElement.remove(); // Remove task when delete button is clicked
        saveData();  // Save data to local storage
    }
}, false);  

// Function to filter tasks 
function filterTasks() {
    const filter = sortTodo.value;  // Get selected value from dropdown
    const tasks = document.querySelectorAll('#list-container li');  // Get all tasks
     
    // Loop through tasks and apply filtering
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'active':
                task.style.display = task.classList.contains('active') ? 'flex' : 'none';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                break;
        }
    });
}

// Event listener for sorting dropdown
sortTodo.addEventListener('change', filterTasks);

// Function to save data to local storage
function saveData(){
    localStorage.setItem('todoData', listContainer.innerHTML);
}

// Function to load data from local storage
function loadData(){
    if(localStorage.getItem('todoData')){
        listContainer.innerHTML = localStorage.getItem('todoData');
    }
}

loadData();  // Load data when page loads
sortTodo.value = 'all';  // Set default value for sorting dropdown   
filterTasks();  // Apply filtering when page loads