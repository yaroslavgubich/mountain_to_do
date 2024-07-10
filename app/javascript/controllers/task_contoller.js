// app/javascript/controllers/task.js
document.addEventListener('turbo:load', initializeDeleteModal);
document.addEventListener('DOMContentLoaded', initializeDeleteModal);

connect() {

  console.log("edit Controller connected " );
}


function initializeDeleteModal() {
  var modal = document.getElementById("confirmationModal");
  var confirmButton = document.getElementById("confirmDelete");
  var cancelButton = document.getElementById("cancelDelete");
  var closeButton = document.querySelector(".close");
  var deleteLink;

  document.querySelectorAll('.delete-task').forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      deleteLink = link;
      modal.style.display = "block";
    });
  });

  confirmButton.addEventListener('click', function() {
    modal.style.display = "none";
    var form = document.createElement('form');
    form.method = 'post';
    form.action = deleteLink.href;

    var methodInput = document.createElement('input');
    methodInput.type = 'hidden';
    methodInput.name = '_method';
    methodInput.value = 'delete';
    form.appendChild(methodInput);

    var csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    var csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'authenticity_token';
    csrfInput.value = csrfToken;
    form.appendChild(csrfInput);

    document.body.appendChild(form);
    form.submit();
  });

  cancelButton.addEventListener('click', function() {
    modal.style.display = "none";
  });

  closeButton.addEventListener('click', function() {
    modal.style.display = "none";
  });

  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
}

document.addEventListener('DOMContentLoaded', calculateProgress);

function calculateProgress() {
  setTimeout(function () {
    /* Retrieving start and end task information */
    let start_date = document.getElementById("task_start_date");
    let end_date = document.getElementById("task_end_date");

    // If no start date will set today date
    if (start_date.value == '') {
      const today_date = new Date();
      let st_year = today_date.getFullYear();
      let st_month = today_date.getMonth() + 1;
      let st_day = today_date.getDate();

      /* Check or month less than 9 */
      st_month = convertDate(st_month);

      /* Check or day less than 9 */
      st_day = convertDate(st_day);

      /* Update start date with new value */
      var task_start_day = st_year + "-" + st_month + "-" + st_day;
      start_date.value = task_start_day;
    } else {
      var task_start_day = start_date.value;
    }

    if (end_date.value == '') {
      /* Creating end date */
      let end_task_date = new Date(document.getElementById("task_deadline").innerText);
      let end_task_year = end_task_date.getFullYear();
      let end_task_month = end_task_date.getMonth() + 1;
      let end_task_day = end_task_date.getDate();

      /* Check or month less than 9 */
      end_task_month = convertDate(end_task_month);

      /* Check or day less than 9 */
      end_task_day = convertDate(end_task_day);

      /* Update end date with new value */
      var task_end_day = end_task_year + "-" + end_task_month + "-" + end_task_day;
      end_date.value = task_end_day;
    } else {
      var task_end_day = end_date.value;
    }

    // Set progress in percentage
    if ((start_date.value != '') || (end_date.value != '')) {
      // If start date is earlier than end date
      if (Date.parse(task_start_day) < Date.parse(task_end_day)) {
        document.getElementById("task_progress").innerText = getProgressPercentage(task_start_day, task_end_day) + "%";
      } else {
        document.getElementById("task_progress").innerText = "100%";
      }
    }

    task_end_day = null;
    checkTaskStatus();
  }, 1000);
}

// Add 0 if day or month date less than 10
function convertDate(date_d_m) {
  if (date_d_m < 10) {
    date_d_m = "0" + date_d_m;
  }

  return date_d_m;
}

// Calculate progress percentage
function getProgressPercentage(start_date, endDate) {
  let dif_between_dates = Date.parse(endDate) - Date.parse(start_date);
  const one_percent = dif_between_dates / 100;

  // Get date time till now
  let till_now_sec = new Date();
  let till_start_date_sec = Date.parse(start_date);

  // Calculate how many percent done
  const done_percent = (till_now_sec - till_start_date_sec) / one_percent;

  return Math.floor(done_percent);
}

function checkTaskStatus() {
  let taskProgress = parseInt(document.getElementById("task_progress").innerText);
  taskProgressCanvas(taskProgress);
  if (taskProgress == 100) {
    document.getElementById("task_compleated").innerText = "Complete";
  } else {
    document.getElementById("task_compleated").innerText = "Not Complete";
  }
}

function setTaskCompleated() {
  document.getElementById("task_end_date").value = (new Date()).getFullYear() + "-" + convertDate((new Date()).getMonth() + 1) + "-" + convertDate((new Date()).getDate());
  document.querySelector(".done-btn").style = "display:none;";
  document.querySelector(".uncheckt-btn").style = "display:inline-block;";
  calculateProgress();
}

function setTaskNotCompleated() {
  document.getElementById("task_end_date").value = (new Date()).getFullYear() + "-" + convertDate((new Date()).getMonth() + 1) + "-" + convertDate((new Date()).getDate() + 1);
  document.querySelector(".done-btn").style = "display:inline-block;";
  document.querySelector(".uncheckt-btn").style = "display:none;";
  calculateProgress();
}

function editMountanTask() {
  document.querySelector(".edit-btn").style = "display: none;";
  document.querySelector(".save-btn").style = "display: inline-block;";
  document.querySelector(".done-btn").style = "display: none;";
  document.querySelector(".delete-btn").style = "display: none;";
  document.querySelector(".cancel-btn").style = "display: inline-block;";

  let end_date = document.getElementById("task_end_date");
  end_date.disabled = false;
  end_date.style = "border-radius: 4px; border-color: #a6a6a6; color: #a6a6a6; border-style: solid; text-align: right;";

  let start_date = document.getElementById("task_start_date");
  start_date.disabled = false;
  start_date.style = "border-radius: 4px; border-color: #a6a6a6; color: #a6a6a6; border-style: solid; text-align: right;";

  document.getElementById("task_name").style = "display:none;";
  document.getElementById("new-task-name").style = "display:inline-block; border-radius: 4px; border-color: #a6a6a6; color: #a6a6a6; border-style: solid;";
}

function cancelEditing() {
  window.location.reload();
}

function saveEditedTask(event) {
  event.preventDefault();
  const form = document.getElementById("edit-task-form");
  form.requestSubmit();
}

function taskProgressCanvas(progress = 0) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // Cleaning previous picture
  ctx.beginPath();
  ctx.strokeStyle = "#ffffff";
  for (let inter = 0; inter <= 20; inter++) {
    ctx.moveTo(0, 0 + inter);
    ctx.lineTo(20, 0 + inter);
  }
  ctx.stroke();

  // Drawing mountains
  ctx.beginPath();
  ctx.moveTo(0, 20);
  ctx.strokeStyle = "#a6a6a6";
  ctx.lineTo(8, 0);
  ctx.lineTo(16, 20);
  ctx.lineTo(0, 20);
  ctx.moveTo(16, 20);
  ctx.lineTo(20, 20);
  ctx.lineTo(16, 10);
  ctx.lineTo(14, 15);
  ctx.stroke();

  // Creating progress (fill mountain)
  ctx.beginPath();
  ctx.strokeStyle = "#4dc05a";
  if (!(progress <= 0)) {
    for (let i = 0, ii = 0; i <= progress / 5.5; i++, ii += 0.5) {
      ctx.moveTo(1 + ii / 1.6, 19 - i);
      ctx.lineTo(16 - ii, 19 - i);
    }
  }
  ctx.stroke();
}
