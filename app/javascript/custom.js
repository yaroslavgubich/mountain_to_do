function menuOption() {
  let login_menu = document.getElementById('login_dropdown_content');

  if (login_menu.style.display == '') {
    /* Show content */
    login_menu.style.display = "block";
    console.log("Showing");
  } else if (login_menu.style.display == 'block') {
    /* Hide content */
    login_menu.style.display = "none";
    console.log("Hiding");
  }

}
