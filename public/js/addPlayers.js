const numberInput = document.querySelector("#number");

numberInput.addEventListener('change', (e) => {
  if (numberInput.value > 5) {
    return;
  }
  console.log(numberInput.value);
  const forms = document.querySelectorAll(".add-player-form");
  console.log(forms);
  for (let form of forms) {
    form.remove()
  }
  for (let i = 0; i < numberInput.value; i++){
    const playerForm = document.createElement("div");
    playerForm.classList.add("add-player-form")
    const div0 = document.createElement("div");
    div0.classList.add("mb-3");
    div0.innerHTML = `<label class="form-label" for="name${i}">Player ${i+1} Name</label>
      <input class="form-control" type="text" id="name${i}" name="player${i}[name]" required>
      <div class="valid-feedback"> Looks good!</div>`
    const div1 = document.createElement('div');
    div1.classList.add("mb-3");
    div1.innerHTML = `<label class="form-label" for="role${i}">Player ${i+1} Role</label>
      <select class="form-select" name="player${i}[role]" id="role${i}">
      <option value=""> </option>
      <option value="Entry">Entry</option>
      <option value="Support">Support</option>
      <option value="2nd">2nd</option>
      <option value="IGL">IGL</option>
      <option value="AWP">AWP</option>
      <option value="Lurk">Lurk</option>
      <option value="Fill">Fill</option>
      </select>
      <div class="valid-feedback"> Looks good!</div>`
    
    const div2 = document.createElement('div');
    div2.classList.add("mb-3");
    div2.innerHTML = `<label class="form-label" for="position${i}">Player ${i + 1} Position</label>
      <input class="form-control" type="text" id="position${i}" name="player${i}[position]" required>
      <div class="valid-feedback"> Looks good!</div>`
    
    const div3 = document.createElement('div');
    div3.classList.add("mb-3");
    div3.innerHTML = `<label class="form-label" for="description${i}">Player ${i + 1} Description</label>
      <textarea class="form-control" type="text" id="description${i}" name="player${i}[description]" required></textarea>
      <div class="valid-feedback"> Looks good!</div>`

    const playersSection = document.querySelector("#players-section")

    playerForm.append(div0, div1, div2, div3);

    playersSection.append(playerForm);
  }
})


