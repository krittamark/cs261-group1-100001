// ดึงองค์ประกอบใน DOM
const attachButton = document.getElementById("attachButton");
const uploadBoxContainer = document.getElementById("uploadBox");
const uploadBox = document.querySelector(".upload-box");
const fileInput = document.getElementById("fileInput");
const browseButton = document.getElementById("browseButton");
const fileInfo = document.getElementById("fileInfo");
const fileList = document.getElementById("fileList");
const submitFilesButton = document.getElementById("submitFilesButton");

// เก็บไฟล์ทั้งหมดใน Array
let uploadedFiles = [];

// เมื่อคลิกปุ่ม "แนบไฟล์"
attachButton.addEventListener("click", (event) => {
    event.preventDefault(); // ป้องกันการ refresh ของหน้าเว็บ
    attachButton.style.display = "none"; // ซ่อนปุ่มแนบไฟล์
    uploadBoxContainer.classList.remove("hidden"); // แสดงกล่องอัปโหลด
});

// เปิดหน้าต่างเลือกไฟล์เมื่อคลิกปุ่ม browse
browseButton.addEventListener("click", (event) => {
    event.preventDefault();
    fileInput.click();
});

// จัดการไฟล์ที่ถูกเลือก
fileInput.addEventListener("change", (event) => {
    const files = Array.from(event.target.files);
    handleFiles(files);
});

// จัดการไฟล์เมื่อมีการลากและวาง
uploadBox.addEventListener("dragover", (event) => {
    event.preventDefault();
    uploadBox.classList.add("dragging");
});

uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("dragging");
});

uploadBox.addEventListener("drop", (event) => {
    event.preventDefault();
    uploadBox.classList.remove("dragging");
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
});

// ฟังก์ชันจัดการไฟล์
function handleFiles(files) {
    files.forEach((file) => {
        uploadedFiles.push(file);
        addFileToList(file);
    });
    resetView();
}

// เพิ่มไฟล์ในรายการ
function addFileToList(file) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        ${file.name} <span>(${(file.size / 1024).toFixed(2)} KB)</span>
        <button class="remove-file" data-file-name="${file.name}">ลบ</button>
    `;
    fileList.appendChild(listItem);

    // เพิ่มฟังก์ชันลบไฟล์
    listItem
        .querySelector(".remove-file")
        .addEventListener("click", (event) => {
            const fileName = event.target.getAttribute("data-file-name");
            removeFile(fileName, listItem);
        });
}

// ลบไฟล์ออกจากรายการ
function removeFile(fileName, listItem) {
    uploadedFiles = uploadedFiles.filter((file) => file.name !== fileName);
    listItem.remove();

    // หากไม่มีไฟล์เหลือ ให้ซ่อนรายการไฟล์
    if (uploadedFiles.length === 0) {
        fileInfo.classList.add("hidden");
    }
}

// ฟังก์ชันรีเซ็ต UI หลังจากอัปโหลดไฟล์
function resetView() {
    uploadBoxContainer.classList.add("hidden"); // ซ่อนกล่องอัปโหลด
    attachButton.style.display = "flex"; // แสดงปุ่มแนบไฟล์
    fileInfo.classList.remove("hidden"); // แสดงส่วนข้อมูลไฟล์
}

// เพิ่มไฟล์ในรายการ พร้อมลิงก์ดูไฟล์
function addFileToList(file) {
    const listItem = document.createElement("li");

    // สร้าง URL ของไฟล์ที่อัปโหลด
    const fileURL = URL.createObjectURL(file);

    // เพิ่ม HTML สำหรับชื่อไฟล์และลิงก์ดูไฟล์
    listItem.innerHTML = `
        <a href="${fileURL}" target="_blank">${file.name}</a>
        <span>(${(file.size / 1024).toFixed(2)} KB)</span>
        <button class="remove-file" data-file-name="${file.name}">ลบ</button>
    `;
    fileList.appendChild(listItem);

    // เพิ่มฟังก์ชันลบไฟล์
    listItem
        .querySelector(".remove-file")
        .addEventListener("click", (event) => {
            const fileName = event.target.getAttribute("data-file-name");
            removeFile(fileName, listItem, fileURL);
        });
}

// ลบไฟล์ออกจากรายการ
function removeFile(fileName, listItem, fileURL) {
    uploadedFiles = uploadedFiles.filter((file) => file.name !== fileName);
    listItem.remove();

    // ล้าง URL ของไฟล์เมื่อไม่ใช้
    URL.revokeObjectURL(fileURL);

    // หากไม่มีไฟล์เหลือ ให้ซ่อนรายการไฟล์
    if (uploadedFiles.length === 0) {
        fileInfo.classList.add("hidden");
    }
}

// ฟังก์ชันยิง API เมื่อคลิกปุ่ม "อัปโหลดไฟล์"
if (submitFilesButton) {
    submitFilesButton.addEventListener("click", async () => {
        if (uploadedFiles.length === 0) {
            alert("กรุณาเลือกไฟล์ก่อนอัปโหลด");
            return;
        }

        // แปลงไฟล์เป็น binary array และยิงไป API
        await uploadFilesToServer(uploadedFiles);

        // เคลียร์ข้อมูลหลังจากอัปโหลด
        uploadedFiles = [];
        fileList.innerHTML = "";
        submitFilesButton.classList.add("hidden");
        attachButton.style.display = "flex"; // แสดงปุ่ม "แนบไฟล์" อีกครั้ง
    });
} else {
    console.error("submitFilesButton is not defined in the DOM.");
}

// ส่งไฟล์ไปยัง API
async function uploadFilesToServer(files) {
    const payload = {
        name: "files*",
        data: [],
    };

    // อ่านไฟล์และแปลงเป็น binary array
    for (let file of files) {
        const arrayBuffer = await file.arrayBuffer();
        payload.data.push(Array.from(new Uint8Array(arrayBuffer))); // แปลงเป็น byte array
    }

    // ยิง API
    try {
        const response = await fetch(
            `http://localhost:8080/applications/${applicationId}/attachments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload), // ส่ง payload ในรูปแบบ JSON
            }
        );

        if (response.ok) {
            alert("อัปโหลดไฟล์สำเร็จ!");
        } else {
            console.error("เกิดข้อผิดพลาดในการอัปโหลด:", response.status);
            alert("การอัปโหลดไฟล์ล้มเหลว");
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        alert("การเชื่อมต่อกับเซิร์ฟเวอร์ล้มเหลว");
    }
}
