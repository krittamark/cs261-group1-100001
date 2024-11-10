document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        window.location.href = "/login.html";
        return;
    }

    // Fetch and display applications based on their status
    fetchApplications();

    setupFilterButtons();
});

function logout() {
    sessionStorage.clear();
    window.location.href = "/login.html";
}

async function fetchApplications() {
    const registrationNumber = sessionStorage.getItem("registrationNumber"); // Retrieve the logged-in user ID
    console.log("Logged-in User's Registration Number:", registrationNumber); // Log user's registration number

    try {
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
        console.log("Fetched data:", data); // Log fetched data

        // Filter data to include only records matching the logged-in user's registration number
        const userApplications = data.filter(
            (application) => application.registrationNumber === registrationNumber
        );

        console.log("Filtered applications for logged-in user:", userApplications); // Log only the user's applications

        displayApplications(userApplications);

    } catch (error) {
        console.error("Error fetching applications:", error);
    }
}

function displayApplications(data) {
    const approveTableBody = document.getElementById("approveTableBody");
    const pendingTableBody = document.getElementById("pendingTableBody");
    const rejectTableBody = document.getElementById("rejectTableBody");

    // Clear previous content
    approveTableBody.innerHTML = "";
    pendingTableBody.innerHTML = "";
    rejectTableBody.innerHTML = "";

    data.forEach((application) => {
        // Skip applications with "Draft" status
        if (application.formStatus.toLowerCase() === "draft") return;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${application.id}</td>
            <td>${application.registrationNumber || "-"}</td>
            <td>${application.fullName || "No Name"}</td>
            <td>${application.formType || "No Type"}</td>
            <td class="status ${getStatusClass(application.formStatus)}">${application.formStatus || "Unknown"}</td>
            <td><button class="action-button admit" data-application-id="${application.id}">Cancel / ยกเลิกคำร้อง</button></td>
        `;

        // Append the row to the correct table body based on formStatus
        if (application.formStatus.toLowerCase() === "approved") {
            approveTableBody.appendChild(row);
        } else if (application.formStatus.toLowerCase() === "pending") {
            pendingTableBody.appendChild(row);
        } else if (application.formStatus.toLowerCase() === "rejected") {
            rejectTableBody.appendChild(row);
        }

        // Attach cancel event handler to the button
        const cancelButton = row.querySelector(".action-button");
        if (cancelButton) {
            cancelButton.addEventListener("click", (event) => {
                event.preventDefault();
                const applicationId = event.target.getAttribute("data-application-id");
                showPopup(applicationId);
            });
        }
    });
}

function getStatusClass(status) {
    switch (status?.toLowerCase()) {
        case "approved":
            return "approved";
        case "pending":
            return "pending";
        case "rejected":
            return "rejected";
        default:
            return "unknown";
    }
}

function setupFilterButtons() {
    const filterButtons = {
        Approve: document.getElementById("ApproveFilterButton"),
        Pending: document.getElementById("PendingFilterButton"),
        Reject: document.getElementById("RejectFilterButton"),
    };

    const sections = {
        Approve: document.getElementById("Application_Approve"),
        Pending: document.getElementById("Application_Pending"),
        Reject: document.getElementById("Application_Reject"),
    };

    let currentFilter = "All";

    const setDisplay = (filter) => {
        Object.keys(sections).forEach((status) => {
            sections[status].style.display = filter === "All" || filter === status ? "block" : "none";
        });
    };

    Object.entries(filterButtons).forEach(([status, button]) => {
        button.addEventListener("click", () => {
            if (currentFilter === status) {
                setDisplay("All");
                currentFilter = "All";
            } else {
                setDisplay(status);
                currentFilter = status;
            }
            // Update button active state
            Object.values(filterButtons).forEach((btn) => btn.classList.remove("button__active"));
            if (currentFilter !== "All") button.classList.add("button__active");
        });
    });
}

function showPopup(applicationId) {
    const popup = document.getElementById("cancelPopup");
    popup.style.display = "block";
    document.getElementById("confirmCancel").setAttribute("data-application-id", applicationId);
}

function hidePopup() {
    document.getElementById("cancelPopup").style.display = "none";
}

document.getElementById("confirmCancel").addEventListener("click", () => {
    const applicationId = document.getElementById("confirmCancel").getAttribute("data-application-id");
    deleteApplication(applicationId);
});

document.getElementById("closePopup").addEventListener("click", hidePopup);

async function deleteApplication(applicationId) {
    try {
        await fetch(`http://localhost:8080/api/requests/${applicationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        alert("Application deleted successfully");
        hidePopup();
        fetchApplications(); // Refresh applications list after deletion
    } catch (error) {
        console.error("Error deleting application:", error);
    }
}

// Close popup when clicking outside
window.onclick = (event) => {
    const popup = document.getElementById("cancelPopup");
    if (event.target === popup) {
        hidePopup();
    }
};
