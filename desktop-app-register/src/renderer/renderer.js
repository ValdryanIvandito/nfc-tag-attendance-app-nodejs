// window.addEventListener("DOMContentLoaded", () => {
//   // Fungsi menampilkan toast dengan animasi
//   function showToast(message, type = "error", duration = 3000) {
//     const container = document.getElementById("toast");
//     if (!container) return;

//     // Buat elemen toast
//     const toast = document.createElement("div");
//     toast.className = `
//       px-4 py-2 rounded shadow-lg text-white font-medium transform transition-all duration-300
//       ${type === "error" ? "bg-red-500" : "bg-green-500"}
//       opacity-0 translate-y-4
//     `;
//     toast.textContent = message;

//     // Masukkan ke container
//     container.appendChild(toast);

//     // Trigger animasi masuk
//     requestAnimationFrame(() => {
//       toast.classList.remove("opacity-0", "translate-y-4");
//       toast.classList.add("opacity-100", "translate-y-0");
//     });

//     // Hapus toast setelah duration dengan animasi keluar
//     setTimeout(() => {
//       toast.classList.remove("opacity-100", "translate-y-0");
//       toast.classList.add("opacity-0", "translate-y-4");

//       // Hapus dari DOM setelah animasi selesai
//       toast.addEventListener("transitionend", () => {
//         toast.remove();
//       });
//     }, duration);
//   }

//   /** PAGE: index.html */
//   if (window.location.pathname.endsWith("index.html")) {
//     const nextButton = document.getElementById("nextButton");
//     if (nextButton) {
//       nextButton.addEventListener("click", () => {
//         const fullName = document.getElementById("full_name").value.trim();
//         const department = document.getElementById("department").value;
//         const position = document.getElementById("position").value;

//         if (!fullName || !department || !position) {
//           showToast("Please complete all fields before proceeding.", "error");
//           if (!fullName) document.getElementById("full_name").focus();
//           else if (!department) document.getElementById("department").focus();
//           else if (!position) document.getElementById("position").focus();
//           return;
//         }

//         localStorage.setItem("employee_fullname", fullName);
//         localStorage.setItem("employee_department", department);
//         localStorage.setItem("employee_position", position);

//         window.location.href = "tap-card.html";
//       });
//     }
//   }

//   /** PAGE: tap-card.html */
//   if (window.location.pathname.endsWith("tap-card.html")) {
//     const statusText = document.getElementById("statusText");

//     if (window.api && window.api.startNFC) {
//       window.api.startNFC();
//       statusText.classList.add("text-blue-600");
//       statusText.textContent = "Waiting for NFC card...";
//     }

//     window.api.onCardDetected(async (uid) => {
//       // Reset statusText & kelas warna
//       statusText.textContent = "";
//       statusText.classList.remove(
//         "text-green-600",
//         "text-red-600",
//         "text-blue-600"
//       );

//       const full_name = localStorage.getItem("employee_fullname");
//       const department = localStorage.getItem("employee_department");
//       const position = localStorage.getItem("employee_position");
//       const payload = { uid, full_name, department, position };

//       try {
//         const res = await window.api.createEmployee(payload);

//         // Delay kecil sebelum update teks
//         // await new Promise((r) => setTimeout(r, 200)); // 50ms

//         if (res.status) {
//           statusText.textContent = "Registration Succeed!";
//           statusText.classList.add("text-green-600");
//         } else {
//           statusText.textContent =
//             "Registration Failed!\nPlease try with a new NFC Card...";
//           statusText.classList.add("text-red-600");
//         }
//       } catch (err) {
//         // await new Promise((r) => setTimeout(r, 50)); // delay juga di catch
//         statusText.textContent =
//           "Registration Failed!\nPlease contact technical support.";
//         statusText.classList.add("text-red-600");
//       }
//     });
//   }
// });

window.addEventListener("DOMContentLoaded", () => {
  // Fungsi menampilkan toast dengan animasi
  function showToast(message, type = "error", duration = 3000) {
    const container = document.getElementById("toast");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `
      px-4 py-2 rounded shadow-lg text-white font-medium transform transition-all duration-300
      ${type === "error" ? "bg-red-500" : "bg-green-500"}
      opacity-0 translate-y-4
    `;
    toast.textContent = message;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove("opacity-0", "translate-y-4");
      toast.classList.add("opacity-100", "translate-y-0");
    });

    setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add("opacity-0", "translate-y-4");
      toast.addEventListener("transitionend", () => toast.remove());
    }, duration);
  }

  /** PAGE: index.html */
  if (window.location.pathname.endsWith("index.html")) {
    const nextButton = document.getElementById("nextButton");
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const fullName = document.getElementById("full_name").value.trim();
        const department = document.getElementById("department").value;
        const position = document.getElementById("position").value;

        if (!fullName || !department || !position) {
          showToast("Please complete all fields before proceeding.", "error");
          if (!fullName) document.getElementById("full_name").focus();
          else if (!department) document.getElementById("department").focus();
          else if (!position) document.getElementById("position").focus();
          return;
        }

        localStorage.setItem("employee_fullname", fullName);
        localStorage.setItem("employee_department", department);
        localStorage.setItem("employee_position", position);

        window.location.href = "tap-card.html";
      });
    }
  }

  /** PAGE: tap-card.html */
  if (window.location.pathname.endsWith("tap-card.html")) {
    const statusText = document.getElementById("statusText");
    const retryButton = document.getElementById("retryButton");

    retryButton.classList.add("hidden");

    function updateStatus(message, colorClass) {
      statusText.textContent = message;
      statusText.className = colorClass;
    }

    function clearStatus() {
      statusText.textContent = "";
      statusText.classList.remove(
        "text-green-600",
        "text-red-600",
        "text-blue-600"
      );
    }

    // Start NFC saat halaman dibuka
    if (window.api.startNFC) {
      window.api.startNFC();
      updateStatus("Waiting for NFC card...", "text-blue-600");
    }

    retryButton.addEventListener("click", () => {
      retryButton.classList.add("hidden");
      clearStatus();
      updateStatus("Waiting for NFC card...", "text-blue-600");

      window.api.startNFC();
    });

    window.api.onCardDetected(async (uid) => {
      window.api.stopNFC();
      updateStatus("Processing registration...", "text-blue-600");
      await new Promise((r) => setTimeout(r, 3000));

      const full_name = localStorage.getItem("employee_fullname");
      const department = localStorage.getItem("employee_department");
      const position = localStorage.getItem("employee_position");
      const payload = { uid, full_name, department, position };

      try {
        const res = await window.api.createEmployee(payload);

        console.log("RES STATUS RENDER", res.status);

        if (res.status) {
          statusText.textContent = "Registration Succeed!";
          statusText.classList.add("text-green-600");
          await new Promise((r) => setTimeout(r, 3000));
          window.location.href = "index.html";
        } else {
          statusText.textContent =
            "Registration Failed!\nPlease try with a new NFC Card...";
          statusText.classList.add("text-red-600");
          retryButton.classList.remove("hidden");
        }
      } catch (err) {
        updateStatus(
          "Registration Failed!\nPlease contact technical support.",
          "text-red-600"
        );
      }
    });
  }
});
