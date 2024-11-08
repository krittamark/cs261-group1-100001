document.addEventListener('DOMContentLoaded', function () {
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

      // Validate form before submission
      if (validateForm(form)) {
        // Show success popup if the form is valid
        showSuccessPopup('การยื่นคำร้องสำเร็จ คำร้องของคุณกำลังรอการอนุมัติ');
      } else {
        alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      }
    });
  });
});

// Function to display a success popup
function showSuccessPopup(message) {
  // Create popup overlay
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

  // Create popup content
  const popup = document.createElement('div');
  popup.id = 'success-popup';
  popup.style.backgroundColor = 'white';
  popup.style.padding = '20px';
  popup.style.borderRadius = '10px';
  popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
  popup.style.textAlign = 'center';

  // Add checkmark icon and message
  popup.innerHTML = `
      <div style="font-size: 40px; color: green;">✔️</div>
      <p>${message}</p>
      <button onclick="closePopup()">กลับสู่หน้าหลัก</button>
  `;

  // Append popup to overlay
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

// Function to close the popup
function closePopup() {
  document.getElementById('popup-overlay').remove();
}

// Form validation logic
function validateForm(form) {
  let isValid = true;
  form.querySelectorAll('input[required], select[required], textarea[required]').forEach((input) => {
    if (!input.value) {
      input.style.borderColor = 'red';
      isValid = false;
    } else {
      input.style.borderColor = ''; // Reset the border color
    }
  });
  return isValid;
}
