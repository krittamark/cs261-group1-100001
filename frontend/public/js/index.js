document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        window.location.href = "/login.html";
        return;
    }

    // Fetch and display applications based on their status
    fetchApplications();

    // Set up status filter buttons
    setupFilterButtons();
});

// Logout the user
function logout() {
    sessionStorage.clear();
    window.location.href = "/login.html";
}

// Fetch applications for the logged-in user
async function fetchApplications() {
    const registrationNumber = sessionStorage.getItem("registrationNumber");
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

        // Filter data for the logged-in user
        const userApplications = data.filter(
            (application) => application.registrationNumber === registrationNumber
        );
        console.log("Filtered applications:", userApplications);

        // Display the filtered applications
        displayApplications(userApplications);
    } catch (error) {
        console.error("Error fetching applications:", error);
    }
}

// Display applications in their respective tables
function displayApplications(data) {
    const approveTableBody = document.getElementById("approveTableBody");
    const pendingTableBody = document.getElementById("pendingTableBody");
    const rejectTableBody = document.getElementById("rejectTableBody");
    const draftTableBody = document.getElementById("draftTableBody");

    // Map form types to their corresponding edit pages
    const formTypeLinks = {
        "คำร้องจดทะเบียนล่าช้า": "/form/delayed_registration.html",
        "คำร้องลาออก": "/form/resign.html",
        "คำร้องขอจดทะเบียนรายวิชาข้ามหลักสูตร": "/form/reg_request.html",
        "คำร้องขอถอนรายวิชา (Drop W)": "/form/withdraw_course.html",
    };

    // Clear previous content
    [approveTableBody, pendingTableBody, rejectTableBody, draftTableBody].forEach((table) => {
        table.innerHTML = "";
    });

    data.forEach((application) => {
        const formattedDate = application.date
            ? new Date(application.date).toLocaleDateString()
            : "-";
        const actionButton = getActionButton(application, formTypeLinks);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${application.id}</td>
            <td>${formattedDate}</td>
            <td>${application.registrationNumber || "-"}</td>
            <td>${application.fullName || "No Name"}</td>
            <td>${application.formType || "No Type"}</td>
            <td class="status ${getStatusClass(application.formStatus)}">${application.formStatus || "Unknown"}</td>
            <td>${actionButton}</td>
        `;

        // Append row to the respective table based on status
        const status = application.formStatus.toLowerCase();
        if (status === "approved") approveTableBody.appendChild(row);
        else if (status === "pending") pendingTableBody.appendChild(row);
        else if (status === "rejected") rejectTableBody.appendChild(row);
        else if (status === "draft") draftTableBody.appendChild(row);
    });

    // Add event listeners for dynamically created buttons
    addDynamicEventListeners();
}

// Generate action buttons based on application status
function getActionButton(application, formTypeLinks) {
    if (application.formStatus.toLowerCase() === "pending") {
        return `<button class="action-button cancel" data-application-id="${application.id}">Cancel / ยกเลิกคำร้อง</button>`;
    } else if (application.formStatus.toLowerCase() === "draft") {
        const editLink = formTypeLinks[application.formType] || "/HTML/default_edit.html";
        return `
            <a href="${editLink}?id=${application.id}" class="action-button edit">Edit / แก้ไข</a>
            <button class="action-button delete" onclick="showDeleteDraftPopup(${application.id})">Delete / ลบ</button>
        `;
    }
    return "";
}

// Get status class for styling
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

// Set up filter buttons to toggle visibility
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
            sections[status].style.display = filter === "All" || filter === status ? "block" : "none";
        });
    };

    Object.entries(filterButtons).forEach(([status, button]) => {
        button.addEventListener("click", () => {
            currentFilter = currentFilter === status ? "All" : status;
            setDisplay(currentFilter);
            Object.values(filterButtons).forEach((btn) => btn.classList.remove("button__active"));
            if (currentFilter !== "All") button.classList.add("button__active");
        });
    });
}

// Popup functions for cancel and delete operations
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
            headers: { "Content-Type": "application/json" },
        });
        alert("Application deleted successfully");
        hidePopup();
        fetchApplications();
    } catch (error) {
        console.error("Error deleting application:", error);
    }
}

// Delete draft functions
function showDeleteDraftPopup(draftId) {
    const popup = document.getElementById("deleteDraftPopup");
    popup.style.display = "block";
    document.getElementById("confirmDeleteDraft").setAttribute("data-draft-id", draftId);
}

function hideDeleteDraftPopup() {
    document.getElementById("deleteDraftPopup").style.display = "none";
}

async function deleteDraft(draftId) {
    try {
        await fetch(`http://localhost:8080/api/requests/${draftId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        alert("Draft deleted successfully");
        hideDeleteDraftPopup();
        fetchApplications();
    } catch (error) {
        console.error("Error deleting draft:", error);
    }
}

// Close popups when clicking outside
window.onclick = (event) => {
    const cancelPopup = document.getElementById("cancelPopup");
    const deleteDraftPopup = document.getElementById("deleteDraftPopup");
    if (event.target === cancelPopup) hidePopup();
    if (event.target === deleteDraftPopup) hideDeleteDraftPopup();
};

// Add event listeners to dynamically created buttons
function addDynamicEventListeners() {
    document.querySelectorAll(".cancel").forEach((button) =>
        button.addEventListener("click", () => showPopup(button.dataset.applicationId))
    );
}
