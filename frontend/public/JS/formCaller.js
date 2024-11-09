// Fetch form type from API and dynamically load the form
function getFormType(applicationId) {
    fetch(`http://api.cs261.krittamark.com/api/applications/${applicationId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const formType = data.type; // Extract the 'type' field from the API response
            loadForm(formType);         // Call the loader function to display the form // Check if the form type is resignation
            autofillForm(data); // Call the autofill function for resignation
        })
        .catch(error => {
            console.error('Error fetching form type:', error);
        });
}

// Autofill the form with the data fetched from the API
function autofillForm(data) {
    const details = data.details; // Extract details from the response

    // Fill in the date field
    const dateField = document.getElementById('date');
    if (dateField && details.date) {
        dateField.value = details.date; // Assuming the date format is compatible with the input type 'date'
    }

    // Fill in the full name field
    const fullNameField = document.getElementById('full-name');
    if (fullNameField && details.fullName) {
        fullNameField.value = details.fullName;
    }

    // Fill in the registration number field
    const registrationNumberField = document.getElementById('registration-number');
    if (registrationNumberField && details.registrationNumber) {
        registrationNumberField.value = details.registrationNumber;
    }

    // Fill in the year field
    const yearField = document.getElementById('year');
    if (yearField && details.year) {
        yearField.value = details.year;
    }

    // Fill in the faculty field
    const facultyField = document.getElementById('faculty');
    if (facultyField && details.faculty) {
        facultyField.value = details.faculty;
    }

    // Fill in the department field
    const departmentField = document.getElementById('department');
    if (departmentField && details.department) {
        departmentField.value = details.department;
    }

    // Fill in the mobile phone field
    const mobilePhoneField = document.getElementById('mobile-phone');
    if (mobilePhoneField && details.mobilePhone) {
        mobilePhoneField.value = details.mobilePhone;
    }

    // Fill in the email field
    const emailField = document.getElementById('email');
    if (emailField && details.email) {
        emailField.value = details.email;
    }

    // Fill in the contact address field
    const contactAddressField = document.getElementById('contact-address');
    if (contactAddressField && details.contactAddress) {
        contactAddressField.value = details.contactAddress;
    }

    // Fill in the academic year field
    const academicYearField = document.getElementById('academic-year');
    if (academicYearField && details.academicYear) {
        academicYearField.value = details.academicYear;
    }

    // Fill in the semester field
    const semesterField = document.getElementById('semester');
    if (semesterField && details.semester) {
        semesterField.value = details.semester;
    }

    // Fill in the debt field (if any)
    const debtField = document.getElementById('debt');
    if (debtField && details.debt) {
        debtField.value = details.debt;
    }

    // Set the radio button for grade request
    const wantGradeRadio = document.getElementById('want-grade');
    const dontWantGradeRadio = document.getElementById('dont-want-grade');
    if (wantGradeRadio && dontWantGradeRadio) {
        if (details.gradeRequest === "want") {
            wantGradeRadio.checked = true;
        } else if (details.gradeRequest === "dont-want") {
            dontWantGradeRadio.checked = true;
        }
    }
}
loadForm('resign');