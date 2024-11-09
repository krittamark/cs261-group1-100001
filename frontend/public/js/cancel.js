const cancelRequestButton = document.getElementById('cancelRequestButton');
const closePopupButton = document.getElementById('closePopup');
const confirmCancelButton = document.getElementById('confirmCancel');
const cancelPopup = document.getElementById('cancelPopup');

// แสดงป๊อปอัปเมื่อกดปุ่มยกเลิกคำร้อง
cancelRequestButton.addEventListener('click', () => {
  cancelPopup.style.display = 'flex';
});

// ปิดป๊อปอัปเมื่อกดปุ่มยกเลิก
closePopupButton.addEventListener('click', () => {
  cancelPopup.style.display = 'none';
});

// เมื่อกดปุ่มยืนยัน ให้แสดงข้อความยืนยัน (สามารถเพิ่มโค้ดสำหรับการยกเลิกคำร้องจริงได้ในส่วนนี้)
confirmCancelButton.addEventListener('click', () => {
  alert('คำร้องถูกยกเลิกเรียบร้อยแล้ว');
  cancelPopup.style.display = 'none';
});

// คลิกข้างนอกป๊อปอัปเพื่อปิด
window.addEventListener('click', (event) => {
  if (event.target === cancelPopup) {
    cancelPopup.style.display = 'none';
  }
});
