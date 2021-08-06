const toggleNadeFormButton = document.querySelector("#toggle-nade-form-button");

toggleNadeFormButton.addEventListener('click', () => {
  const nadeForm = document.querySelector("#nade-form");
  if (nadeForm.style.display === "none" || nadeForm.style.display=== "") {
    nadeForm.style.display = "flex"
    toggleNadeFormButton.style.display = "none"
  }
})

