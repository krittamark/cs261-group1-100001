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
        // Fetch and load application data
        await loadApplicationData(applicationId);
    } else {
        // Autofill form fields for new applications
        const studentData = JSON.parse(
            sessionStorage.getItem("studentData") || "{}"
        );
        if (Object.keys(studentData).length > 0) {
            autofillForm(studentData);
        }
    }

    // Disable all form fields to make them read-only
    disableAllFields();

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
            if (input) {
                input.value = value || "ไม่มีข้อมูล"; // เพิ่มข้อความในกรณีไม่มีข้อมูล
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
            console.log("Fetched application data:", applicationData);

            populateForm(applicationData); // เติมข้อมูลลงในฟอร์ม
        } catch (error) {
            console.error("Error loading application data:", error);
            showPopup("Error", "ไม่สามารถโหลดข้อมูลคำร้องได้", false);
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
            advisorReason: data.advisorReason, // เติมค่า rejection_reason
            resign_year: data.resignYear,
            debt: data.debt,
        };

        for (const [fieldId, value] of Object.entries(fields)) {
            const input = document.getElementById(fieldId);
            if (input) {
                input.value = value || "ไม่มีความเห็นจากอาจารย์ที่ปรึกษา"; // เพิ่มข้อความในกรณีไม่มีข้อมูล
                console.log(`Field ${fieldId} populated with: ${value}`);
            } else {
                console.warn(`Field ${fieldId} not found in form`);
            }
        }
    }

    function disableAllFields() {
        // Disable all input, textarea, and select elements
        const fields = document.querySelectorAll(
            "input, textarea, select, button"
        );
        fields.forEach((field) => {
            field.setAttribute("readonly", true); // Make text fields readonly
            field.setAttribute("disabled", true); // Disable other elements like buttons, selects
        });

        console.log("All form fields have been disabled.");
    }
});
