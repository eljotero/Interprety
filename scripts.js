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
req.setRequestHeader(
  "X-Master-Key",
  "$2a$10$HqSb7Wy1woHrd97KQg1KteO/GRd7iy.IrWGAmHwlPb6XVW1IAd.xC"
);
req.send();

let updateJSONbin = function () {
  $.ajax({
    url: "https://api.jsonbin.io/v3/b/6529da9454105e766fc1fcb9",
    type: "PUT",
    headers: {
      //Required only if you are trying to access a private bin
      "X-Master-Key":
        "$2a$10$HqSb7Wy1woHrd97KQg1KteO/GRd7iy.IrWGAmHwlPb6XVW1IAd.xC",
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
  let todoListView = $("#todoListView")[0];

  // Remove all elements
  $(todoListView).empty();

  let filterInput = $("#inputSearch").val();
  let beforeDate = $("#beforeDate").val();
  let afterDate = $("#afterDate").val();

  for (let todo of todoList) {
    let todoDueDate = new Date(todo.dueDate);

    let isDateInRange =
      (!beforeDate || todoDueDate <= new Date(beforeDate)) &&
      (!afterDate || todoDueDate >= new Date(afterDate));

    if (
      isDateInRange &&
      (!filterInput ||
        todo.title.includes(filterInput) ||
        todo.description.includes(filterInput))
    ) {
      let newRow = $("<tr>");

      let titleColumn = $("<td>").text(todo.title);
      newRow.append(titleColumn);

      let descriptionColumn = $("<td>").text(todo.description);
      newRow.append(descriptionColumn);

      let placeColumn = $("<td>").text(todo.place);
      newRow.append(placeColumn);

      let dueDateColumn = $("<td>").text(new Date(todo.dueDate).toDateString());
      newRow.append(dueDateColumn);

      let deleteButtonColumn = $("<td>");
      let deleteButton = $("<button>")
        .attr("type", "button")
        .attr("class", "btn btn-danger btn-sm btn-block")
        .text("X")
        .click(function () {
          deleteTodo(todoList.indexOf(todo));
        });

      deleteButtonColumn.append(deleteButton);
      newRow.append(deleteButtonColumn);

      $(todoListView).append(newRow);
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
  let inputTitle = $("#inputTitle").val();
  let inputDescription = $("#inputDescription").val();
  let inputPlace = $("#inputPlace").val();
  let inputDate = $("#inputDate").val();
  //get the values from the form
  let newTitle = inputTitle;
  let newDescription = inputDescription;
  let newPlace = inputPlace;
  let newDate = new Date(inputDate);
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
