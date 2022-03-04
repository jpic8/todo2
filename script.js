const toDoModule = (() => {
  //DOM elements
  const addBtn = document.querySelector("#addBtn");
  const newBtn = document.querySelector("#newBtn");
  const popUpForm = document.querySelector("#popUp");
  const closePopUp = document.getElementsByTagName("span")[0];

  //global event listeners
  addBtn.addEventListener("click", validateForm);
  newBtn.addEventListener("click", () => (popUpForm.style.display = "block"));
  closePopUp.addEventListener(
    "click",
    () => (popUpForm.style.display = "none")
  );
  window.addEventListener("load", () => restore(myToDos));

  class ToDo {
    constructor(title, complete) {
      this.title = form.title.value;
      this.complete = form.complete.checked;
    }
  }

  let myToDos = []; //empty array
  let newToDo;

  function addToDo() {
    window.event.preventDefault();
    popUpForm.style.display = "none";
    myToDos.push(newToDo);
    setData();
    render();
    form.reset();
  }

  function validateForm() {
    window.event.preventDefault();
    newToDo = new ToDo(title, complete);
    if (newToDo.title == "") {
      alert("Please enter a valid To Do item");
    } else {
      addToDo();
    }
  }

  function createToDo(item) {
    const toDoContainer = document.querySelector("#todo-container");
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
    toDoDiv.setAttribute("id", myToDos.indexOf(item));
    const titleDiv = document.createElement("div");
    titleDiv.textContent = item.title;
    titleDiv.classList.add("title");
    toDoDiv.appendChild(titleDiv);
    const completeBtn = document.createElement("button");
    completeBtn.classList.add("completeBtn");
    toDoDiv.appendChild(completeBtn);
    if (item.complete === false) {
      completeBtn.textContent = "Pending";
      completeBtn.style.backgroundColor = "#e04f63";
    } else {
      completeBtn.textContent = "Done";
      completeBtn.style.backgroundColor = "#63da63";
    }
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("id", "removeBtn");
    toDoDiv.appendChild(removeBtn);
    toDoContainer.appendChild(toDoDiv);
    removeBtn.addEventListener("click", () => {
      myToDos.splice(myToDos.indexOf(item), 1);
      setData();
      render();
    });
    completeBtn.addEventListener("click", () => {
      item.complete = !item.complete;
      setData();
      render();
    });
  }

  function setData() {
    localStorage.setItem(`myToDos`, JSON.stringify(myToDos));
  }

  function render() {
    const display = document.getElementById("todo-container");
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => display.removeChild(todo));

    for (let i = 0; i < myToDos.length; i++) {
      createToDo(myToDos[i]);
    }
  }

  function restore() {
    if (!localStorage.myToDos) {
      render();
    } else {
      let objects = localStorage.getItem("myToDos");
      objects = JSON.parse(objects);
      myToDos = objects;
      render();
    }
  }
})();
