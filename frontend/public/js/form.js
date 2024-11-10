document.addEventListener("DOMContentLoaded", function () {
  // Redirect to login if not logged in
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
      window.location.href = "/login.html";
      return;
  }

  // Autofill form fields if student data exists in sessionStorage
  const studentData = JSON.parse(
      sessionStorage.getItem("studentData") || "{}"
  );
  if (Object.keys(studentData).length > 0) {
      autofillForm(studentData);
  }

  function autofillForm(data) {
      const topicElement = document.querySelector("h1.topic");
      const topicText = topicElement ? topicElement.textContent : "";

      const fieldsToFill = {
          full_name: data.fullName,
          registration_number: data.registrationNumber,
          faculty: data.faculty,
          department: data.department,
          email: data.email,
          subject: topicText,
      };

      for (const [fieldId, value] of Object.entries(fieldsToFill)) {
          const input = document.getElementById(fieldId);
          if (input && value) {
              input.value = value;
          }
      }
  }

  function showPopup(title, message, isSuccess = true) {
      const overlay = document.createElement("div");
      overlay.id = "popup-overlay";
      overlay.style.position = "fixed";
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = 1000;

      const popup = document.createElement("div");
      popup.id = "popup";
      popup.style.backgroundColor = "white";
      popup.style.padding = "20px";
      popup.style.borderRadius = "10px";
      popup.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.1)";
      popup.style.textAlign = "center";
      popup.style.width = "690px";
      popup.style.display = "flex";
      popup.style.flexDirection = "column";
      popup.style.alignItems = "center";
      popup.style.justifyContent = "center";
      popup.style.gap = "20px";

      popup.innerHTML = `
    <div style="width: 80px; height: 80px; background-color: ${
        isSuccess ? "#3BAD3E" : "#d9534f"
    }; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
      <span style="font-size: 40px; color: white; font-weight: bold;">${
          isSuccess ? "&#10004;" : "&#10006;"
      }</span>
    </div>
    <h2 style="font-size: 35px; color: #333; margin: 0 0 10px;">${title}</h2>
    <p style="font-size: 20px; color: #666; margin: 0 0 20px;">${message}</p>
  `;

      const button = document.createElement("button");
      button.innerText = "ตกลง";
      button.style.padding = "10px 20px";
      button.style.fontSize = "16px";
      button.style.color = "white";
      button.style.backgroundColor = isSuccess ? "#3BAD3E" : "#d9534f";
      button.style.border = "none";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";
      button.style.margin = "0 auto";

      button.onclick = () => {
          document.body.removeChild(overlay); // Close the popup
          if (isSuccess) window.location.href = "/template/template.html"; // Redirect if successful
      };

      popup.appendChild(button);
      overlay.appendChild(popup);
      document.body.appendChild(overlay);
  }

  // Enhanced form validation logic
  function validateForm(form) {
      let isValid = true;
      form.querySelectorAll(
          "input[required], select[required], textarea[required]"
      ).forEach((input) => {
          if (!input.value.trim()) {
              // Check if field is empty or only contains whitespace
              input.style.borderColor = "red";
              isValid = false;
          } else {
              input.style.borderColor = "";
          }
      });
      return isValid;
  }

  // Get all forms and add event listener for submission
  document.querySelectorAll("form.main-form").forEach((form) => {

      form.querySelector(".draft-button").addEventListener(
          "click",
          function (event) {
              event.preventDefault();
              const formStatus = "draft"; // Set formStatus
              if (validateForm(form)) {
                  submitForm(
                      form,
                      "แบบร่างของคุณถูกบันทึกแล้ว",
                      "แบบร่างของคุณถูกบันทึกสำเร็จ",
                      formStatus
                  );
              } else {
                  showPopup(
                      "การบันทึกไม่สำเร็จ",
                      "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
                      false
                  );
              }
          }
      );

      form.querySelector(".submit-button").addEventListener(
          "click",
          function (event) {
              event.preventDefault();
              const formStatus = "pending"; // Set formStatus
              if (validateForm(form)) {
                  submitForm(
                      form,
                      "การยื่นคำร้องสำเร็จ",
                      "คำร้องของคุณกำลังรอการอนุมัติ",
                      formStatus
                  );
              } else {
                  showPopup(
                      "การยื่นคำร้องไม่สำเร็จ",
                      "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
                      false
                  );
              }
          }
      );

      function submitForm(form, title, message, formStatus) {
        const formData = {};
        const topicElement = document.querySelector("h1.topic");
        formData["formType"] = topicElement ? topicElement.innerText : "";
        formData["formStatus"] = formStatus; // Correctly set formStatus
    
        // Collect all form data based on correct IDs and names
        form.querySelectorAll("input, select, textarea").forEach((input) => {
            const fieldName = input.name; // Use `name` attribute for consistency
            if (input.type === "radio" && input.checked) {
                formData[fieldName] = input.value;
            } else if (input.type === "checkbox") {
                formData[fieldName] = input.checked;
            } else if (input.type !== "radio") {
                formData[fieldName] = input.value;
            }
        });
    
        console.log("Submitting form data:", formData); // Debugging line
    
        // Send the form data to the backend
        fetch("http://localhost:8080/api/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Form submitted successfully:", data);
                showPopup(title, message);
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
                showPopup("การยื่นคำร้องไม่สำเร็จ", "เกิดข้อผิดพลาดในการส่งคำร้อง", false);
            });
    }
    
  });
});
