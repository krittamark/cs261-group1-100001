document.addEventListener("DOMContentLoaded", async function () {
    // Redirect to login if not logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        window.location.href = "/login.html";
        return;
    }

    // Get application ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const applicationId = urlParams.get("id");

    if (applicationId) {
        await loadApplicationData(applicationId);
    }

    async function loadApplicationData(applicationId) {
        try {
            const response = await fetch(
                `http://localhost:8080/api/requests/${applicationId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) throw new Error("Failed to fetch application data");

            const applicationData = await response.json();
            populateForm(applicationData);
            makeFormReadOnly();
        } catch (error) {
            console.error("Error loading application data:", error);
            alert("ไม่สามารถโหลดข้อมูลคำร้องได้");
        }
    }

    function populateForm(data) {
        const fields = {
            date: data.date,
            subject: data.formType,
            full_name: data.fullName,
            registration_number: data.registrationNumber,
            year: data.year,
            faculty: data.faculty,
            department: data.department,
            mobile_phone: data.mobilePhone,
            relative_mobile_phone: data.relativeMobilePhone,
            email: data.email,
            contact_address: data.contactAddress,
            advisor: data.advisor,
            academic_year: data.academicYear,
            semester: data.semester,
            course_code: data.courseCode,
            course_name: data.courseName,
            course_section: data.courseSection,
            additional_explanation: data.additionalExplanation,
            resign_year: data.resignYear,
            debt: data.debt,
        };

        for (const [fieldId, value] of Object.entries(fields)) {
            const input = document.getElementById(fieldId);
            if (input) {
                input.value = value || ""; // Populate fields with value or leave blank
            }
        }

        // Handle radio buttons for grade request
        if (data.gradeRequest) {
            const gradeInput = document.getElementById(
                data.gradeRequest === "want" ? "want_grade" : "dont_want_grade"
            );
            if (gradeInput) gradeInput.checked = true;
        }

        console.log("Form populated with data:", data);
    }

    function populateResignForm(data) {
        // Basic information
        document.getElementById("date").value = data.date || "";
        document.getElementById("subject").value = data.formType || "";
        document.getElementById("full_name").value = data.fullName || "";
        document.getElementById("registration_number").value =
            data.registrationNumber || "";
        document.getElementById("year").value = data.year || "";
        document.getElementById("faculty").value = data.faculty || "";
        document.getElementById("department").value = data.department || "";
        document.getElementById("mobile_phone").value = data.mobilePhone || "";
        document.getElementById("relative_mobile_phone").value =
            data.relativeMobilePhone || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("contact_address").value =
            data.contactAddress || "";
        document.getElementById("advisor").value = data.advisor || "";

        // Resign year and semester
        document.getElementById("resign_year").value = data.resignYear || "";
        document.getElementById("semester").value = data.semester || "";

        // Debt information
        document.getElementById("debt").value = data.debt || "";

        // Grade request (radio buttons)
        if (data.gradeRequest === "want") {
            document.getElementById("want_grade").checked = true;
        } else if (data.gradeRequest === "dont-want") {
            document.getElementById("dont_want_grade").checked = true;
        }
    }

    function makeFormReadOnly() {
        document.querySelectorAll("input, textarea, select").forEach((field) => {
            field.setAttribute("readonly", true);
            field.setAttribute("disabled", true);
        });
    }

    const approveButton = document.querySelector(".approve-button");

    // Event listener for the approve button
    approveButton.addEventListener("click", function () {
        showApprovalPopup(
            "คุณยืนยันที่จะอนุมัติคำร้องหรือไม่?",
            "กรุณาใส่ความคิดเห็นก่อนการอนุมัติ",
            async (advisorReason) => {
                try {
                    const response = await fetch(
                        `http://localhost:8080/api/requests/${applicationId}/Advisorapprove`,
                        {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                formStatus: "waiting for Instructor", // เปลี่ยนสถานะเป็น "waiting for Instructor"
                                advisorReason: advisorReason, // ส่งเหตุผลที่ได้รับ
                            }),
                        }
                    );
    
                    if (!response.ok) throw new Error("Failed to approve the application");
    
                    showSuccessPopup("อนุมัติ", "อนุมัติคำร้องสำเร็จ", () => {
                        window.location.href = "/Advisor/AdvisorDashboard_Home.html"; // Redirect to Advisor Dashboard
                    });
                } catch (error) {
                    console.error("Error approving the application:", error);
                    showErrorPopup("เกิดข้อผิดพลาด", "ไม่สามารถอนุมัติคำร้องได้");
                }
            }
        );
    });
    

    function showConfirmationPopup(title, message, onConfirm) {
        const overlay = document.createElement("div");
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        const popup = document.createElement("div");
        popup.style.cssText = `
            background-color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            width: 600px;
        `;
        popup.innerHTML = `
            <h2 style="font-size: 24px; margin-bottom: 10px;">${title}</h2>
            <p style="font-size: 18px; margin-bottom: 20px; font-weight: normal;">${message}</p>
            <div style="display: flex; justify-content: center; gap: 20px;">
                <button id="cancel-button" style="padding: 10px 20px; font-size: 16px; background-color: #ccc; border: none; border-radius: 5px; cursor: pointer;">ยกเลิก</button>
                <button id="confirm-button" style="padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; border: none; border-radius: 5px; cursor: pointer;">ยืนยัน</button>
            </div>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        document.getElementById("cancel-button").addEventListener("click", () => {
            document.body.removeChild(overlay);
        });

        document.getElementById("confirm-button").addEventListener("click", () => {
            document.body.removeChild(overlay);
            onConfirm();
        });
    }

    function showSuccessPopup(title, message, onOk) {
        const overlay = document.createElement("div");
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;

        const popup = document.createElement("div");
        popup.style.cssText = `
            background-color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            width: 400px;
        `;
        popup.innerHTML = `
            <span style="font-size: 50px; color: #28a745; margin-bottom: 20px;">✔</span>
            <h2 style="font-size: 24px; margin-bottom: 10px;">${title}</h2>
            <p style="font-size: 18px; margin-bottom: 20px;">${message}</p>
            <button id="ok-button" style="padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; border: none; border-radius: 5px; cursor: pointer;">กลับสู่หน้าหลัก</button>
        `;

        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        document.getElementById("ok-button").addEventListener("click", () => {
            document.body.removeChild(overlay);
            onOk();
        });
    }

    function showErrorPopup(title, message) {
        const overlay = document.createElement("div");
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
    
        const popup = document.createElement("div");
        popup.style.cssText = `
            background-color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            width: 400px;
        `;
        popup.innerHTML = `
            <span style="font-size: 50px; color: #C30E2F; margin-bottom: 20px;">✘</span>
            <h2 style="font-size: 24px; margin-bottom: 10px;">${title}</h2>
            <p style="font-size: 18px; margin-bottom: 20px;">${message}</p>
            <button id="ok-button" style="
                padding: 10px 20px;
                font-size: 16px;
                color: white;
                background-color: #C30E2F;
                border: none;
                border-radius: 5px;
                cursor: pointer;">ตกลง</button>
        `;
    
        overlay.appendChild(popup);
        document.body.appendChild(overlay);
    
        document.getElementById("ok-button").addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
    }
    

const rejectButton = document.querySelector(".reject-button");

// Event listener for the reject button
rejectButton.addEventListener("click", function () {
    showRejectionPopup(
        "คุณยืนยันที่จะปฏิเสธคำร้องหรือไม่?",
        "หากกดยืนยัน ระบบจะทำการปฏิเสธคำร้อง",
        async (advisorReason) => { // Rename to match the backend key
            try {
                if (!applicationId) throw new Error("Application ID is not defined");

                const response = await fetch(
                    `http://localhost:8080/api/requests/${applicationId}/reject`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ advisorReason: advisorReason }), // Update the key to "advisorReason"
                    }
                );

                if (!response.ok) throw new Error("Failed to reject the application");

                // Show red success popup after rejection
                showRejectionSuccessPopup("ไม่อนุมัติ", "การปฏิเสธคำร้องสำเร็จ", () => {
                    window.location.href = "/Advisor/AdvisorDashboard_Home.html"; // Redirect to dashboard
                });
            } catch (error) {
                console.error("Error rejecting the application:", error);
                showErrorPopup("เกิดข้อผิดพลาด", "ไม่สามารถปฏิเสธคำร้องได้");
            }
        }
    );
});



// Show rejection popup
function showRejectionPopup(title, message, onConfirm) {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    const popup = document.createElement("div");
    popup.style.cssText = `
        background-color: white;
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        width: 600px;
    `;
    popup.innerHTML = `
        <h2 style="font-size: 24px; margin-bottom: 10px;">${title}</h2>
        <p style="font-size: 18px; margin-bottom: 20px; font-weight: normal;">${message}</p>
        <textarea id="advisor_reason" style="
            width: 100%;
            height: 100px;
            margin-bottom: 20px;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            resize: none;
        " placeholder="กรุณาใส่เหตุผล (บังคับ)"></textarea>
        <div style="display: flex; justify-content: center; gap: 20px;">
            <button id="cancel-button" style="
                padding: 10px 20px;
                font-size: 16px;
                background-color: #ccc;
                border: none;
                border-radius: 5px;
                cursor: pointer;">ยกเลิก</button>
            <button id="confirm-button" style="
                padding: 10px 20px;
                font-size: 16px;
                color: white;
                background-color: #C30E2F;
                border: none;
                border-radius: 5px;
                cursor: pointer;">ยืนยัน</button>
        </div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    document.getElementById("cancel-button").addEventListener("click", () => {
        document.body.removeChild(overlay);
    });

    document.getElementById("confirm-button").addEventListener("click", () => {
        const reason = document.getElementById("advisor_reason").value.trim();
        if (!reason) {
            alert("กรุณากรอกความคิดเห็นก่อนดำเนินการ");
            return;
        }
        document.body.removeChild(overlay);
        onConfirm(reason);
    });
}

function showRejectionSuccessPopup(title, message, onOk) {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    const popup = document.createElement("div");
    popup.style.cssText = `
        background-color: #ffffff; /* Light red background */
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        width: 400px;
        border: 1px solid #f5c6cb; /* Border matching red tone */
    `;

    popup.innerHTML = `
        <span style="font-size: 50px; color: #C30E2F; margin-bottom: 20px;">&#10005;</span> <!-- Red X symbol -->
        <h2 style="font-size: 24px; margin-bottom: 10px; color: #721c24;">${title}</h2>
        <p style="font-size: 18px; margin-bottom: 20px; color: #721c24;">${message}</p>
        <button id="ok-button" style="
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #C30E2F;
            border: none;
            border-radius: 5px;
            cursor: pointer;">ตกลง</button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    document.getElementById("ok-button").addEventListener("click", () => {
        document.body.removeChild(overlay);
        onOk();
    });
}
function showApprovalPopup(title, message, onConfirm) {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    const popup = document.createElement("div");
    popup.style.cssText = `
        background-color: white;
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        width: 600px;
    `;
    popup.innerHTML = `
        <h2 style="font-size: 24px; margin-bottom: 10px;">${title}</h2>
        <p style="font-size: 18px; margin-bottom: 20px; font-weight: normal;">${message}</p>
        <textarea id="advisor_reason" style="
            width: 100%;
            height: 100px;
            margin-bottom: 20px;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            resize: none;
        " placeholder="กรุณาใส่เหตุผล (บังคับ)"></textarea>
        <div style="display: flex; justify-content: center; gap: 20px;">
            <button id="cancel-button" style="
                padding: 10px 20px;
                font-size: 16px;
                background-color: #ccc;
                border: none;
                border-radius: 5px;
                cursor: pointer;">ยกเลิก</button>
            <button id="confirm-button" style="
                padding: 10px 20px;
                font-size: 16px;
                color: white;
                background-color: #28a745;
                border: none;
                border-radius: 5px;
                cursor: pointer;">ยืนยัน</button>
        </div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    document.getElementById("cancel-button").addEventListener("click", () => {
        document.body.removeChild(overlay);
    });

    document.getElementById("confirm-button").addEventListener("click", () => {
        const reason = document.getElementById("advisor_reason").value.trim();
        if (!reason) {
            alert("กรุณากรอกความคิดเห็นก่อนดำเนินการ");
            return;
        }
        document.body.removeChild(overlay);
        onConfirm(reason);
    });
}

});