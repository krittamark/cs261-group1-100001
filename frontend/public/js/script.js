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
        showSuccessPopup('การยื่นคำร้องสำเร็จ', 'คำร้องของคุณกำลังรอการอนุมัติ');
      } else {
        alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      }
    });
  });
});

// Function to display a success popup
function showSuccessPopup(title, message) {
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
  popup.style.width = '690px'; // Set width to 690px
  popup.style.height = 'auto'; // Let the height adjust according to content
  popup.style.display = 'flex';
  popup.style.flexDirection = 'column'; // Stack elements vertically
  popup.style.alignItems = 'center'; // Center items horizontally
  popup.style.justifyContent = 'center'; // Center items vertically

  // Add green circle with white checkmark inside
  popup.innerHTML = `
    <div style="
      width: 80px;
      height: 80px;
      background-color: #3BAD3E;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    ">
      <span style="font-size: 40px; color: white; font-weight: bold;">&#10004;</span> <!-- Use the checkmark symbol (✔) instead of an emoji -->
    </div>
    <h2 style="font-size: 35px; color: #333; margin: 0 0 10px;">${title}</h2>
    <p style="font-size: 20px; color: #666; margin: 0 0 20px;">${message}</p>
    <button onclick="goToHomePage()" style="
      padding: 10px 20px;
      font-size: 16px;
      color: white;
      background-color: #d9534f;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      display: block;
      margin: 0 auto;
    ">กลับสู่หน้าหลัก</button>
  `;

  // Append popup to overlay
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

// Function to close the popup and redirect to index.html
function goToHomePage() {
  window.location.href = 'index.html'; // Redirect to index.html
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
