function calculateProgress () {
  setTimeout(function () {

    /* Retriving start and end task information */
    let start_date = document.getElementById("task_start_date");
    let end_date = document.getElementById("task_end_date");

    // If no start date will set today date
    if (start_date.value == '') {
      const today_date = new Date();
      let st_year = today_date.getFullYear();
      let st_month = today_date.getMonth()+1;
      let st_day = today_date.getDate();

      /* Check or month less that 9 */
      st_month = convertDate(st_month);

      /* Check or month less that 9 */
      st_day = convertDate(st_day);

      /* Update start date with new value */
      var task_start_day = st_year +"-"+ st_month +"-"+ st_day;
      start_date.value = task_start_day;
    } else {
      var task_start_day = start_date.value;
    }

    if (end_date.value == '') {
      /* Creating end date */
      let end_task_date = new Date(document.getElementById("task_deadline").innerText);
      let end_task_year = end_task_date.getFullYear();
      let end_task_month = end_task_date.getMonth()+1;
      let end_task_day = end_task_date.getDate();

      /* Check or month less that 9 */
      end_task_month = convertDate(end_task_month);

      /* Check or month less that 9 */
      end_task_day = convertDate(end_task_day);

      /* Update end date with new value */
      var task_end_day = end_task_year +"-"+end_task_month+"-"+end_task_day;
      end_date.value = task_end_day;
    } else {
      var task_end_day = end_date.value;
    }

    // Set progres in percentage
    if ((start_date.value != '') || (end_date.value != '')) {

      // If start date earlier as end date
      if (Date.parse(task_start_day) < Date.parse(task_end_day)) {
        document.getElementById("task_progress").innerText = getProgressPercentage(task_start_day, task_end_day)+"%";
      } else {
        document.getElementById("task_progress").innerText = "100%";
      }
    }

    task_end_day = null;
    checkTaskStatus();

  }, 1000);
}

// Add 0 if day or month date less 10
function convertDate (date_d_m) {
  if (date_d_m < 10) {
    date_d_m = "0"+date_d_m;
  }

  return date_d_m;
}

// Calculate progress percentage
function getProgressPercentage (start_date, endDate) {
  let dif_bettveen_dates = Date.parse(endDate) - Date.parse(start_date);
  const one_percent = dif_bettveen_dates / 100;

  // Get date time till now
  let till_now_sec = new Date();
  let till_start_date_sec = Date.parse(start_date);

  // Calculate how many percent done
  const done_percent = (till_now_sec-till_start_date_sec) / one_percent;

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
  // document.getElementById("mark_complete").checked = true;
  document.getElementById("task_end_date").value = (new Date()).getFullYear() +"-"+convertDate((new Date()).getMonth()+1)+"-"+convertDate((new Date()).getDay());
  document.querySelector(".done-btn").style="display:none;";
  document.querySelector(".uncheckt-btn").style="display:inline-block;";
  calculateProgress();
}

function setTaskNotCompleated() {
  // document.getElementById("mark_complete").checked = false;
  document.getElementById("task_end_date").value = (new Date()).getFullYear() +"-"+convertDate((new Date()).getMonth()+1)+"-"+convertDate((new Date()).getDay()+1)
  document.querySelector(".done-btn").style="display:inline-block;";
  document.querySelector(".uncheckt-btn").style="display:none;";
  calculateProgress();
}

function editMountanTask() {
  document.querySelector(".edit-btn").style="display: none;";
  document.querySelector(".save-btn").style="display: inline-block;";
  document.querySelector(".done-btn").style="display: none;";
  document.querySelector(".delete-btn").style="display: none;";
  document.querySelector(".cancel-btn").style="display: inline-block;";

  let end_date = document.getElementById("task_end_date");
  end_date.disabled = false;
  end_date.style="border-radius: 4px; border-color: #a6a6a6; color: #a6a6a6; border-style: solid; text-align: right;";

  let start_date = document.getElementById("task_start_date");
  start_date.disabled = false;
  start_date.style="border-radius: 4px; border-color: #a6a6a6; color: #a6a6a6; border-style: solid; solid; text-align: right;";

  document.getElementById("task_name").style="display:none;";
  document.getElementById("new-task-name").style="display:inline-block; border-radius: 4px; border-color: #a6a6a6; color: #a6a6a6; border-style: solid; solid;";

}

function cancelEditing() {
  window.location.reload();
}

function saveEditedTask() {
  // Need collect and save all new goal data
  window.location.reload();
}

function taskProgressCanvas(progress = 0) {
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

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

ctx.beginPath();
ctx.strokeStyle = "#4dc05a";


// MAx i<=18
if (!(progress <= 0)) {
  for (i=0, ii=0; i<= progress/5.5; i++, ii+=0.5) {
        ctx.moveTo(1+ii/1.6, 19-i);
        ctx.lineTo(16-ii, 19-i);
  }
}

ctx.stroke();


}
