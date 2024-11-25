document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        window.location.href = "/login.html";
        return;
    }

    // Fetch and display applications
    fetchApplications();
});

function logout() {
    sessionStorage.clear();
    window.location.href = "/login.html";
}

async function fetchApplications() {
    try {
        // Fetch data from the API with a filter for "Waiting for Instructor"
        const response = await fetch("http://localhost:8080/api/requests?formStatus=Waiting for Instructor", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch requests");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        // Display applications
        displayApplications(data);
    } catch (error) {
        console.error("Error fetching applications:", error);
    }
}

function displayApplications(data) {
    const waitingForInstructorTableBody = document.getElementById("waitingForInstructorTableBody");

    // Clear the container if it exists
    if (waitingForInstructorTableBody) waitingForInstructorTableBody.innerHTML = "";

    // Map form types to URLs
    const formTypeToUrl = {
        "คำร้องจดทะเบียนล่าช้า": "delayed_registration.html",
        "คำร้องขอถอนรายวิชา (Drop W)": "withdraw_course.html",
        "คำร้องขอจดทะเบียนรายวิชาข้ามหลักสูตร": "reg_request.html",
        "คำร้องลาออก": "resign.html",
    };

    // Process applications
    data.forEach((application) => {
        if (application.formStatus === "Waiting for Instructor") { // Ensure we only process this status
            const formattedDate = application.date
                ? new Date(application.date).toLocaleDateString()
                : "-";

            // Create a new table row for each application
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${application.formType || "ไม่มีข้อมูล"}</td>
                <td>${application.fullName || "ไม่ระบุ"}</td>
                <td>
                    <button class="view-details-button" data-id="${application.id}" data-type="${application.formType}">
                        View / ดูคำร้อง
                    </button>
                </td>
            `;
            waitingForInstructorTableBody.appendChild(row);
        }
    });

    // Add event listeners to "View / ดูคำร้อง" buttons
    const viewDetailsButtons = document.querySelectorAll(".view-details-button");
    viewDetailsButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const applicationId = event.target.getAttribute("data-id");
            const formType = event.target.getAttribute("data-type");
            const targetUrl = formTypeToUrl[formType];

            if (targetUrl) {
                // Redirect to the form page with the application ID in the URL
                window.location.href = `${targetUrl}?id=${applicationId}`;
            } else {
                alert("หน้าสำหรับคำร้องนี้ยังไม่ได้ตั้งค่า");
            }
        });
    });
}

// Helper function to get the CSS class for status
function getStatusClass(status) {
    switch (status?.toLowerCase()) {
        case "approved":
            return "approved"; // Green
        case "rejected":
            return "rejected"; // Red
        case "waiting for instructor":
            return "pending"; // Yellow
        default:
            return "unknown"; // Default styling
    }
}
