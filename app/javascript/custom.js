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
/* Task interation counter */
var newTaskInter = 1;
var tasks_ids = [];
var tasks_list = [];


function addTask() {

  const firstCheckup = document.getElementById("nm"+newTaskInter+"_deadline");
  const secondCheckup = document.getElementById("nm"+newTaskInter+"_name");

  //Claculate diference
  /* Check or data entered                                  //
  // If not entered field will get red border (indianred)   //
  //                                                        */
  let first_permission;
  let second_permission;

  if (firstCheckup.value == "") {
    firstCheckup.style = "border-color: indianred;";
    first_permission = false;
  } else {
    firstCheckup.style = "border-color: #cecece";
    first_permission = true;
  }

  if (secondCheckup.value == "") {
    secondCheckup.style = "border-color: indianred;";
    second_permission = false;
  } else {
    secondCheckup.style = "border-color: #cecece";
    second_permission = true;
  }


  if (first_permission && second_permission) {

    // Date time difference calculation
    const endDate = new Date(firstCheckup.value);
    const startDate = Date.now();

    // Calculate the time difference in milliseconds
    const timeDifferenceMS = endDate - startDate;
    // const diffTimeDate = new Date(timeDifferenceMS);

    const timeDifferenceDays = Math.floor(timeDifferenceMS / (1000 * 60 * 60 * 24));
    const timeDifferenceHours = Math.floor((timeDifferenceMS % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const timeDifferenceMins = Math.floor((timeDifferenceMS % (1000 * 60 * 60)) / (1000 * 60));

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
    timeLeft.value = "";
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
    const delTaskAtribute = "deleteTask("+newTaskInter+");";
    delBtn.setAttribute("onClick",delTaskAtribute);
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

    //Date and time left till task deadline
    document.getElementById("nm"+(newTaskInter-1)+"_time_left").value = timeDifferenceDays+"d "+timeDifferenceHours+"h "+timeDifferenceMins+"m"; /*test field*/

    // Add created tasks ID's
    tasks_ids.push("task_nr"+(newTaskInter-1));

    document.getElementById("create_goal_btn").addEventListener("click",newTaskCounterReset);
    }
}

function deleteTask(target_id) {
  let biggerId = target_id + 1;
  // alert ("Delete ID: "+target_id+"  Next ID:"+biggerId+ "Max_ID: "+ newTaskInter);

  if (biggerId > newTaskInter) {
    // Action if can't delet element
  } else {
    const delTask = document.getElementById("task_nr"+target_id);
    delTask.remove();

    // Remove from the array;
    tasks_ids
    let rem_position = tasks_ids.indexOf("task_nr"+target_id);
    delete tasks_ids[rem_position];
  }
}

//Create list with tasks
function newTaskList() {
  for (inter = 1; newTaskInter >= inter; inter += 1) {
    //
    const task_date = document.getElementById("nm"+inter+"_deadline");
    const task_name = document.getElementById("nm"+inter+"_name");

    if ((task_date.value != null) || (task_name.value != null)) {
      tasks_list.push(task_name.value);
      tasks_list.push(task_date.value);
    }
  }
}

function newTaskCounterReset() {
  newTaskList();
  newTaskInter = 1;

  console.warn(tasks_list);

}
// Progress bar

// document.addEventListener('DOMContentLoaded', function () {
//   const checkboxes = document.querySelectorAll('.task-checkbox');
//   const progressFill = document.getElementById('progress-fill');
//   const progressText = document.getElementById('progress-text');

//   function updateProgressBar() {
//     const totalTasks = checkboxes.length;
//     const completedTasks = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
//     const percentComplete = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

//     progressFill.style.width = `${percentComplete}%`;
//     progressText.textContent = `${percentComplete.toFixed(2)}% Complete (${completedTasks} / ${totalTasks} Tasks)`;
//   }

//   checkboxes.forEach(checkbox => {
//     checkbox.addEventListener('change', updateProgressBar);
//   });

//   // Initialize progress bar on page load
//   updateProgressBar();
// });
