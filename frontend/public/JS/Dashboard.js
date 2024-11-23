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
    // Get the table bodies for rejected, approved, and pending requests
    const rejectTableBody = document.getElementById("rejectTableBody");
    const approveTableBody = document.getElementById("approveTableBody");
    const pendingTableBody = document.getElementById("pendingTableBody");

    // Clear previous content
    if (rejectTableBody) rejectTableBody.innerHTML = "";
    if (approveTableBody) approveTableBody.innerHTML = "";
    if (pendingTableBody) pendingTableBody.innerHTML = "";

    // Filter and display rejected applications
    data.forEach((application) => {
        if (application.formStatus.toLowerCase() === "rejected") {
            const formattedDate = application.date
                ? new Date(application.date).toLocaleDateString()
                : "-";

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${application.id}</td>
                <td>${formattedDate}</td>
                <td>${application.registrationNumber || "-"}</td>
                <td>${application.fullName || "No Name"}</td>
                <td>${application.formType || "No Type"}</td>
                <td class="status rejected">${application.formStatus || "Unknown"}</td>
            `;

            if (rejectTableBody) rejectTableBody.appendChild(row);
        }
    });

    // Filter and display approved applications
    data.forEach((application) => {
        if (application.formStatus.toLowerCase() === "approved") {
            const formattedDate = application.date
                ? new Date(application.date).toLocaleDateString()
                : "-";

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${application.id}</td>
                <td>${formattedDate}</td>
                <td>${application.registrationNumber || "-"}</td>
                <td>${application.fullName || "No Name"}</td>
                <td>${application.formType || "No Type"}</td>
                <td class="status approved">${application.formStatus || "Unknown"}</td>
            `;

            if (approveTableBody) approveTableBody.appendChild(row);
        }
    });

    // Filter and display pending applications
    data.forEach((application) => {
        if (application.formStatus.toLowerCase() === "pending") {
            const formattedDate = application.date
                ? new Date(application.date).toLocaleDateString()
                : "-";

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${application.id}</td>
                <td>${formattedDate}</td>
                <td>${application.registrationNumber || "-"}</td>
                <td>${application.fullName || "No Name"}</td>
                <td>${application.formType || "No Type"}</td>
                <td class="status pending">${application.formStatus || "Unknown"}</td>
            `;

            if (pendingTableBody) pendingTableBody.appendChild(row);
        }
    });
}



function getStatusClass(status) {
    switch (status?.toLowerCase()) {
        case "approved":
            return "approved";
        case "rejected":
            return "rejected";
        case "pending":
            return "pending";
        case "draft":
            return "draft";
        default:
            return "unknown";
    }
}