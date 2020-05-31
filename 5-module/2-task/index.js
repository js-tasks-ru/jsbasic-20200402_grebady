function toggleText() {
  document.addEventListener("click", toggleIt)
}
function toggleIt(event) {
  if (event.target.classList.contains("toggle-text-button")){
    let text = document.getElementById("text");
    text.hidden = !text.hidden;
  }
}
