const editNadeButtons = document.querySelectorAll(".edit-nade-button");


editNadeButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const index = button.id.substring(button.id.length - 1, button.id.length);
    const description = document.querySelector(`#description${index}`);
    const editDescriptionForm = document.querySelector(`#edit-description-form${index}`);
    const editDescriptionDiv = document.querySelector(`#edit-description-div${index}`);
    const descriptionSubmitButton = document.querySelector(`#description-submit-button${index}`);
    if (description.style.display === "none") {
      description.style.display = "inline-block";
      editDescriptionForm.style.display = "none";
      editDescriptionDiv.style.display = "none";
    }
    else {
      description.style.display = "none";
      editDescriptionForm.style.display = "inline-block";
      editDescriptionDiv.style.display = "inline-block";
    }
    descriptionSubmitButton.style.visibility = "hidden";
  })
})

const editNadeDescriptionForms = document.querySelectorAll(".edit-description-form")

editNadeDescriptionForms.forEach((form) => {
  const index = form.id.substring(form.id.length - 1, form.id.length);
  form.addEventListener('click', () => {
    const x = document.querySelector(`#description-submit-button${index}`)
    x.style.visibility = "visible";
  })
})