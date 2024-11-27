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
    }

    // Disable all form fields to make them read-only
    disableAllFields();

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

            populateForm(applicationData);
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
            advisorReason: data.advisorReason,
            instructorReason: data.instructorReason,
            deanReason: data.deanReason,
            rejectionReason: data.rejectionReason,
        };

        for (const [fieldId, value] of Object.entries(fields)) {
            const input = document.getElementById(fieldId);
            const container = input?.closest(".form-group"); // Get the container of the field

            if (value) {
                if (input) input.value = value;
                if (container) container.classList.remove("hidden");
            } else {
                if (container) container.classList.add("hidden");
            }
        }
    }

    function disableAllFields() {
        const fields = document.querySelectorAll("input, textarea, select, button");
        fields.forEach((field) => {
            field.setAttribute("readonly", true); // Make text fields readonly
            field.setAttribute("disabled", true); // Disable other elements like buttons, selects
        });

        console.log("All form fields have been disabled.");
    }
});
