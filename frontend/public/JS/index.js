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

        if (Array.isArray(userApplications)) {
            displayApplications(userApplications);
        } else if (userApplications && Array.isArray(userApplications.requests)) {
            displayApplications(userApplications.requests);
        } else {
            console.error("Unexpected data format:", userApplications);
        }
    } catch (error) {
        console.error("Error fetching applications:", error);
    }
}

function displayApplications(data) {
    const sections = {
        Approve: document.querySelector("#Application_Approve .application__list"),
        Pending: document.querySelector("#Application_Pending .application__list"),
        Reject: document.querySelector("#Application_Reject .application__list"),
    };

    // Clear previous content
    Object.values(sections).forEach((section) => (section.innerHTML = ""));
    const tableBody = document.getElementById("applicationTableBody");
    tableBody.innerHTML = ""; // Clear previous table content

    data.forEach((application) => {
        // Skip applications with "Draft" status
        if (application.formStatus.toLowerCase() === "draft") return;

        // Create list item for sections
        const applicationItem = document.createElement("li");
        applicationItem.classList.add("applicationItem__wrapper");
        applicationItem.innerHTML = `
            <a href="edit#${application.id}" class="application__item">
                <div class="application__detail">
                    <div class="application__name">${application.fullName || "No Name"}</div>
                    <span class="application__date">${application.date || "No Date"}</span>
                </div>
                <div class="application__action">
                    ${application.formStatus !== "Reject" ? `<button class="button button__danger button__cancel" data-application-id="${application.id}">ลบ / ยกเลิกแบบฟอร์ม</button>` : ""}
                </div>
            </a>
        `;

        if (sections[application.formStatus]) {
            sections[application.formStatus].appendChild(applicationItem);
        }

        // Populate table with application data, excluding "Draft" status
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${application.id}</td>
            <td>${application.registrationNumber || "-"}</td>
            <td>${application.fullName || "No Name"}</td>
            <td>${application.date || "No Date"}</td>
            <td>${application.formType || "No Type"}</td>
            <td class="status ${getStatusClass(application.formStatus)}">${application.formStatus || "Unknown"}</td>
            <td><button class="action-button admit">Cancel / ยกเลิกคำร้อง </button></td>
        `;
        tableBody.appendChild(row);

        // Attach cancel event handler to the button
        const cancelButton = applicationItem.querySelector(".button__cancel");
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
        Draft: document.getElementById("DraftFilterButton"),
        Reject: document.getElementById("RejectFilterButton"),
    };

    const sections = {
        Approve: document.getElementById("Application_Approve"),
        Pending: document.getElementById("Application_Pending"),
        Draft: document.getElementById("Application_Draft"),
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


// Popup functions for canceling application
document.getElementById("confirmCancel").addEventListener("click", () => {
    const applicationId = document.getElementById("confirmCancel").getAttribute("data-application-id");
    deleteApplication(applicationId);
});

document.getElementById("closePopup").addEventListener("click", hidePopup);

function showPopup(applicationId) {
    const popup = document.getElementById("cancelPopup");
    popup.style.display = "block";
    document.getElementById("confirmCancel").setAttribute("data-application-id", applicationId);
}

function hidePopup() {
    document.getElementById("cancelPopup").style.display = "none";
}

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
