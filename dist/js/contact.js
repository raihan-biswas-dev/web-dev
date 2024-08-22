//Name: Santoshi Lamichhane
//Student ID: 100915340

import { StorageService } from './contact.mock.service.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let valid = true;  

        // Full Name validation
        const fullName = form.fullname.value.trim();
        const fullNameError = document.getElementById('fullnameError');
        if (fullName === "") {
            fullNameError.classList.remove('d-none');
            fullNameError.textContent = "Full name is required";
            valid = false;
        } else {
            fullNameError.classList.add('d-none');
            
        }

        // Email validation
        const email = form.email.value.trim();
        const emailError = document.getElementById('emailError');
        if (!email.includes('@')) {
            emailError.classList.remove('d-none');
            emailError.textContent = "A valid email with '@' is required";
            valid = false;
        } else {
            emailError.classList.add('d-none');
        }

        // Phone validation
        const phone = form.phone.value.trim();
        const phoneError = document.getElementById('phoneError');
        if (phone !== "" && !phone.match(/^\d+$/ )) {
            phoneError.classList.remove('d-none');
            phoneError.textContent = "Only numeric values are allowed";
            valid = false;
        } else {
            phoneError.classList.add('d-none');
        }

        // Message validation
        const message = form.message.value.trim();
        const messageError = document.getElementById('messageError');
        if (message === "") {
            messageError.classList.remove('d-none');
            messageError.textContent = "Message cannot be empty";
            valid = false;
        } else {
            messageError.classList.add('d-none');
        }

        if (!valid) return;  

        // Construct contact data object
        const contactData = {
            fullName,
            email,
            phone,
            message
        };

       

        // Save the validated data using the service
        StorageService.saveContactData(contactData);
        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Message:', message);
        successMessage.classList.remove('d-none');
        
        form.reset(); 
    });
});
