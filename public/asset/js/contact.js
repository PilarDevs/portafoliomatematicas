// Contact form functionality
function initContactForm() {
    setTimeout(() => {
        const contactForm = document.getElementById('contactForm');

        contactForm?.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Validate form
            if (!validateForm(data)) {
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Simulate form submission
            try {
                await simulateFormSubmission(data);
                
                // Show success message
                showMessage('¡Mensaje enviado con éxito!', 'success');
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                // Show error message
                showMessage('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
            } finally {
                // Restore button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }, 500);
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.name || data.name.trim().length < 2) {
        showMessage('Por favor, ingresa un nombre válido.', 'error');
        return false;
    }

    if (!emailRegex.test(data.email)) {
        showMessage('Por favor, ingresa un email válido.', 'error');
        return false;
    }

    if (!data.subject || data.subject.trim().length < 3) {
        showMessage('Por favor, ingresa un asunto válido.', 'error');
        return false;
    }

    if (!data.message || data.message.trim().length < 10) {
        showMessage('Por favor, ingresa un mensaje más largo (mínimo 10 caracteres).', 'error');
        return false;
    }

    return true;
}

function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        // Simulate API call
        console.log('Form data:', data);
        setTimeout(resolve, 1500);
    });
}

function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-20 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all ${
        type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
    }`;
    messageDiv.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to body
    document.body.appendChild(messageDiv);

    // Animate in
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 4000);
}
