

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
