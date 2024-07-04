import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tasksList", "taskTemplate"];

  connect() {
    this.initializeTasksCounter();
    console.log("Tasks Controller connected");
  }

  initializeTasksCounter() {
    this.newTaskInter = this.tasksListTarget.children.length;
    console.log(`Initial task counter set to: ${this.newTaskInter}`);
  }

  addTask(event) {
    event.preventDefault();

    const lastDeadlineField = document.querySelector(`#nm${this.newTaskInter - 1}_deadline`);
    const lastNameField = document.querySelector(`#nm${this.newTaskInter - 1}_name`);

    if (!lastDeadlineField || !lastNameField) {
      console.error("Previous task fields not found.");
      return;
    }

    const first_permission = lastDeadlineField.value !== "";
    const second_permission = lastNameField.value !== "";

    if (!first_permission) {
      lastDeadlineField.style.borderColor = "indianred";
    } else {
      lastDeadlineField.style.borderColor = "#cecece";
    }

    if (!second_permission) {
      lastNameField.style.borderColor = "indianred";
    } else {
      lastNameField.style.borderColor = "#cecece";
    }

    if (first_permission && second_permission) {
      const endDate = new Date(lastDeadlineField.value);
      const startDate = Date.now();
      const timeDifferenceMS = endDate - startDate;
      const timeDifferenceDays = Math.floor(timeDifferenceMS / (1000 * 60 * 60 * 24));
      const timeDifferenceHours = Math.floor((timeDifferenceMS % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const timeDifferenceMins = Math.floor((timeDifferenceMS % (1000 * 60 * 60)) / (1000 * 60));

      const content = this.taskTemplateTarget.innerHTML.replace(/TEMPLATE_INDEX/g, this.newTaskInter);
      this.tasksListTarget.insertAdjacentHTML("beforeend", content);

      document.getElementById(`nm${this.newTaskInter}_time_left`).value = `${timeDifferenceDays}d ${timeDifferenceHours}h ${timeDifferenceMins}m`;

      this.newTaskInter++;
      console.log(`Task added. New task counter: ${this.newTaskInter}`);
    }
  }

  removeTask(event) {
    event.preventDefault();

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
  }
}

}
