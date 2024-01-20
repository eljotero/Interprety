"use strict";
const BASE_URL = "https://api.jsonbin.io/v3/b/652ac1b10574da7622b8d5e5";
const SECRET_KEY =
  "$2a$10$NH5OYxhOGireSJAXPmrDQ.dCEQBWKq6VqQ9L4LkQMG9WrjT2.Rbcm";
let todoList = [];
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
  $("#todoListView tr:gt(0)").remove();
  let filterInput = $("#inputSearch")[0].value;
  let date1 = $("#inputFilterDate1")[0].value;
  let date2 = $("#inputFilterDate2")[0].value;
  for (let todo in todoList) {
    let taskDate = new Date(todoList[todo].dueDate);
    if (
      (filterInput == "" ||
        todoList[todo].title.includes(filterInput) ||
        todoList[todo].description.includes(filterInput)) &&
      (date1 == "" || taskDate >= new Date(date1)) &&
      (date2 == "" || taskDate <= new Date(date2))
    ) {
      let row = $("<tr></tr>").appendTo("#todoListView");
      let cellTitle = $("<td></td>").appendTo(row);
      cellTitle.text(todoList[todo].title);
      let cellDescription = $("<td></td>").appendTo(row);
      cellDescription.text(todoList[todo].description);
      let cellPlace = $("<td></td>").appendTo(row);
      cellPlace.text(todoList[todo].place);
      let dateColumn = $("<td></td>").appendTo(row);
      dateColumn.text(new Date(todoList[todo].dueDate).toLocaleDateString());
      let buttonColumn = $("<td></td>").appendTo(row);
      let newDeleteButton = $("<input>")
        .attr("type", "button")
        .attr("class", "btn btn-danger")
        .attr("value", "x")
        .click(function () {
          deleteTodo(todo);
        });
      buttonColumn.append(newDeleteButton);
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
  let inputTitle = $("#inputTitle")[0];
  let inputDescription = $("#inputDescription")[0];
  let inputPlace = $("#inputPlace")[0];
  let inputDate = $("#inputDate")[0];
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
