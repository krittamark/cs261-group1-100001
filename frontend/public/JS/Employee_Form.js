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

            // Populate form fields
            populateForm(applicationData);

            // Make all fields read-only after data is populated
            makeFormReadOnly();
        } catch (error) {
            console.error("Error loading application data:", error);
            alert("ไม่สามารถโหลดข้อมูลคำร้องได้");
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

    function makeFormReadOnly() {
        // Set all input, textarea, and select fields to read-only or disabled
        document.querySelectorAll("input, textarea, select").forEach((field) => {
            field.setAttribute("readonly", true); // For input and textarea fields
            field.setAttribute("disabled", true); // For select fields and radio buttons
        });

        // Disable buttons related to editing
        document.querySelectorAll(".draft-button, .submit-button").forEach((button) => {
            button.setAttribute("disabled", true);
        });
    }
});
