document.addEventListener('DOMContentLoaded', function () {
  // Get all forms and add event listener for submission
  document.querySelectorAll('form.main-form').forEach((form) => {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      const formData = {};

      // Identify form type based on title
      const formType = document.querySelector('h1.topic').innerText;
      formData['formType'] = formType;

      // Collect all inputs in the form
      form.querySelectorAll('input, select, textarea').forEach((input) => {
        let fieldName = input.id || input.name; // Use id or fallback to name

        if (input.type === 'radio') {
          // Check if the radio is checked
          if (input.checked) {
            formData[fieldName] = input.value;
          }
        } else if (input.type === 'checkbox') {
          // Handle checkboxes
          formData[fieldName] = input.checked;
        } else {
          // Handle other input types
          formData[fieldName] = input.value;
        }
      });

      console.log('Form Data Collected:', formData);
    });
  });
});
