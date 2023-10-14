"use strict";
let todoList = [];

let req = new XMLHttpRequest();
req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    //console.log(req.responseText);
    todoList = JSON.parse(req.responseText).record;
  }

};

req.open("GET", "https://api.jsonbin.io/v3/b/6529da9454105e766fc1fcb9", true);
req.setRequestHeader("X-Master-Key", "$2a$10$HqSb7Wy1woHrd97KQg1KteO/GRd7iy.IrWGAmHwlPb6XVW1IAd.xC");
req.send();

let updateJSONbin = function() {
  $.ajax({
url: 'https://api.jsonbin.io/v3/b/6529da9454105e766fc1fcb9',
type: 'PUT',
headers: { //Required only if you are trying to access a private bin
  'X-Master-Key': '$2a$10$HqSb7Wy1woHrd97KQg1KteO/GRd7iy.IrWGAmHwlPb6XVW1IAd.xC'
},
contentType: 'application/json',
data: JSON.stringify(todoList),
success: (data) => {
  console.log(data);
},
error: (err) => {
  console.log(err.responseJSON);
}
});
}


let updateTodoList = function () {
  let todoListView = document.getElementById("todoListView");
  
  //remove all elements
  while (todoListView.firstChild) {
    todoListView.removeChild(todoListView.firstChild);
  }
  
  let filterInput = document.getElementById("inputSearch");
  for (let todo of todoList) {
    if (
      filterInput.value == "" ||
      todo.title.includes(filterInput.value) ||
      todo.description.includes(filterInput.value)
    ) {
      let newRow = todoListView.insertRow();

      let titleColumn = newRow.insertCell(0);
      titleColumn.textContent = todo.title;

      let descriptionColumn = newRow.insertCell(1);
      descriptionColumn.textContent = todo.description;

      let deleteButtonColumn = newRow.insertCell(2);
      let deleteButton = document.createElement("input");
      deleteButton.type = "button";
      deleteButton.value = "X";

      deleteButton.addEventListener("click", function () {
        deleteTodo(todo);
      });
      deleteButtonColumn.appendChild(deleteButton);
    }

  }
};

setInterval(updateTodoList, 1000);

let deleteTodo = function (index) {
  todoList.splice(index, 1);
  updateJSONbin();
};

let addTodo = function () {
  //get the elements in the form
  let inputTitle = document.getElementById("inputTitle");
  let inputDescription = document.getElementById("inputDescription");
  let inputPlace = document.getElementById("inputPlace");
  let inputDate = document.getElementById("inputDate");
  //get the values from the form
  let newTitle = inputTitle.value;
  let newDescription = inputDescription.value;
  let newPlace = inputPlace.value;
  let newDate = new Date(inputDate.value);
  //create new item
  let newTodo = {
    title: newTitle,
    description: newDescription,
    place: newPlace,
    dueDate: newDate,
  };
  //add item to the list
  todoList.push(newTodo);
  updateJSONbin();
  //clear the form
  window.localStorage.setItem("todos", JSON.stringify(todoList));
};
