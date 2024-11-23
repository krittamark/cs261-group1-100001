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
        // Academic year and semester
        document.getElementById("academic_year").value =
            data.academicYear || "";
        document.getElementById("semester").value = data.semester || "";

        // Course information
        document.getElementById("course_code").value = data.courseCode || "";
        document.getElementById("course_name").value = data.courseName || "";
        document.getElementById("course_section").value =
            data.courseSection || "";

        // Additional explanation
        document.getElementById("additional_explanation").value =
            data.additionalExplanation || "";

        // Grade request
        if (data.gradeRequest === "want") {
            document.getElementById("want_grade").checked = true;
        } else if (data.gradeRequest === "dont-want") {
            document.getElementById("dont_want_grade").checked = true;
        }
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
            document.body.removeChild(overlay);
            if (isSuccess) window.location.href = "/index.html";
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
        form.querySelector(".draft-button").addEventListener(
            "click",
            function (event) {
                event.preventDefault();
                const formStatus = "draft";

                submitForm(
                    form,
                    "แบบร่างของคุณถูกบันทึกแล้ว",
                    "แบบร่างของคุณถูกบันทึกสำเร็จ",
                    formStatus
                );
            }
        );

        form.querySelector(".submit-button").addEventListener(
            "click",
            function (event) {
                event.preventDefault();
                const formStatus = "pending";
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

        async function submitForm(form, title, message, formStatus) {
            const formData = new FormData(form);
        
            // Add form status to FormData
            formData.append("formStatus", formStatus);
        
            // Ensure all fields are added as part of "form"
            const formJson = {};
            form.querySelectorAll("input, select, textarea").forEach((input) => {
                formJson[input.name] = input.value;
            });
        
            // Append the form data as JSON
            formData.append("form", new Blob([JSON.stringify(formJson)], { type: "application/json" }));
        
            const method = applicationId ? "PUT" : "POST";
            const url = applicationId
                ? `http://localhost:8080/api/requests/${applicationId}`
                : `http://localhost:8080/api/requests`;
        
            try {
                const response = await fetch(url, {
                    method: method,
                    body: formData,
                });
        
                if (!response.ok) throw new Error("Network response was not ok");
        
                const data = await response.json();
                showPopup(title, message);
            } catch (error) {
                console.error("Error submitting form:", error);
                showPopup("การยื่นคำร้องไม่สำเร็จ", "เกิดข้อผิดพลาดในการส่งคำร้อง", false);
            }
        }
    });
});
