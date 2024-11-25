document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
        window.location.href = "/index.html";
    }

    document
        .getElementById("toggle-password")
        .addEventListener("click", togglePassword);
    document
        .getElementById("login-button")
        .addEventListener("click", submitLogin);
    document.getElementById("popup-ok").addEventListener("click", closePopup);

    // Prevent going back to the login page if logged in
    window.addEventListener("popstate", function () {
        if (sessionStorage.getItem("isLoggedIn")) {
            window.location.href = "/index.html";
        }
    });
});

function submitLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // ตรวจสอบการล็อกอินแบบ Employee โดยตรง
    if (username === "Advisor" && password === "Advisor") {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userRole", "employee"); // ระบุบทบาท
        window.location.href = "/Advisor/AdvisorDashboard_Home.html";
        return; // หยุดการทำงานเพิ่มเติม
    }

    // Authenticate the user as Student
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
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("registrationNumber", username);
                sessionStorage.setItem("userRole", "student"); // ระบุบทบาทเป็นนักศึกษา

                // Fetch detailed student data
                const studentId = username;
                fetch(
                    `https://restapi.tu.ac.th/api/v2/profile/std/info/?id=${studentId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Application-Key":
                                "TU8006a67d385d98ce2923e80f7cbf742706efbcf969c021c89a58a703c80fd3a2c80f3235cfed29b9f10060a315e80192",
                        },
                    }
                )
                    .then((response) => response.json())
                    .then((detailData) => {
                        console.log("Detailed Student Data:", detailData);

                        if (detailData.status === true && detailData.data) {
                            const studentData = detailData.data;

                            // Map English prefixes to Thai titles
                            const prefixMapping = {
                                Mr: "นาย",
                                Ms: "นางสาว",
                                Mrs: "นาง",
                            };
                            const thaiPrefix =
                                prefixMapping[studentData.prefixname] ||
                                studentData.prefixname ||
                                "";

                            // Prepare user data for autofill in forms
                            const autofillData = {
                                fullName: `${thaiPrefix} ${
                                    studentData.displayname_th || ""
                                }`,
                                registrationNumber: studentData.userName,
                                faculty: studentData.faculty,
                                department: studentData.department,
                                email: studentData.email,
                            };

                            // Store user details in sessionStorage for autofill
                            sessionStorage.setItem(
                                "studentData",
                                JSON.stringify(autofillData)
                            );
                            console.log("Autofill data stored:", autofillData);

                            // Redirect to index.html
                            window.location.href = "/index.html";
                        } else {
                            console.error(
                                "Failed to fetch detailed student data:",
                                detailData.message || "Unknown error"
                            );
                        }
                    })
                    .catch((error) =>
                        console.error("Error fetching student data:", error)
                    );
            } else {
                showPopup("Login failed: " + data.message);
            }
        })
        .catch((error) => console.error("Error during login:", error));
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
    // Show popup status
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";
    document.getElementById("popup-message").innerHTML = statusMessage;
}

function closePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";
}
