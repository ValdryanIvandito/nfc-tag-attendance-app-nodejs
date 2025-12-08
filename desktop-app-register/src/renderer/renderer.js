// src/renderer/renderer.js

window.addEventListener("DOMContentLoaded", () => {
    const msg = document.getElementById("message");

    window.nfcAPI.onCardDetected((uid) => {
        msg.textContent = `ID Anda adalah ${uid}`;
        setTimeout(() => {
            msg.textContent = "Tap kartu ID Anda";
        }, 5000);
    });
});
