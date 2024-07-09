// app/javascript/controllers/tasks_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tasks", "taskTemplate"]

  addTask(event) {
    event.preventDefault()
    const content = this.taskTemplateTarget.innerHTML.replace(/TEMPLATE_INDEX/g, new Date().getTime())
    this.tasksTarget.insertAdjacentHTML('beforeend', content)
  }

  removeTask(event) {
    event.preventDefault()
    const taskElement = event.target.closest(".task-field")
    if (taskElement.dataset.newRecord == "true") {
      taskElement.remove()
    } else {
      taskElement.querySelector("input[name*='_destroy']").value = 1
      taskElement.style.display = 'none'
    }
  }
}
