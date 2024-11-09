// Fetch form type from API and dynamically load the form
function getFormType(applicationId) {
    fetch(`http://api.cs261.krittamark.com/api/applications/${applicationId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const formType = data.type; // Extract the 'type' field from the API response
            loadForm(formType);         // Call the loader function to display the form
        })
        .catch(error => {
            console.error('Error fetching form type:', error);
        });
}

// // Example usage
// const applicationId = 123; // Example ID
// getFormType(applicationId);

// //* for testing
// loadForm("delay_registration");