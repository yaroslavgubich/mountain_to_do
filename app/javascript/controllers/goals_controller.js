import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tasksList", "taskTemplate"];

  connect() {
    this.initializeTasksCounter();
    console.log("Goals Controller connected. Initial task count:", this.newTaskInter);
  }

  initializeTasksCounter() {
    this.newTaskInter = this.tasksListTarget.children.length;
    console.log(`Initial task counter set to: ${this.newTaskInter}`);
  }

  addTask(event) {
    event.preventDefault();
    console.log("Add Task button clicked");

    // Ensure the last task fields are filled
    if (this.newTaskInter > 0) {
      const lastDeadlineField = document.querySelector(`#nm${this.newTaskInter - 1}_deadline`);
      const lastNameField = document.querySelector(`#nm${this.newTaskInter - 1}_name`);

      if (!lastDeadlineField || !lastNameField) {
        console.error("Previous task fields not found.");
        return;
      }

      const firstPermission = lastDeadlineField.value !== "";
      const secondPermission = lastNameField.value !== "";

      if (!firstPermission) {
        lastDeadlineField.style.borderColor = "indianred";
      } else {
        lastDeadlineField.style.borderColor = "#cecece";
      }

      if (!secondPermission) {
        lastNameField.style.borderColor = "indianred";
      } else {
        lastNameField.style.borderColor = "#cecece";
      }

      if (!firstPermission || !secondPermission) {
        return; // Exit if previous task fields are not filled
      }
    }

    const content = this.taskTemplateTarget.innerHTML.replace(/TEMPLATE_INDEX/g, this.newTaskInter);
    this.tasksListTarget.insertAdjacentHTML("beforeend", content);
    this.newTaskInter++;
    console.log(`Task added. New task counter: ${this.newTaskInter}`);
  }

  removeTask(event) {
    event.preventDefault();
    console.log("Remove Task button clicked");

    const item = event.target.closest(".task-field");
    if (item) {
      item.remove();
      this.updateTaskIndices();
    }
  }

  updateTaskIndices() {
    const taskElements = this.tasksListTarget.children;
    this.newTaskInter = taskElements.length;
    this.tasks_ids = [];

    Array.from(taskElements).forEach((task, index) => {
      task.id = `task_nr${index}`;
      task.querySelectorAll("input").forEach(input => {
        const name = input.name.replace(/\d+/, index);
        const id = input.id.replace(/\d+/, index);
        input.name = name;
        input.id = id;
      });
      this.tasks_ids.push(`task_nr${index}`);
    });
    console.log(`Task indices updated. Current task counter: ${this.newTaskInter}`);
  }

  newTaskCounterReset(event) {
    console.log('Form submitted');
    this.removeEmptyTasks();
  }

  removeEmptyTasks() {
    const taskElements = this.tasksListTarget.children;

    Array.from(taskElements).forEach(task => {
      const deadlineField = task.querySelector("input[name*='[deadline]']");
      const nameField = task.querySelector("input[name*='[name]']");

      if (!deadlineField.value || !nameField.value) {
        task.remove();
      }
    });

    this.updateTaskIndices();
  }
}
