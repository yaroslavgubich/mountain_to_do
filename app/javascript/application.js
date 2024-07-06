import "@hotwired/turbo-rails"
import "controllers"
import "@popperjs/core"
import "bootstrap"
// import "progress"  

import { application } from "@hotwired/stimulus"
import GoalsController from "controllers/goals_controller"
application.register("goals", GoalsController)