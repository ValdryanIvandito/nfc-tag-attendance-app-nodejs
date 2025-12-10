// src/renderer/renderer.js

window.addEventListener("DOMContentLoaded", () => {
  const message = document.getElementById("message");

  window.nfcAPI.onCardDetected((msg) => {
    message.textContent = msg;
    setTimeout(() => {
      message.textContent = "Tap your ID card to record your attendance.";
    }, 1500);
  });
});
