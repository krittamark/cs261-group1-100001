// // Fetch form type from API and dynamically load the form
// function getFormType(applicationId) {
//     fetch(`/api/application?id=${applicationId}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             const formType = data.type; // Ensure `data.type` exists and is valid
//             loadForm(formType);         // Call the loader function to display the form
//         })
//         .catch(error => {
//             console.error('Error fetching form type:', error);
//         });
// }

// // Example usage
// const applicationId = 123; // Example ID
// getFormType(applicationId);

//* for testing
loadForm("withdraw_course");