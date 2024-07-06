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
    }

    if (end_date.value == '') {
      /* Creating end date */
      let end_task_date = new Date(document.getElementById("task_deadline").innerText);
      let end_task_year = end_task_date.getFullYear();
      let end_task_month = end_task_date.getMonth();
      let end_task_day = end_task_date.getDate();

      /* Check or month less that 9 */
      end_task_month = convertDate(end_task_month);

      /* Check or month less that 9 */
      end_task_day = convertDate(end_task_day);

      /* Update end date with new value */
      var task_end_day = end_task_year +"-"+end_task_month+"-"+end_task_day;
      end_date.value = task_end_day;
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

    checkTaskStatus();

  }, 1500);
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
  if (taskProgress == 100) {
    document.getElementById("task_compleated").innerText = "Complete";
  }

}
