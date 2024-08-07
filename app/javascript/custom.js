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

// Save task checkbox function //
document.addEventListener('DOMContentLoaded', function() {
  function initializeCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.task-checkbox');

    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        const taskId = this.dataset.taskId;
        const goalId = this.dataset.goalId;
        const completed = this.checked;

        fetch(`/goals/${goalId}/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify({ task: { completed: completed } })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.status === 'ok') {
            console.log(`Task ${taskId} updated successfully`);
          } else {
            console.error('Failed to update task');
          }
        })
        .catch(error => console.error('Error:', error));
        });
      });
    }

    initializeCheckboxListeners();

    document.addEventListener('turbo:load', function() {
      initializeCheckboxListeners();
    });
});

// Circle Progress Bar Index Functionality
function initializeProgressBars() {
  const circulars = document.querySelectorAll(".circular");

  circulars.forEach(circular => {
    const numb = circular.querySelector(".numb");
    const leftProgress = circular.querySelector(".left .progress");
    const rightProgress = circular.querySelector(".right .progress");
    const dot = circular.querySelector(".dot span");
    const checkmark = circular.querySelector(".checkmark");
    const percentage = parseFloat(circular.dataset.percentage);
    const goalId = circular.dataset.goalId;
    let counter = 0;

    const updateProgress = (percent) => {
      const rotateDeg = (percent / 100) * 360;
      const rotateRight = Math.min(rotateDeg, 180);
      const rotateLeft = Math.max(rotateDeg - 180, 0);

      leftProgress.style.transform = `rotate(${rotateLeft}deg)`;
      rightProgress.style.transform = `rotate(${rotateRight}deg)`;
      dot.style.transform = `rotate(${rotateDeg - 90}deg)`;
      numb.textContent = `${percent}%`;

      if (percent === 100 && !localStorage.getItem(`goal-${goalId}-completed`)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        checkmark.style.display = 'block';
        checkmark.classList.add('draw');

        setTimeout(() => {
          showFlashMessage('Congratulations! Goal Achieved!');
        }, 500);

        localStorage.setItem(`goal-${goalId}-completed`, 'true');

        // Mark the goal as completed in the backend
        fetch(`/goals/${goalId}/complete`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify({ completed: true })
        })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'ok') {
            console.log(`Goal ${goalId} marked as completed`);
          } else {
            console.error('Failed to mark goal as completed');
          }
        })
        .catch(error => console.error('Error:', error));
      }
    };

    updateProgress(0); // To ensure it starts at 0%

    const interval = setInterval(() => {
      if (counter >= percentage) {
        clearInterval(interval);
      } else {
        counter += 1;
        updateProgress(counter);
      }
    }, 70);
  });
}

function showFlashMessage(message) {
  const flashMessage = document.createElement('div');
  flashMessage.classList.add('flash-message');
  flashMessage.textContent = message;
  document.body.appendChild(flashMessage);
  flashMessage.style.display = 'block';

  setTimeout(() => {
    flashMessage.style.display = 'none';
    document.body.removeChild(flashMessage);
  }, 5000);
}

document.addEventListener('DOMContentLoaded', initializeProgressBars);
document.addEventListener('turbo:load', initializeProgressBars); // for Turbo
document.addEventListener('ajaxComplete', initializeProgressBars); // For handling custom AJAX completions

//   // Initialize progress bar on page load
//   updateProgressBar();
// });


// modals js for adding a new task


document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('taskModal');
  var openModalBtn = document.getElementById('openModalBtn');
  var closeModalBtn = document.getElementById('closeModalBtn');

  if (openModalBtn) {
    openModalBtn.addEventListener('click', function() {
      modal.style.display = "block";
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
      modal.style.display = "none";
    });
  }

  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});
