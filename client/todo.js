// grab all elements 
const form = document.querySelector("[data-form]"); 
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");

// Set label fields using string query
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const email = urlParams.get('email');
document.getElementById('username').innerText = username;
document.getElementById('email').innerText = email;

// Keep array Global for UI variable fo UI Display
let todoArr = [];

// Once the browser is loaded
window.addEventListener("DOMContentLoaded", () => {
    
    // When Page Loaded Get All Items from Local Storage 
     todoArr = Storage.getStorage();
    // Display Data According Loaded Array
    UI.displayData();
    // Register remove from the dom
    UI.registerRemoveTodo();
});


// ToDo Class: Each Visual Element Should be 
// Related to ToDO Object
class Todo {
    constructor(id, todo){
        this.id = id;
        this.todo = todo;
    }
}


// Class To handle Storage Operations
// of todo array
class Storage
{
    // Get Array Of Class Objects 
    static addTodStorage(todoArr){
        let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
        return storage;
    }

    // Get From Storage By Key
    static getStorage(){
        let storage = localStorage.getItem("todo") === null ? 
        [] : JSON.parse(localStorage.getItem("todo"));
        return storage
    }

}


// Submit
form.addEventListener("submit", (e) => {
    // Disble continue sumit processing...
    e.preventDefault();
    // Create New Object By User Input
    let id = Math.random() * 1000000;
    const todo = new Todo(id, input.value);
   // todoArr.push(todo);
    todoArr = [...todoArr,todo];
  
    UI.displayData();
    UI.clearInput();
    // add to storage

    Storage.addTodStorage(todoArr);
});


// Handle UI Operation 
class UI{

    // Go Over All Array Elements 
    // And Generate HTML Items Dynamically
    static displayData(){
        
        // Generate Html
        // each Delete Icon Injected with 
        // data-id = {id of the object}
        let displayData = todoArr.map((item) => {
            return `
                <div class="todo">
                <p>${item.todo}</p>
                <span class="remove" data-id = ${item.id}>🗑️</span>
                </div>
            `
        });
        // Put generated html in a container
        lists.innerHTML = (displayData).join(" ");
    }
   
    // Clear Input Element
    static clearInput(){
       
        input.value = "";
    }

    // Remove Element When Clicked
    static registerRemoveTodo(){
        // Register Click  For Deleting a toto row
        // The Click is on the List Div Container

        lists.addEventListener("click", (e) => {
           
            console.log(e.target.outerHTML);// Inner Clicked 
            console.log(e.currentTarget.outerHTML);// Registered Clicked

            if(e.target.classList.contains("remove")){
                // Get Id of clicked delete
                let btnId = e.target.dataset.id;
                // Remove Element From HTML DOM
                
                // remove from array.
                UI.removeArrayTodo(btnId, e.target);

            }
        
        });
    }
   
   // Remove Element From UI And Update LocalStorage
    static removeArrayTodo(id,elementClicked){
        
        elementClicked.parentElement.remove();
        todoArr = todoArr.filter((item) => item.id !== +id);
        Storage.addTodStorage(todoArr);
    }

}

// Logout current user and clear Session Storage and Local Storage
function logout() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/login';   
}

// Save TODOs to database
document.getElementById('saveBtn').addEventListener('click', async function(event) {
    event.preventDefault(); 
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const data = {username: currentUser.username, email: currentUser.email, todos: todoArr}
  
    try {
      const response = await fetch('/todo/save', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },   
          body: JSON.stringify(data)
      });
  
      // for other errors
      if (!response.ok) {
          const errorResponse = await response.json();
          alert(errorResponse.error);
      }

      // save successful
      else {
        const messageResponse = await response.json();
        alert(messageResponse.message); 
      }
  
  } catch (error) {
      alert(error);
  }
  });




