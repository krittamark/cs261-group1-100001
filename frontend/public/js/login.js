function submitLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Authenticate the user
  fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Application-key':
        'TU01b3acdc84ce14bfebd27d683c9d537d14e26e0e51a17955e55a9c0d192ba07921e49e4b99956ecd60216f332c63a838',
    },
    body: JSON.stringify({ UserName: username, PassWord: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Login Response Data:', data);

      if (data.status === true) {
        sessionStorage.setItem('isLoggedIn', 'true');

        // Fetch detailed student data
        const studentId = username;
        fetch(
          `https://restapi.tu.ac.th/api/v2/profile/std/info/?id=${studentId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Application-Key':
                'TU01b3acdc84ce14bfebd27d683c9d537d14e26e0e51a17955e55a9c0d192ba07921e49e4b99956ecd60216f332c63a838',
            },
          }
        )
          .then((response) => response.json())
          .then((detailData) => {
            console.log('Detailed Student Data:', detailData);

            if (detailData.status === true && detailData.data) {
              const studentData = detailData.data;

              // Map English prefixes to Thai titles
              const prefixMapping = {
                Mr: 'นาย',
                Ms: 'นางสาว',
                Mrs: 'นาง',
              };
              const thaiPrefix =
                prefixMapping[studentData.prefixname] ||
                studentData.prefixname ||
                '';

              // Prepare user data for autofill in forms
              const autofillData = {
                fullName: `${thaiPrefix} ${studentData.displayname_th || ''}`,
                registrationNumber: studentData.userName,
                faculty: studentData.faculty,
                department: studentData.department,
                email: studentData.email,
              };

              // Store user details in sessionStorage for autofill
              sessionStorage.setItem(
                'studentData',
                JSON.stringify(autofillData)
              );
              console.log('Autofill data stored:', autofillData);
            } else {
              console.error(
                'Failed to fetch detailed student data:',
                detailData.message || 'Unknown error'
              );
            }
          })
          .catch((error) =>
            console.error('Error fetching student data:', error)
          );
      } else {
        showPopup('Login failed: ' + data.message);
      }
    })
    .catch((error) => console.error('Error during login:', error));
}
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const passwordIcon = document.getElementById('password-icon');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordIcon.src = 'img/hidden.png'; // รูป icon สำหรับซ่อน
  } else {
    passwordInput.type = 'password';
    passwordIcon.src = 'img/view.png'; // รูป icon สำหรับแสดง
  }
}

function showPopup(statusMessage) {
  // show popup status
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('popup').style.display = 'block';
  document.getElementById('popup-message').textContent = statusMessage;
}

function closePopup() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('popup').style.display = 'none';
}
