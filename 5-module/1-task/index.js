function hideSelf() {
  document.addEventListener("click", hideMe);
}

function hideMe(event) {
  if (event.target.classList.contains("hide-self-button")){
    event.target.hidden = !event.target.hidden;
  }
}

