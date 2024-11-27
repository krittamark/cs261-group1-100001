document.addEventListener("DOMContentLoaded", async function () {
  // Redirect to login if not logged in
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "/login.html";
    return;
  }

  // Get application ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const applicationId = urlParams.get("id");

  if (applicationId) {
    // Fetch and load application data if editing an existing application
    await loadApplicationData(applicationId);
  } else {
    // Autofill form fields if student data exists in sessionStorage for new application
    const studentData = JSON.parse(
      sessionStorage.getItem("studentData") || "{}"
    );
    if (Object.keys(studentData).length > 0) {
      autofillForm(studentData);
    }
  }

  function autofillForm(data) {
    const topicElement = document.querySelector("h1.topic");
    const formType = topicElement ? topicElement.textContent : "";

    const fieldsToFill = {
      full_name: data.fullName,
      registration_number: data.registrationNumber,
      faculty: data.faculty,
      department: data.department,
      email: data.email,
      subject: formType, // Fill subject with formType for new applications
    };

    for (const [fieldId, value] of Object.entries(fieldsToFill)) {
      const input = document.getElementById(fieldId);
      if (input && value) {
        input.value = value;
      }
    }
  }

  async function loadApplicationData(applicationId) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/requests/${applicationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch application data");
      }

      const applicationData = await response.json();

      // Check form type and call the appropriate populate function
      const topicElement = document.querySelector("h1.topic").textContent;
      if (topicElement.includes("คำร้องลาออก")) {
        populateResignForm(applicationData);
      } else {
        populateForm(applicationData); // Call the other populate function for different form types
      }
    } catch (error) {
      console.error("Error loading application data:", error);
    }
  }

  function populateForm(data) {
    const fields = {
      date: data.date,
      subject: data.formType,
      full_name: data.fullName,
      registration_number: data.registrationNumber,
      year: data.year,
      faculty: data.faculty,
      department: data.department,
      mobile_phone: data.mobilePhone,
      relative_mobile_phone: data.relativeMobilePhone,
      email: data.email,
      contact_address: data.contactAddress,
      advisor: data.advisor,
      academic_year: data.academicYear,
      semester: data.semester,
      course_code: data.courseCode,
      course_name: data.courseName,
      course_section: data.courseSection,
      additional_explanation: data.additionalExplanation,
      resign_year: data.resignYear,
      debt: data.debt,
    };

    for (const [fieldId, value] of Object.entries(fields)) {
      const input = document.getElementById(fieldId);
      if (input) {
        input.value = value || ""; // Populate fields with value or leave blank
      }
    }

    // Handle radio buttons for grade request
    if (data.gradeRequest) {
      const gradeInput = document.getElementById(
        data.gradeRequest === "want" ? "want_grade" : "dont_want_grade"
      );
      if (gradeInput) gradeInput.checked = true;
    }

    console.log("Form populated with data:", data);
  }

  function populateResignForm(data) {
    // Basic information
    document.getElementById("date").value = data.date || "";
    document.getElementById("subject").value = data.formType || "";
    document.getElementById("full_name").value = data.fullName || "";
    document.getElementById("registration_number").value =
      data.registrationNumber || "";
    document.getElementById("year").value = data.year || "";
    document.getElementById("faculty").value = data.faculty || "";
    document.getElementById("department").value = data.department || "";
    document.getElementById("mobile_phone").value = data.mobilePhone || "";
    document.getElementById("relative_mobile_phone").value =
      data.relativeMobilePhone || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("contact_address").value =
      data.contactAddress || "";
    document.getElementById("advisor").value = data.advisor || "";

    // Resign year and semester
    document.getElementById("resign_year").value = data.resignYear || "";
    document.getElementById("semester").value = data.semester || "";

    // Debt information
    document.getElementById("debt").value = data.debt || "";

    // Grade request (radio buttons)
    if (data.gradeRequest === "want") {
      document.getElementById("want_grade").checked = true;
    } else if (data.gradeRequest === "dont-want") {
      document.getElementById("dont_want_grade").checked = true;
    }
  }

  // Show popup function
  function showPopup(title, message, isSuccess = true) {
    // Create overlay
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

    // Create popup
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.style.backgroundColor = "white";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.1)";
    popup.style.textAlign = "center";
    popup.style.width = "400px";

    // Popup content
    popup.innerHTML = `
            <div style="margin-bottom: 20px;">
                <span style="font-size: 40px; color: ${
                  isSuccess ? "#3BAD3E" : "#d9534f"
                };">
                    ${isSuccess ? "✔" : "✘"}
                </span>
            </div>
            <h2 style="margin-bottom: 10px;">${title}</h2>
            <p style="margin-bottom: 20px;">${message}</p>
            <button id="popup-button" style="
                padding: 10px 20px;
                font-size: 16px;
                color: white;
                background-color: ${isSuccess ? "#3BAD3E" : "#d9534f"};
                border: none;
                border-radius: 5px;
                cursor: pointer;">ตกลง</button>
        `;

    // Append popup to overlay
    overlay.appendChild(popup);

    // Add overlay to document body
    document.body.appendChild(overlay);

    // Add click event listener to close the popup
    document.getElementById("popup-button").addEventListener("click", () => {
      document.body.removeChild(overlay);
      if (isSuccess) window.location.href = "/index.html";
    });

    console.log("Popup displayed:", { title, message, isSuccess });
  }

  // Enhanced form validation logic
  function validateForm(form) {
    let isValid = true;
    form
      .querySelectorAll("input[required], select[required], textarea[required]")
      .forEach((input) => {
        if (!input.value.trim()) {
          input.style.borderColor = "red";
          isValid = false;
        } else {
          input.style.borderColor = "";
        }
      });
    return isValid;
  }

  // Form submission
  document.querySelectorAll("form.main-form").forEach((form) => {
    form
      .querySelector(".draft-button")
      .addEventListener("click", function (event) {
        event.preventDefault();
        const formStatus = "draft";

        submitForm(
          form,
          "แบบร่างของคุณถูกบันทึกแล้ว",
          "แบบร่างของคุณถูกบันทึกสำเร็จ",
          formStatus
        );
      });

    form
      .querySelector(".submit-button")
      .addEventListener("click", function (event) {
        event.preventDefault();
        const formStatus = "Waiting for Advisor";
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
      });

    async function submitForm(form, title, message, formStatus) {
      const formJson = {};

      // Collect all input, select, and textarea values from the form
      form.querySelectorAll("input, select, textarea").forEach((input) => {
        const fieldName = input.name;
        if (input.type === "radio" && input.checked) {
          formJson[fieldName] = input.value;
        } else if (input.type === "checkbox") {
          formJson[fieldName] = input.checked;
        } else if (input.type !== "radio") {
          formJson[fieldName] = input.value || "";
        }
      });

      // Add `formType` and `formStatus` explicitly to avoid conflicts
      const topicElement = document.querySelector("h1.topic");
      formJson["formType"] = topicElement
        ? topicElement.textContent.trim()
        : "";
      formJson["formStatus"] = formStatus;

      console.log("Submitting form data:", formJson);

      const method = applicationId ? "PUT" : "POST";
      const url = applicationId
        ? `http://localhost:8080/api/requests/${applicationId}`
        : `http://localhost:8080/api/requests`;

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formJson),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => attachFile(form.querySelector(".file-input"), data.id))
        .then((data) => showPopup(title, message))
        .catch((error) => {
          console.error("Error submitting form data:", error);
          showPopup(
            "การยื่นคำร้องไม่สำเร็จ",
            "เกิดข้อผิดพลาดในการส่งคำร้อง",
            false
          );
        });
    }

    function attachFile(fileInput, applicationId) {
      const fileList = form.querySelector(".file-list");

      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      fetch(`/api/requests/${applicationId}/attachments`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          fileList.innerHTML = "";
          fileInput.value = "";
        })
        .catch((error) => console.error("Error uploading files:", error));
    }
  });
});
