// // Function to get the form type from the API
// function getFormType(id) {
//     // Make an API request to get the form data
//     fetch(`/api/application?id=${id}`)
//         .then(response => response.json())
//         .then(data => {
//             const formType = data.type; // Assuming the API returns a field `type`
//             loadForm(formType); // Load the form based on the type
//         })
//         .catch(error => {
//             console.error('Error fetching form type:', error);
//         });
// }

// // Example: Get the form type for a specific application ID
// const applicationId = 123; // This could be dynamically set
// getFormType(applicationId);


//* for testing container.innerHTML in fromLoader.js
loadForm("resign")