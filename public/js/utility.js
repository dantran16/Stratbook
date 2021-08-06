const editNadeButtons = document.querySelectorAll(".edit-nade-button");


editNadeButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const index = button.id.substring(button.id.length - 1, button.id.length);
    const description = document.querySelector(`#description${index}`);
    const editDescriptionDiv = document.querySelector(`#edit-nade-description-div${index}`);
    const descriptionSubmitButton = document.querySelector(`#description-submit-button${index}`);
    if (description.style.display === "none") {
      description.style.display = "inline-block";
      editDescriptionDiv.style.display = "none";
    }
    else {
      description.style.display = "none";
      editDescriptionDiv.style.display = "inline-block";
    }
    descriptionSubmitButton.style.visibility = "hidden";
  })
})

const editNadeDescriptionForms = document.querySelectorAll(".edit-description-textarea")

editNadeDescriptionForms.forEach((form) => {
  const index = form.id.substring(form.id.length - 1, form.id.length);
  form.addEventListener('click', () => {
    const x = document.querySelector(`#description-submit-button${index}`)
    x.style.visibility = "visible";
  })
})
