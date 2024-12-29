// Handle Country Code Prefix Input
const input = document.querySelector("#phone");
window.intlTelInput(input, {
  initialCountry: "ae",
  separateDialCode: true,
  loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.2.0/build/js/utils.js"),
});

// EmailJs Init
(function(){
  emailjs.init({
    publicKey: "WO7uT8iI5WelFwaxu",
  });
})();

// Handle onScroll Animation
AOS.init({
  disable: function () {
    return window.innerWidth < 768; // Disable on devices smaller than 768px
  }
});

// Handle Inquire button Click to Scroll
document.querySelectorAll(".inquire-btn").forEach(button => {
  button.addEventListener("click", function (event) {
    if (button.classList.contains("form-btn")) {
      return;
    }
    event.preventDefault();
    
    const targetSection = document.getElementById("contactForm");
    const isMobile = window.innerWidth <= 767;

    if (isMobile) {
      const yOffset = 350;
      const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Handle Inquiry Form
(() => {
  'use strict';
  
  const forms = document.getElementById('afzForm');
  
    forms.addEventListener('submit', event => {

      const emailInput = document.getElementById('email');
      const emailValue = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailValue)) {
        emailInput.setCustomValidity('Please enter a valid email address.');
      } else {
        emailInput.setCustomValidity('');
      }

      // Phone validation (allows numbers, hyphens, and spaces)
      const phoneInput = document.getElementById('phone');
      const phoneValue = phoneInput.value.trim();
      const phoneRegex = /^[\d-\s]+$/;

      if (!phoneRegex.test(phoneValue)) {
        phoneInput.setCustomValidity('Please enter a valid phone number.');
      } else {
        phoneInput.setCustomValidity('');
      }

      if (!forms.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();

        // Show the loader
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'block';

        // Collect form data
        const formData = new FormData(forms);
        const data = Object.fromEntries(formData.entries());

        // Get the phone prefix from intl-tel-input
        const phoneInput = document.querySelector('#phone');
        const phonePrefixElement = document.querySelector('.iti__selected-dial-code');
        const phonePrefix = phonePrefixElement ? phonePrefixElement.textContent : '';

        // Combine prefix with the entered phone number
        data.phone = phonePrefix + " " + phoneInput.value;

        // EmailJS integration
        const serviceID = 'service_3em7y5r';
        const templateID = 'template_76qys7y';

        emailjs.send(serviceID, templateID, data)
          .then(response => {
            console.log('Email sent successfully!', response);
            showAlert('Your form has been submitted successfully!', 'success');
            forms.reset();
            forms.classList.remove('was-validated');
          })
          .catch(error => {
            console.error('Failed to send email:', error);
            showAlert('Failed to send your form. Please try again later.', 'danger');
          }).finally(() => {
            // Hide the loader after email is sent or after an error
            if (loader) loader.style.display = 'none';
          });
      }

      forms.classList.add('was-validated');
    }, false);

  // Function to display Bootstrap alerts dynamically - being used in Inquiry Form
function showAlert(message, type) {
  const alertPlaceholder = document.getElementById('alert-placeholder');
  const alertHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  alertPlaceholder.innerHTML = alertHTML;

  // Automatically dismiss alert after 5 seconds
  setTimeout(() => {
    const alert = alertPlaceholder.querySelector('.alert');
    if (alert) {
      alert.classList.remove('show');
      setTimeout(() => alert.remove(), 150);
    }
  }, 5000);
}
})();

// Business License Inquiry Form
(() => {
  'use strict'
  
  // Target the form with the id 'afzLicense'
  const form = document.getElementById('afzLicense');
  
  form.addEventListener('submit', event => {
    // Prevent form submission if the form is invalid
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated');
    } else {
      event.preventDefault();

      // Collect the form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log(data);
      // Create a string to display the form values
      let alertMessage = "Form Submitted with the following values:\n\n";
      for (let key in data) {
        alertMessage += `${key}: ${data[key]}\n`;
      }

      // Show the data in a browser alert
      alert(alertMessage);
      form.reset();
      form.classList.remove('was-validated');
    }

  }, false);
})();    

// Number of Visa(s) Reuired Field
document.addEventListener("DOMContentLoaded", function () {
  const minusBtn = document.getElementById("minusBtn");
  const plusBtn = document.getElementById("plusBtn");
  const quantityInput = document.getElementById("quantityInput");

  // Update quantity on button click
  minusBtn.addEventListener("click", () => {
    let value = parseInt(quantityInput.value, 10) || 0;
    const min = parseInt(quantityInput.min, 10);
    if (value > min) {
      quantityInput.value = value - 1;
    } else {
      quantityInput.value = "";
    }
    quantityInput.dispatchEvent(new Event("input"));
  });

  plusBtn.addEventListener("click", () => {
    let value = parseInt(quantityInput.value, 10) || 0;
    const max = parseInt(quantityInput.max, 10);
    if (value < max) {
      quantityInput.value = value + 1;
    }
    quantityInput.dispatchEvent(new Event("input"));
  });
});

// Handle Google Review Slider
var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop: true,
  speed: 700
});