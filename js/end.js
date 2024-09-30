document.addEventListener("DOMContentLoaded", (event) => {
  // جلب النقاط من localStorage
  let score = +localStorage.getItem("score") + 1 || 0;
  document.getElementById("score").textContent = score;
});

function handlePlayAgain() {
  window.location.href = "index.html";
}
