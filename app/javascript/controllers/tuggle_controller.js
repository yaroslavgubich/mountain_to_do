import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tuggle"
export default class extends Controller {
  static targets = ["dropdown"]
  connect() {
    console.log("Hello from tuggle controller")
    // console.log(this.dropdownTarget)
    window.addEventListener('click', (event) => {
      if (!event.target.matches('.three-dots-icon')) {
      document.querySelectorAll('.dropdown-content').forEach((dropdown) => {
      dropdown.classList.remove('show');
      });
  }
    })
  }

  toggleDropdown(event){
    // console.log(this.dropdownTarget)
    document.querySelectorAll('.dropdown-content').forEach((dropdown) => {
      if (dropdown != this.dropdownTarget) {
        dropdown.classList.remove('show');
      }
    });
    this.dropdownTarget.classList.toggle('show');
  }
}
