// Function to save (or update) form data to the database
async function saveForm(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target.closest('form');
    const formData = new FormData(form);
    const applicationId = form.dataset.applicationId; // Assumes form element has a data attribute for applicationId

    // Convert form data to JSON
    const dataToSave = {};
    formData.forEach((value, key) => {
        dataToSave[key] = value;
    });

    try {
        const response = await fetch(`http://api.cs261.krittamark.com/api/applications/${applicationId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSave),
        });

        if (!response.ok) {
            throw new Error(`Failed to update application: ${response.statusText}`);
        }

        // Show a success message
        showDraftedMessage('บันทึกข้อมูลเรียบร้อยแล้ว!');
    } catch (error) {
        console.error('Error updating application:', error);
        showBringPopup('เกิดข้อผิดพลาดในการบันทึกข้อมูล', true);
    }
}

// Function to load form data from the database
async function loadFormData(applicationId) {
    try {
        const response = await fetch(`http://api.cs261.krittamark.com/api/applications/${applicationId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch application: ${response.statusText}`);
        }

        const data = await response.json();
        autofillForm(data); // Fill the form with the fetched data

        showBringPopup('โหลดข้อมูลสำเร็จ!');
    } catch (error) {
        console.error('Error loading application data:', error);
        showBringPopup('ERROR: ไม่พบข้อมูลในฐานข้อมูล', true);
    }
}

// Function to autofill form fields with data from the database
function autofillForm(data) {
    const details = data.details;
    const form = document.getElementById(data.type); // Use form ID based on data type (e.g., delay_registration)

    if (!form) return;

    Object.keys(details).forEach((key) => {
        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = details[key];
        }
    });
}

// Event listener to load data when the form loads
document.addEventListener('DOMContentLoaded', () => {
    const applicationId = new URLSearchParams(window.location.search).get('id'); // Get the application ID from URL
    if (applicationId) {
        loadFormData(applicationId); // Load form data from the database
    }

    // Attach the saveForm function to form submit events
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        form.addEventListener('submit', saveForm);
        form.dataset.applicationId = applicationId; // Store the application ID in the form element
    });
});

// Function to display a popup message (success message)
function showDraftedMessage(message) {
    const popup = document.createElement('div');
    popup.className = 'popup-message';

    const checkmark = document.createElement('div');
    checkmark.innerHTML = '&#10003;';
    checkmark.style.fontSize = '60px';
    checkmark.style.marginBottom = '20px';

    const text = document.createElement('div');
    text.textContent = message;
    text.style.fontSize = '24px';

    popup.appendChild(checkmark);
    popup.appendChild(text);

    document.body.appendChild(popup);

    setTimeout(() => popup.style.opacity = '1', 50);
    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

// Function to display a popup message (error or info)
function showBringPopup(message, isError = false) {
    const popup = document.createElement('div');
    popup.className = 'popup-bottom-right';
    popup.textContent = message;

    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBarContainer.appendChild(progressBar);

    popup.appendChild(progressBarContainer);

    if (isError) {
        popup.classList.add('error');
    }

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = '1';
    }, 50);

    const displayDuration = 5000;
    setTimeout(() => {
        progressBar.style.transition = `width ${displayDuration}ms linear`;
        progressBar.style.width = '0';
    }, 50);

    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 500);
    }, displayDuration);
}
