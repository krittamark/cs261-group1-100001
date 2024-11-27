// ดึงองค์ประกอบใน DOM
const attachButton = document.getElementById("attachButton");
const uploadBoxContainer = document.getElementById("uploadBox");
const uploadBox = document.querySelector(".upload-box");
const fileInput = document.getElementById("fileInput");
const browseButton = document.getElementById("browseButton");
const fileInfo = document.getElementById("fileInfo");
const fileList = document.getElementById("fileList");

// เก็บไฟล์ทั้งหมดใน Array
let uploadedFiles = [];

uploadBox.addEventListener("click", () => {
    fileInput.click();
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
    listItem.querySelector(".remove-file").addEventListener("click", (event) => {
        const fileName = event.target.getAttribute("data-file-name");
        removeFile(fileName, listItem);
    });
}

// ลบไฟล์ออกจากรายการ
function removeFile(fileName, listItem) {
    uploadedFiles = uploadedFiles.filter((file) => file.name !== fileName);
    listItem.remove();
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
    listItem.querySelector(".remove-file").addEventListener("click", (event) => {
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
}

(async () => {
  const applicationID = new URLSearchParams(window.location.search).get("id");
  if (!applicationID) {
    return;
  }

  const response = await fetch(`http://localhost:3001/api/requests/${applicationID}/attachments`);
  const data = await response.json();

  if (data.length > 0) {
    data.forEach((file, index) => {
      fetch(`http://localhost:3001/api/requests/${applicationID}/attachments/${index}`)
        .then((response) => response.blob())
        .then((blob) => {
          const fileURL = URL.createObjectURL(blob);
          const fileData = new File([blob], data[index], { type: file.type });
          uploadedFiles.push(fileData);
          addFileToList(fileData);
        });
    });
  } else {
    // Show text if no files are uploaded
    fileInfo.textContent = "ไม่มีไฟล์ที่อัปโหลด";
  }


})();