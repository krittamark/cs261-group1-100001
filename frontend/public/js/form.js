document.addEventListener('DOMContentLoaded', function () {
  // Redirect to login if not logged in
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    window.location.href = '/login.html';
    return;
  }

  // Autofill form fields if student data exists in sessionStorage
  const studentData = JSON.parse(sessionStorage.getItem('studentData') || '{}');
  if (Object.keys(studentData).length > 0) {
    autofillForm(studentData);
  }

  function autofillForm(data) {
    const topicElement = document.querySelector('h1.topic');
    const topicText = topicElement ? topicElement.textContent : '';

    const fieldsToFill = {
      full_name: data.fullName,
      registration_number: data.registrationNumber,
      faculty: data.faculty,
      department: data.department,
      email: data.email,
      subject: topicText,
    };

    for (const [fieldId, value] of Object.entries(fieldsToFill)) {
      const input = document.getElementById(fieldId);
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
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';
    popup.style.gap = '20px';

    popup.innerHTML = `
      <div style="width: 80px; height: 80px; background-color: #3BAD3E; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
        <span style="font-size: 40px; color: white; font-weight: bold;">&#10004;</span>
      </div>
      <h2 style="font-size: 35px; color: #333; margin: 0 0 10px;">${title}</h2>
      <p style="font-size: 20px; color: #666; margin: 0 0 20px;">${message}</p>
    `;

    const button = document.createElement('button');
    button.innerText = 'กลับสู่หน้าหลัก';
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.color = 'white';
    button.style.backgroundColor = '#d9534f';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.margin = '0 auto';

    button.onclick = () => {
      window.location.href = '/template/template.html';
    };

    popup.appendChild(button);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  }

  // Enhanced form validation logic
  function validateForm(form) {
    let isValid = true;
    form
      .querySelectorAll('input[required], select[required], textarea[required]')
      .forEach((input) => {
        if (!input.value.trim()) {
          // Check if field is empty or only contains whitespace
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
    let formStatus = 'pending';

    form
      .querySelector('.draft-button')
      .addEventListener('click', function (event) {
        event.preventDefault();
        formStatus = 'draft';
        if (validateForm(form)) {
          // Only proceed if form is valid
          submitForm(
            form,
            'แบบร่างของคุณถูกบันทึกแล้ว',
            'แบบร่างของคุณถูกบันทึกสำเร็จ'
          );
        } else {
          alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
        }
      });

    form
      .querySelector('.submit-button')
      .addEventListener('click', function (event) {
        event.preventDefault();
        formStatus = 'pending';
        if (validateForm(form)) {
          // Only proceed if form is valid
          submitForm(
            form,
            'การยื่นคำร้องสำเร็จ',
            'คำร้องของคุณกำลังรอการอนุมัติ'
          );
        } else {
          alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
        }
      });

    function submitForm(form, title, message) {
      const formData = {};
      const formType = document.querySelector('h1.topic').innerText;
      formData['formType'] = formType;
      formData['form_status'] = formStatus;

      form.querySelectorAll('input, select, textarea').forEach((input) => {
        let fieldName = input.id || input.name;

        if (input.type === 'radio') {
          if (input.checked) {
            formData[fieldName] = input.value;
          }
        } else if (input.type === 'checkbox') {
          formData[fieldName] = input.checked;
        } else {
          formData[fieldName] = input.value;
        }
      });

      console.log('Collected Form Data:', formData);

      // Show the popup with the specified title and message
      showSuccessPopup(title, message);
    }
  });
});
