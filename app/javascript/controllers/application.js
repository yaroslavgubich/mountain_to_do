import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }
console.log("dimitris stim")

import GoalsController from "controllers/goals_controller"
application.register("goals", GoalsController)


import FocusDateController from "./focus_date_controller"
application.register("focus-date", FocusDateController)
