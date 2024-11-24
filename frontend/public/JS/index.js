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
    console.log("Logged-in User's Registration Number:", registrationNumber);

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
        console.log("Fetched data:", data);

        // Filter data to include only records matching the logged-in user's registration number
        const userApplications = data.filter(
            (application) =>
                application.registrationNumber === registrationNumber
        );

        console.log(
            "Filtered applications for logged-in user:",
            userApplications
        );

        displayApplications(userApplications);
    } catch (error) {
        console.error("Error fetching applications:", error);
    }
}

function displayApplications(data) {
    const approveTableBody = document.getElementById("approveTableBody");
    const pendingTableBody = document.getElementById("pendingTableBody");
    const rejectTableBody = document.getElementById("rejectTableBody");
    const draftTableBody = document.getElementById("draftTableBody");

    // Define a mapping between form types and their corresponding HTML pages
    const formTypeLinks = {
        "คำร้องจดทะเบียนล่าช้า": "/form/delayed_registration.html",
        "คำร้องลาออก": "/form/resign.html",
        "คำร้องขอจดทะเบียนรายวิชาข้ามหลักสูตร": "/form/reg_request.html",
        "คำร้องขอถอนรายวิชา (Drop W)": "/form/withdraw_course.html",
    };

    // Clear previous content
    approveTableBody.innerHTML = "";
    pendingTableBody.innerHTML = "";
    rejectTableBody.innerHTML = "";
    draftTableBody.innerHTML = "";

    data.forEach((application) => {
        let actionButton = "";
        const formattedDate = application.date
            ? new Date(application.date).toLocaleDateString()
            : "-";

        // Build rows with "View Details" button
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${application.id}</td>
            <td>${formattedDate}</td>
            <td>${application.registrationNumber || "-"}</td>
            <td>${application.fullName || "No Name"}</td>
            <td>${application.formType || "No Type"}</td>
            <td class="status ${getStatusClass(application.formStatus)}">
                ${application.formStatus || "Unknown"}
            </td>
            <td>
                <button class="view-details-button" data-id="${application.id}" data-type="${application.formType}">
                    ดูคำร้อง
                </button>
            </td>
        `;

        // Append rows based on status
        if (application.formStatus.toLowerCase() === "approved") {
            approveTableBody.appendChild(row);
        } else if (application.formStatus.toLowerCase() === "pending") {
            pendingTableBody.appendChild(row);
        } else if (application.formStatus.toLowerCase() === "rejected") {
            rejectTableBody.appendChild(row);
        } else if (application.formStatus.toLowerCase() === "draft") {
            actionButton = `
                <button class="action-button edit" onclick="editDraft(${application.id})">Edit</button>
                <button class="action-button delete" onclick="showDeleteDraftPopup(${application.id})">Delete</button>
            `;
            row.querySelector("td:last-child").innerHTML = actionButton;
            draftTableBody.appendChild(row);
        }
    });

    // Add event listeners for "View Details" buttons
    const viewDetailsButtons = document.querySelectorAll(".view-details-button");
    viewDetailsButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const applicationId = event.target.getAttribute("data-id");
            const formType = event.target.getAttribute("data-type");
            const targetUrl = formTypeLinks[formType];

            if (targetUrl) {
                window.location.href = `${targetUrl}?id=${applicationId}`;
            } else {
                alert("หน้าสำหรับคำร้องนี้ยังไม่ได้ตั้งค่า");
            }
        });
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
        case "draft":
            return "draft";
        default:
            return "unknown";
    }
}

function setupFilterButtons() {
    const filterButtons = {
        Approve: document.getElementById("ApproveFilterButton"),
        Pending: document.getElementById("PendingFilterButton"),
        Reject: document.getElementById("RejectFilterButton"),
        Draft: document.getElementById("DraftFilterButton"),
    };

    const sections = {
        Approve: document.getElementById("Application_Approve"),
        Pending: document.getElementById("Application_Pending"),
        Reject: document.getElementById("Application_Reject"),
        Draft: document.getElementById("Application_Draft"),
    };

    let currentFilter = "All";

    const setDisplay = (filter) => {
        Object.keys(sections).forEach((status) => {
            sections[status].style.display =
                filter === "All" || filter === status ? "block" : "none";
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
            Object.values(filterButtons).forEach((btn) =>
                btn.classList.remove("button__active")
            );
            if (currentFilter !== "All") button.classList.add("button__active");
        });
    });
}

// Updated showPopup function to confirm cancellation
function showPopup(applicationId) {
    const popup = document.getElementById("cancelPopup");
    popup.style.display = "block";
    document
        .getElementById("confirmCancel")
        .setAttribute("data-application-id", applicationId);
}

function hidePopup() {
    document.getElementById("cancelPopup").style.display = "none";
}

document.getElementById("confirmCancel").addEventListener("click", () => {
    const applicationId = document
        .getElementById("confirmCancel")
        .getAttribute("data-application-id");
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
// JavaScript function to delete a draft record
async function deleteDraft(draftId) {
    // Confirm before deleting
    if (!confirm("Are you sure you want to delete this draft?")) {
        return;
    }

    try {
        // Delete draft from the server
        const response = await fetch(
            `http://localhost:8080/api/requests/${draftId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete draft");
        }

        alert("Draft deleted successfully");

        // Remove the deleted draft from the table
        document
            .querySelector(`#draftTableBody tr[data-id="${draftId}"]`)
            .remove();

        // Optionally refresh application list
        fetchApplications(); // Refresh applications after deletion
    } catch (error) {
        console.error("Error deleting draft:", error);
    }
}
// Show delete draft confirmation popup
function showDeleteDraftPopup(draftId) {
    const popup = document.getElementById("deleteDraftPopup");
    popup.style.display = "block";
    document
        .getElementById("confirmDeleteDraft")
        .setAttribute("data-draft-id", draftId);
}

// Hide delete draft popup
function hideDeleteDraftPopup() {
    document.getElementById("deleteDraftPopup").style.display = "none";
}

// Confirm delete draft
document.getElementById("confirmDeleteDraft").addEventListener("click", () => {
    const draftId = document
        .getElementById("confirmDeleteDraft")
        .getAttribute("data-draft-id");
    deleteDraft(draftId);
});

document
    .getElementById("closeDeleteDraftPopup")
    .addEventListener("click", hideDeleteDraftPopup);

// Close delete draft popup when clicking outside
window.onclick = (event) => {
    const deleteDraftPopup = document.getElementById("deleteDraftPopup");
    if (event.target === deleteDraftPopup) {
        hideDeleteDraftPopup();
    }
};

// JavaScript function to delete a draft record
async function deleteDraft(draftId) {
    try {
        const response = await fetch(
            `http://localhost:8080/api/requests/${draftId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete draft");
        }

        alert("Draft deleted successfully");

        // Hide the delete draft popup
        hideDeleteDraftPopup();

        // Refresh applications list after deletion
        fetchApplications();
    } catch (error) {
        console.error("Error deleting draft:", error);
    }
}
