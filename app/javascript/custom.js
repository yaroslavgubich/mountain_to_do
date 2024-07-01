function menuOption() {
  let login_menu = document.getElementById('login_dropdown_content');

  if (login_menu.style.display == '') {
    /* Show content */
    login_menu.style.display = "block";
    console.log("Showing");
  } else if (login_menu.style.display == 'block') {
    /* Hide content */
    login_menu.style.display = "none";
    // console.log("Hiding");
  }
}

// Dinamic new mountain task creation

var newTaskInter = 1; /* Task interation counter */

function addTask() {
  //Task counter increment
  newTaskInter ++;
  // console.log("Task counter: " + newTaskInter);

  // Creating new task
  const taskBox = document.createElement("div");
  taskBox.classList.add("box-underline");
  taskBox.id = "task_nr"+newTaskInter;


  // First field
  const firstField = document.createElement("div");
  firstField.classList.add("two-elements");

  const deadlineField = document.createElement("input");
  deadlineField.setAttribute("type", "date");
  deadlineField.id = "nm"+newTaskInter+"_deadline";
  deadlineField.classList.add("new-mountain-input");

  const timeLeft = document.createElement("input");
  timeLeft.setAttribute("type", "text");
  timeLeft.id ="nm"+newTaskInter+"_time_left";
  timeLeft.classList.add("time-left-field");
  timeLeft.value = "JB Test"; /*test field*/
  timeLeft.readOnly = true;


  // Second field
  const secondField = document.createElement("div");
  secondField.classList.add("two-elements");

  const taskName = document.createElement("input");
  taskName.setAttribute("type", "text");
  taskName.id = "nm"+newTaskInter+"_name";
  taskName.classList.add("new-mountain-input");
  taskName.placeholder = "New Task Name";

  const delBtn = document.createElement("span");
  delBtn.classList.add("del-task");
  delBtn.innerText = "Delete";


  // All components concatination
  firstField.appendChild(deadlineField);
  firstField.appendChild(timeLeft);

  secondField.appendChild(taskName);
  secondField.appendChild(delBtn);

  taskBox.appendChild(firstField);
  taskBox.appendChild(secondField);

  let parrent_box = document.getElementById("tasks-list");
  parrent_box.insertBefore(taskBox, parrent_box.firstChild);

  // document.getElementById("tasks-list").insertBefore(taskBox);
}
