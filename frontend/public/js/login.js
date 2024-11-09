function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch data from the TU API
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-key': 'TU01b3acdc84ce14bfebd27d683c9d537d14e26e0e51a17955e55a9c0d192ba07921e49e4b99956ecd60216f332c63a838'
        },
        body: JSON.stringify({ "UserName": username, "PassWord": password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === true) {
            // Display student details
            if (data.type === "student") {
            document.getElementById('message').innerHTML = ` 
            <div style="padding: 10px; background-color: rgba(255, 255, 255, 0.9); border-radius: 10px; color: #333; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <strong>Name:</strong> ${data.displayname_th} <br>
                <strong>EngName:</strong> ${data.displayname_en} <br>
                <strong>Email:</strong> ${data.email} <br>
                <strong>department:</strong> ${data.department} <br>
                <strong>Faculty:</strong> ${data.faculty}
            </div>
            `;
            }

            // Display employee details
            else if (data.type === "employee") {
                document.getElementById('message').innerHTML = ` 
                <div style="padding: 10px; background-color: rgba(255, 255, 255, 0.9); border-radius: 10px; color: #333; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <strong>Name:</strong> ${data.displayname_th} <br>
                    <strong>EngName:</strong> ${data.displayname_en} <br>
                    <strong>Email:</strong> ${data.email} <br>
                    <strong>department:</strong> ${data.department} <br>
                    <strong>organization:</strong> ${data.organization}
                </div>
                `;
                }

            // confirm that user login
            sessionStorage.setItem("isLoggedIn", "true");


            // Prepare user data to send to the backend API
            const userData = {
                username: username,
                displayname_th: data.displayname_th,
                displayname_en: data.displayname_en,  
                email: data.email, 
                department : data.department, 
                faculty: data.faculty || "Null", 
                organization : data.organization || "Null", 
                type: data.type || "DefaultType"  
            };

            // Send the data to your backend API
            fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(result => {
                if (result.id) {
                    console.log('Data saved successfully');
                    // Redirect to index page after login success
                    window.location.href = "index.html";
                } else {
                    console.error('Failed to save data:', result.message);
                }
            })
            .catch(error => console.error('Error saving data:', error));
        } else {

            showPopup(data.status);

        }
    })
    .catch(error => console.error('Error during login:', error));
}

function togglePassword() {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
}

function showPopup(statusMessage) {
    // แสดงข้อความ status ในป๊อปอัพ
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
    document.getElementById('popup-message').textContent = statusMessage; // อัปเดตข้อความ status
}

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}