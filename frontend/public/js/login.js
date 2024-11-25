document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const userType = sessionStorage.getItem("userType");

    console.log("isLoggedIn:", isLoggedIn);
    console.log("userType:", userType);

    if (!window.location.pathname.endsWith("/login.html")) {
        if (isLoggedIn) {
            if (userType === "student") {
                window.location.href = "/index.html";
            } else if (userType === "employee") {
                window.location.href = "/request_list.html";
            }
        } else {
            console.warn("User not logged in. Redirecting to login...");
            window.location.href = "/login.html";
        }
    }

    // Attach event listeners for login page
    document
        .getElementById("toggle-password")
        ?.addEventListener("click", togglePassword);
    document
        .getElementById("login-button")
        ?.addEventListener("click", submitLogin);
    document.getElementById("popup-ok")?.addEventListener("click", closePopup);

    // Prevent back navigation from reloading login if logged in
    window.addEventListener("popstate", function () {
        if (sessionStorage.getItem("isLoggedIn")) {
            if (userType === "student") {
                window.location.href = "/index.html";
            } else if (userType === "employee") {
                window.location.href = "/request_list.html";
            }
        }
    });
});

function submitLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    //* Mock login credentials *//
    const mockEmployeeCredentials = {
        username: "mock_employee",
        password: "password123",
        type: "employee",
        displayname_th: "Mock Employee",
        email: "mock@company.com",
        department: "Mock Department",
        organization: "Mock Organization",
        StatusEmp: "Active",
    };

    // Check for mock login
    if (
        username === mockEmployeeCredentials.username &&
        password === mockEmployeeCredentials.password
    ) {
        console.log("Mock login successful");
        handleLoginSuccess(mockEmployeeCredentials.type, mockEmployeeCredentials);
    } else {
        // Proceed with actual API call
        fetch("https://restapi.tu.ac.th/api/v1/auth/Ad/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Application-key":
                    "TU8006a67d385d98ce2923e80f7cbf742706efbcf969c021c89a58a703c80fd3a2c80f3235cfed29b9f10060a315e80192",
            },
            body: JSON.stringify({ UserName: username, PassWord: password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login Response Data:", data);

                if (data.status === true) {
                    handleLoginSuccess(data.type.toLowerCase(), data);
                } else {
                    showPopup("Login failed: " + data.message);
                }
            })
            .catch((error) => {
                console.error("Error during login:", error);
                showPopup("An error occurred during login. Please try again.");
            });
    }
}

function handleLoginSuccess(userType, data) {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userType", userType);
    sessionStorage.setItem("username", data.username);

    // Map and store user details for autofill
    let autofillData = {};
    if (userType === "student") {
        autofillData = {
            fullName: data.displayname_th,
            registrationNumber: data.username,
            email: data.email,
            department: data.department,
            faculty: data.faculty,
            status: data.tu_status,
        };
    } else if (userType === "employee") {
        autofillData = {
            fullName: data.displayname_th,
            username: data.username,
            email: data.email,
            department: data.department,
            organization: data.organization,
            status: data.StatusEmp,
        };
    }
    sessionStorage.setItem("userData", JSON.stringify(autofillData));
    console.log("Autofill data stored:", autofillData);

    // Redirect based on user type
    if (userType === "student") {
        window.location.href = "/index.html";
    } else if (userType === "employee") {
        window.location.href = "/request_list.html";
    }
}

function togglePassword() {
    const passwordInput = document.getElementById("password");
    const passwordIcon = document.getElementById("password-icon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.src = "img/hidden.png"; // Icon for hiding the password
    } else {
        passwordInput.type = "password";
        passwordIcon.src = "img/view.png"; // Icon for showing the password
    }
}

function showPopup(statusMessage) {
    // Show popup status
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";
    document.getElementById("popup-message").innerHTML = statusMessage;
}

function closePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";
}
