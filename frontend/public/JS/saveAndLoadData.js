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
    alert('บันทึกแบบร่างสำเร็จ!');
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

        alert('โหลดแบบร่างสำเร็จ!');
    } else {
        alert('No saved draft found for this form.');
    }
}

// Event listener for loading a draft when the form is loaded
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        loadDraft(form.id);
    });
});
