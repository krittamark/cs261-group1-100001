// saveAndLoadData.js

// Function to save form data to localStorage
function saveDraft(event) {
    event.preventDefault(); // Prevent default form submission
    
    const form = event.target.closest('form');
    const formData = new FormData(form);
    const formId = form.id;

    const dataToSave = {};
    formData.forEach((value, key) => {
        dataToSave[key] = value;
    });

    localStorage.setItem(`draft_${formId}`, JSON.stringify(dataToSave));
    
    // Show the popup message
    showDraftedMessage('บันทึกแบบร่างเรียบร้อยแล้ว!');
}

// Function to load form data from localStorage
function loadDraft(formId) {
    const savedData = localStorage.getItem(`draft_${formId}`);
    if (savedData) {
        const data = JSON.parse(savedData);
        const form = document.getElementById(formId);

        Object.keys(data).forEach((key) => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = data[key];
            }
        });

        showBringPopup('โหลดแบบร่างสำเร็จ!');
    } else {
        showBringPopup('ERROR: ไม่พบแบบร่างในฐานข้อมูล', true);
    }
}

// Event listener for loading a draft when the form is loaded
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        loadDraft(form.id);
    });
});

// function to display pop-up message
function showDraftedMessage(message) {
    // Create the popup container
    const popup = document.createElement('div');
    popup.className = 'popup-message';

    // Create checkmark icon
    const checkmark = document.createElement('div');
    checkmark.innerHTML = '&#10003;'; // Unicode for checkmark
    checkmark.style.fontSize = '60px'; // Larger checkmark
    checkmark.style.marginBottom = '20px';

    // Create message text
    const text = document.createElement('div');
    text.textContent = message;
    text.style.fontSize = '24px'; // Larger font size for message

    // Append elements to popup
    popup.appendChild(checkmark);
    popup.appendChild(text);

    // Append the popup to the body
    document.body.appendChild(popup);

    // Fade in and remove after 3 seconds
    setTimeout(() => popup.style.opacity = '1', 50); // Delay for fade-in effect
    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 500); // Allow fade-out transition
    }, 3000);
}

function showBringPopup(message, isError = false) {
    const popup = document.createElement('div');
    popup.className = 'popup-bottom-right';
    popup.textContent = message;

    // Create progress bar container
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';

    // Create progress bar itself
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBarContainer.appendChild(progressBar);

    popup.appendChild(progressBarContainer);

    // Apply error style if it's an error message
    if (isError) {
        popup.classList.add('error'); // Add 'error' class for custom error styling
    }

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = '1'; // Fade in
    }, 50);

    const displayDuration = 5000; // Popup will stay for 5 seconds (adjust this value as needed)

    // Animate progress bar shrinking from left to right over the displayDuration
    setTimeout(() => {
        progressBar.style.transition = `width ${displayDuration}ms linear`; // Animate width decrease
        progressBar.style.width = '0'; // Shrink the progress bar to 0 width from left to right
    }, 50);

    setTimeout(() => {
        popup.style.opacity = '0'; // Fade out
        setTimeout(() => popup.remove(), 500); // Remove from DOM after fade-out
    }, displayDuration); // The popup will stay visible for the duration of `displayDuration`
}