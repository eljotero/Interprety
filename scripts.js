"use strict";
const BASE_URL = "https://api.jsonbin.io/v3/b/652ac1b10574da7622b8d5e5";
const SECRET_KEY =
  "$2a$10$NH5OYxhOGireSJAXPmrDQ.dCEQBWKq6VqQ9L4LkQMG9WrjT2.Rbcm";
let todoList = [];
let initList = function () {
  let savedList = window.localStorage.getItem("todos");
  if (savedList != null) todoList = JSON.parse(savedList);
  else if (savedList != null) todoList = JSON.parse(savedList);
  else
    todoList.push(
      {
        title: "Learn JS",
        description: "Create a demo application for my TODO's",
        place: "445",
        dueDate: new Date(2019, 10, 16),
      },
      {
        title: "Lecture test",
        description: "Quick test from the first three lectures",
        place: "F6",
        dueDate: new Date(2019, 10, 17),
      }
      // of course the lecture test mentioned above will not take place
    );
};
//initList();
$.ajax({
  // copy Your bin identifier here. It can be obtained in the dashboard
  url: BASE_URL,
  type: "GET",
  headers: {
    //Required only if you are trying to access a private bin
    "X-BIN-META": false,
    "X-Master-Key": SECRET_KEY,
  },
  success: (data) => {
    //console.log(data);
    todoList = data;
  },
  error: (err) => {
    console.log(err.responseJSON);
  },
});
let updateJSONbin = function () {
  $.ajax({
    url: BASE_URL,
    type: "PUT",
    headers: {
      //Required only if you are trying to access a private bin
      "X-Master-Key": SECRET_KEY,
    },
    contentType: "application/json",
    data: JSON.stringify(todoList),
    success: (data) => {
      console.log(data);
    },
    error: (err) => {
      console.log(err.responseJSON);
    },
  });
};
let updateTodoList = function () {
  let todoListVariable = document.getElementById("todoListView");

  //remove all elements
  while (todoListVariable.rows.length > 1) {
    todoListVariable.deleteRow(1);
  }
  let filterInput = document.getElementById("inputSearch");
  for (let todo in todoList) {
    if (
      filterInput.value == "" ||
      todoList[todo].title.includes(filterInput.value) ||
      todoList[todo].description.includes(filterInput.value)
    ) {
      let row = todoListVariable.insertRow();
      let cellTitle = row.insertCell(0);
      cellTitle.appendChild(document.createTextNode(todoList[todo].title));
      let cellDescription = row.insertCell(1);
      cellDescription.appendChild(
        document.createTextNode(todoList[todo].description)
      );
      let placeColumn = row.insertCell(2);
      placeColumn.appendChild(document.createTextNode(todoList[todo].place));
      let dateColumn = row.insertCell(3);
      dateColumn.appendChild(
        document.createTextNode(
          new Date(todoList[todo].dueDate).toLocaleDateString()
        )
      );
      let buttonColumn = row.insertCell(4);
      let newDeleteButton = document.createElement("input");
      newDeleteButton.type = "button";
      newDeleteButton.value = "x";
      newDeleteButton.addEventListener("click", function () {
        deleteTodo(todo);
      });
      buttonColumn.appendChild(newDeleteButton);
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
  //clear the form
  window.localStorage.setItem("todos", JSON.stringify(todoList));
  updateJSONbin();
};
