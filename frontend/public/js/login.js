function togglePassword() {
  const passwordField = document.getElementById('password');
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
  } else {
    passwordField.type = 'password';
  }
}

function submitLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // First, authenticate the user
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
      console.log('Login Response Data:', data); // Log login response data

      if (data.status === true) {
        // Set session as logged in
        sessionStorage.setItem('isLoggedIn', 'true');

        // After successful login, fetch detailed student data
        const studentId = username; // assuming username is the student ID, adjust if needed
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
            console.log('Detailed Student Data:', detailData); // Log detailed student data

            if (detailData.status === true && detailData.data) {
              const studentData = detailData.data;

              // Map English prefixes to Thai titles
              const prefixMapping = {
                Mr: 'นาย',
                Ms: 'นางสาว',
                Mrs: 'นาง',
              };

              // Translate prefix to Thai or use the original if no match
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
              console.log('Autofill data stored:', autofillData); // Log stored data for verification

              // Display detailed user information
              document.getElementById('message').innerHTML = ` 
                    <div style="padding: 10px; background-color: rgba(255, 255, 255, 0.9); border-radius: 10px; color: #333; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                        <strong>Name:</strong> ${
                          autofillData.fullName || 'N/A'
                        } <br>
                        <strong>Faculty:</strong> ${
                          studentData.faculty || 'N/A'
                        } <br>
                        <strong>Department:</strong> ${
                          studentData.department || 'N/A'
                        } <br>
                        <strong>Status:</strong> ${
                          studentData.statusname || 'N/A'
                        } <br>
                    </div>
                  `;

              // Prepare user data to send to the backend API
              const userData = {
                username: studentData.userName,
                displayname_en: studentData.displayname_en,
                email: studentData.email,
                faculty: studentData.faculty,
                department: studentData.department,
                type: studentData.type,
              };

              console.log('User Data to be sent to backend:', userData); // Log data being sent to the backend

              // Send the data to your backend API
              fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              })
                .then((response) => response.json())
                .then((result) => {
                  console.log('Backend Response:', result); // Log backend response
                  if (result.id) {
                    console.log('Data saved successfully');
                    // Redirect to index page after login success
                    window.location.href = 'index.html';
                  } else {
                    console.error('Failed to save data:', result.message);
                  }
                })
                .catch((error) => console.error('Error saving data:', error));
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
        // Ensure `showPopup` is defined, if used
        showPopup('Login failed: ' + data.message);
      }
    })
    .catch((error) => console.error('Error during login:', error));
}
