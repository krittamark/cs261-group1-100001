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
    try {
      const response = await fetch(`http://localhost:8080/api/applications/me/${localStorage.username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      displayApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  }
  
  function displayApplications(data) {
    const sections = {
      Approve: document.querySelector("#Application_Approve .application__list"),
      Pending: document.querySelector("#Application_Pending .application__list"),
      Draft: document.querySelector("#Application_Draft .application__list"),
      Reject: document.querySelector("#Application_Reject .application__list"),
    };
  
    // Clear previous content
    Object.values(sections).forEach((section) => (section.innerHTML = ""));
  
    // Populate sections with fetched applications
    data.forEach((application) => {
      const applicationItem = document.createElement("li");
      applicationItem.classList.add("applicationItem__wrapper");
      applicationItem.innerHTML = `
        <a href="edit#${application.id}" class="application__item">
          <div class="application__detail">
            <div class="application__name">${application.name}</div>
            <span class="application__date">${application.date}</span>
          </div>
          <div class="application__action">
            ${application.status !== "Reject" ? `<button class="button button__danger button__cancel" data-application-id="${application.id}">ลบ / ยกเลิกแบบฟอร์ม</button>` : ""}
          </div>
        </a>
      `;
  
      if (sections[application.status]) {
        sections[application.status].appendChild(applicationItem);
      }
  
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
  
  // Popup functions
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
      await fetch(`http://localhost:8080/api/applications/${applicationId}`, {
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
  fetch("http://localhost:8080/api/requests")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch requests");
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
  