const cancelRequestButton = document.getElementById('cancelRequestButton');
const closePopupButton = document.getElementById('closePopup');
const confirmCancelButton = document.getElementById('confirmCancel');
const cancelPopup = document.getElementById('cancelPopup');
let currentRequestId = null;

// แสดงป๊อปอัปเมื่อกดปุ่มยกเลิกคำร้อง
cancelRequestButton.addEventListener('click', () => {
  button.addEventListener('click', () => {
    currentRequestId = button.getAttribute('data-id');
    cancelPopup.style.display = 'flex';
  });
});

// ปิดป๊อปอัปเมื่อกดปุ่มยกเลิก
closePopupButton.addEventListener('click', () => {
  cancelPopup.style.display = 'none';
  currentRequestId = null;
});

// เมื่อกดปุ่มยืนยัน ให้แสดงข้อความยืนยัน (สามารถเพิ่มโค้ดสำหรับการยกเลิกคำร้องจริงได้ในส่วนนี้)
confirmCancelButton.addEventListener('click', async () => {
  if (currentRequestId) {
    try {
      const response = await fetch(``, {
        method: 'DETELE' ,
      });
      if (response.ok) {
        alert('คำร้องถูกยกเลิกเรียบร้อยแล้ว');
        cancelPopup.style.display = 'none';
      } else {
        alert('ไม่สามารถยกเลิกคำร้อง');
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการยกเลิกคำร้อง');
      console.error('Error:', error);
    }
  }
});

// คลิกข้างนอกป๊อปอัปเพื่อปิด
window.addEventListener('click', (event) => {
  if (event.target === cancelPopup) {
    cancelPopup.style.display = 'none';
    currentRequestId = null;
  }
});
