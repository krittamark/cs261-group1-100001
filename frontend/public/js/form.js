document.addEventListener('DOMContentLoaded', function () {
  // Autofill form fields if student data exists in sessionStorage
  const studentData = JSON.parse(sessionStorage.getItem('studentData') || '{}');
  console.log('Retrieved studentData:', studentData);
  if (Object.keys(studentData).length > 0) {
    autofillForm(studentData);
  }

  function autofillForm(data) {
    // Get the topic text
    const topicElement = document.querySelector('h1.topic');
    const topicText = topicElement ? topicElement.textContent : '';

    // Map the field IDs to the corresponding data in sessionStorage, including the topic for "subject"
    const fieldsToFill = {
      'full-name': data.fullName,
      'registration-number': data.registrationNumber,
      faculty: data.faculty,
      department: data.department,
      email: data.email,
      subject: topicText,
    };

    // Set values for each field
    for (const [fieldId, value] of Object.entries(fieldsToFill)) {
      const input = document.getElementById(fieldId);
      console.log(`Setting field "${fieldId}" to value:`, value); // Log each field and value
      if (input && value) {
        input.value = value;
      }
    }
  }

  function showSuccessPopup(title, message) {
    const overlay = document.createElement('div');
    overlay.id = 'popup-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 1000;

    const popup = document.createElement('div');
    popup.id = 'success-popup';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    popup.style.textAlign = 'center';
    popup.style.width = '690px';
    popup.style.height = 'auto';
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';
    popup.style.gap = '20px';

    // Set popup HTML content
    popup.innerHTML = `
      <div style="width: 80px; height: 80px; background-color: #3BAD3E; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
        <span style="font-size: 40px; color: white; font-weight: bold;">&#10004;</span>
      </div>
      <h2 style="font-size: 35px; color: #333; margin: 0 0 10px;">${title}</h2>
      <p style="font-size: 20px; color: #666; margin: 0 0 20px;">${message}</p>
    `;

    // Create button element with inline arrow function to redirect
    const button = document.createElement('button');
    button.innerText = 'กลับสู่หน้าหลัก';
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.color = 'white';
    button.style.backgroundColor = '#d9534f';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.display = 'block';
    button.style.margin = '0 auto';

    // Inline function to redirect
    button.onclick = () => {
      window.location.href = 'index.html';
    };

    // Append button to popup
    popup.appendChild(button);

    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  }

  // Form validation logic
  function validateForm(form) {
    let isValid = true;
    form
      .querySelectorAll('input[required], select[required], textarea[required]')
      .forEach((input) => {
        if (!input.value) {
          input.style.borderColor = 'red';
          isValid = false;
        } else {
          input.style.borderColor = '';
        }
      });
    return isValid;
  }

  // Get all forms and add event listener for submission
  document.querySelectorAll('form.main-form').forEach((form) => {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      const formData = {};

      // Identify form type based on title
      const formType = document.querySelector('h1.topic').innerText;
      formData['formType'] = formType;

      // Collect all inputs in the form
      form.querySelectorAll('input, select, textarea').forEach((input) => {
        let fieldName = input.id || input.name; // Use id or fallback to name

        if (input.type === 'radio') {
          // Check if the radio is checked
          if (input.checked) {
            formData[fieldName] = input.value;
          }
        } else if (input.type === 'checkbox') {
          // Handle checkboxes
          formData[fieldName] = input.checked;
        } else {
          formData[fieldName] = input.value;
        }
      });

      // Log the collected form data
      console.log('Collected Form Data:', formData);

      // Validate form before submission
      if (validateForm(form)) {
        // Show success popup if the form is valid
        showSuccessPopup(
          'การยื่นคำร้องสำเร็จ',
          'คำร้องของคุณกำลังรอการอนุมัติ'
        );
      } else {
        alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      }
    });
  });
});
