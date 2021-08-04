const addPlayerButton = document.querySelector("#toggle-add-player-form");

addPlayerButton.addEventListener('click', () => {
  const playerForm = document.querySelector("#player-form");
  console.log(playerForm.style.display)
  if (playerForm.style.display === "none" || playerForm.style.display==="") {
    playerForm.style.display = "block"
  }
  else {
    playerForm.style.display = "none";
  }
})

