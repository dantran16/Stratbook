const editNadeButtons = document.querySelectorAll(".edit-nade-button");


editNadeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const index = button.id.substring(button.id.length - 1, button.id.length);
    const x = document.querySelector(`#description${index}`);
    const y = document.querySelector(`#edit-description-form${index}`)
    console.log(button.id)
    if (x.style.display === "none") {
      x.style.display = "inline";
      y.style.display = "none";
    }
    else {
      x.style.display = "none";
      y.style.display = "inline"
    }
  })
})