// src/renderer/renderer.js

window.addEventListener("DOMContentLoaded", () => {
  const message = document.getElementById("message");
  const icon = document.getElementById("card-icon");

  function updateDateTime() {
    const now = new Date();
    const optionsDate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = now.toLocaleDateString("en-US", optionsDate);
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    document.getElementById(
      "datetime"
    ).textContent = `${formattedDate} — ${formattedTime}`;
  }
  
  function showMessage(text, type = "default") {
    // Reset all color classes
    message.classList.remove("text-green-600", "text-blue-600", "text-red-600");

    // Apply color based on type
    if (type === "success") message.classList.add("text-green-600");
    if (type === "checkout") message.classList.add("text-blue-600");
    if (type === "error") message.classList.add("text-red-600");

    // Reset animation
    message.classList.remove("fade-enter-active");
    void message.offsetWidth;
    message.classList.add("fade-enter", "fade-enter-active");

    message.textContent = text;
  }

  // Update date & time every second
  updateDateTime();
  setInterval(updateDateTime, 1000);

  window.nfcAPI.onCardDetected((msg) => {
    icon.classList.remove("pulse");

    // Evaluate message category
    let type = "default";
    if (msg.includes("Welcome")) type = "success";
    if (msg.includes("See you")) type = "checkout";
    if (msg.includes("Failed")) type = "error";

    showMessage(msg, type);

    // Reset after 2 seconds
    setTimeout(() => {
      showMessage("Tap your ID card to record your attendance.");
      icon.classList.add("pulse");
    }, 2000);
  });
});
