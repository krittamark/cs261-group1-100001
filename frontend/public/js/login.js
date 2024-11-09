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

            // confirm that user logedin
            sessionStorage.setItem("isLoggedIn", "true");


            // Prepare user data to send to the backend API
            const userData = {
                success: data.status,
                username: username,
                name: data.displayname_en,  
                email: data.email, 
                department : data.department, 
                faculty: data.faculty || "Null", 
                organization : data.organization || "Null", 
                type: data.type || "DefaultType"  
            };

            // Send the data to your backend API
            fetch('http://localhost:8080/login', {
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
    const passwordInput = document.getElementById("password");
    const passwordIcon = document.getElementById("password-icon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.src = "img/hidden.png"; // รูป icon สำหรับซ่อน
    } else {
        passwordInput.type = "password";
        passwordIcon.src = "img/view.png"; // รูป icon สำหรับแสดง
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