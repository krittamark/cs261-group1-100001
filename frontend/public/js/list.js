document.addEventListener('DOMContentLoaded', function() {
    fetchRequestData();
    // // Check if the user is logged in
    // const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    // if (!isLoggedIn) {
    //     window.location.href = "/login.html";
    //     return;
    // }
});

function logout() {
    sessionStorage.clear();
    window.location.href = "/login.html";
}

async function fetchRequestData() {
    const requestList = document.getElementById('request-list');
    try {
        const response = await fetch('/api/requests'); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        requestList.innerHTML = ''; // Clear previous data

        if (data.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="4">ไม่มีรายการคำร้อง</td>';
            requestList.appendChild(row);
        } else {
            data.forEach(request => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${request.submittedDate}</td>
                    <td>${request.requestType}</td>
                    <td>${request.requester}</td>
                    <td><button class="view-details" data-request-id="${request.id}">คำร้อง</button></td>
                `;
                requestList.appendChild(row);
            });

            // Add event listeners to "View Details" buttons
            const viewDetailsButtons = document.querySelectorAll('.view-details');
            viewDetailsButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const requestId = button.dataset.requestId;
                    showRequestDetails(requestId);
                });
            });
        }
    } catch (error) {
        console.error('Error fetching request data:', error);
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4">เกิดข้อผิดพลาดในการดึงข้อมูลคำร้อง</td>';
        requestList.appendChild(row);
    }
}

// async function showRequestDetails(requestId) {
//     try {
//         const response = await fetch(`/api/requests/${requestId}`); // Replace with your API endpoint for details
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const requestDetails = await response.json();

//         // Create a modal or use existing one to display requestDetails
//         // Example using alert (replace with proper modal implementation)
//         let details = `<h2>รายละเอียดคำร้อง</h2>`;
//         for (const key in requestDetails) {
//             details += `<h3>${key}:</h3><p>${requestDetails[key]}</p>`;
//         }
//         details += `<button onclick="approveRequest(${requestId})">อนุมัติ</button> <button onclick="rejectRequest(${requestId})">ไม่อนุมัติ</button>`;

//         const modal = document.createElement('div'); //Create a simple modal
//         modal.innerHTML = details;
//         modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;';

//         document.body.appendChild(modal); //Append modal to the body

//     } catch (error) {
//         console.error('Error fetching request details:', error);
//         alert('เกิดข้อผิดพลาดในการดึงรายละเอียดคำร้อง');
//     }
// }