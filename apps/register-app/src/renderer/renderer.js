/* src/renderer/renderer.js */

window.addEventListener("DOMContentLoaded", () => {
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
    const departmentSelect = document.getElementById("department");
    const positionSelect = document.getElementById("position");

    const positionMap = {
      ENGINEERING: [
        "FULLSTACK_DEVELOPER",
        "FRONTEND_DEVELOPER",
        "BACKEND_DEVELOPER",
        "DEVOPS_ENGINEER",
        "QA_ENGINEER",
      ],
      DESIGN: ["UI_UX_DESIGNER", "GRAPHIC_DESIGNER", "MOTION_DESIGNER"],
      PRODUCT: ["PRODUCT_MANAGER", "PRODUCT_RESEARCHER", "PRODUCT_ANALYST"],
      MARKETING: ["DIGITAL_MARKETER", "CONTENT_WRITER", "SEO_SPECIALIST"],
      OPERATIONS: [
        "OPERATIONS_MANAGER",
        "OPERATION_STAFF",
        "HR_MANAGER",
        "HR_STAFF",
      ],
    };

    departmentSelect.addEventListener("change", () => {
      const selectedDepartment = departmentSelect.value;

      positionSelect.innerHTML = `<option value="">Select position</option>`;

      if (!selectedDepartment || !positionMap[selectedDepartment]) return;

      positionMap[selectedDepartment].forEach((pos) => {
        const option = document.createElement("option");
        option.value = pos;
        option.textContent = pos;
        positionSelect.appendChild(option);
      });
    });

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
        "text-blue-600",
      );
    }

    if (window.api.startNFC) {
      window.api.startNFC();
      updateStatus("Waiting for NFC card...", "text-blue-600");
    }

    retryButton.addEventListener("click", () => {
      clearStatus();
      updateStatus("Waiting for NFC card...", "text-blue-600");
      retryButton.classList.add("hidden");
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

        if (res.status) {
          updateStatus("Registration Succeed!", "text-green-600");
        } else {
          updateStatus(
            "Registration Failed!\nPlease try with a new NFC Card.",
            "text-red-600",
          );
          retryButton.classList.remove("hidden");
        }
      } catch (err) {
        updateStatus(
          "Registration Failed!\nPlease contact technical support.",
          "text-red-600",
        );
      }
    });
  }
});
