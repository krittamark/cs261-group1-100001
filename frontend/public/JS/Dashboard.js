document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        window.location.href = "/login.html";
        return;
    }

    // Fetch and display all applications
    fetchApplications();
});

function logout() {
    sessionStorage.clear();
    window.location.href = "/login.html";
}

async function fetchApplications() {
    try {
        // Fetch data from the API
        const response = await fetch("http://localhost:8080/api/requests", {
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
    const rejectedTableBody = document.getElementById("rejectedTableBody");
    const approvedTableBody = document.getElementById("approvedTableBody");
    const pendingTableBody = document.getElementById("pendingTableBody");

    // Clear containers if they exist
    if (rejectedTableBody) rejectedTableBody.innerHTML = "";
    if (approvedTableBody) approvedTableBody.innerHTML = "";
    if (pendingTableBody) pendingTableBody.innerHTML = "";

    // Map form types to URLs
    const formTypeToUrl = {
        "คำร้องจดทะเบียนล่าช้า": "/Employee_Form/delayed_registration.html",
        "คำร้องขอถอนรายวิชา (Drop W)": "/Employee_Form/withdraw_course.html",
        "คำร้องขอจดทะเบียนรายวิชาข้ามหลักสูตร": "/Employee_Form/reg_request.html",
        "คำร้องลาออก": "/Employee_Form/resign.html",
    };

    // Process applications
    data.forEach((application) => {
        const formattedDate = application.date
            ? new Date(application.date).toLocaleDateString()
            : "-";

        const statusClass = getStatusClass(application.formStatus); // Get status class

        // Approved applications
        if (application.formStatus && application.formStatus.toLowerCase() === "approved") {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${application.formType || "ไม่มีข้อมูล"}</td>
                <td>${application.approver || "ไม่ระบุ"}</td>
                <td class="status ${statusClass}">${application.formStatus || "ไม่มีสถานะ"}</td>
            `;
            if (approvedTableBody) approvedTableBody.appendChild(row);
        }

        // Rejected applications
        if (application.formStatus && application.formStatus.toLowerCase() === "rejected") {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${application.formType || "ไม่มีข้อมูล"}</td>
                <td>${application.rejector || "ไม่ระบุ"}</td>
                <td class="status ${statusClass}">${application.formStatus || "ไม่มีสถานะ"}</td>
            `;
            if (rejectedTableBody) rejectedTableBody.appendChild(row);
        }

        // Pending applications
        if (application.formStatus && application.formStatus.toLowerCase() === "pending") {
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
            if (pendingTableBody) pendingTableBody.appendChild(row);
        }
    });

    // Add event listeners to "ดูคำร้อง" buttons for pending applications
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
        case "pending":
            return "pending"; // Yellow
        default:
            return "unknown"; // Default styling
    }
}
