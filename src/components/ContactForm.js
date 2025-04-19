export class ContactForm {
    constructor() {
        this.form = document.querySelector('form[name="contact"]');
        this.modalBody = document.querySelector('#contactModal .modal-body');
    }

    initialize() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    async handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(this.form);
        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                // Show success message
                this.modalBody.innerHTML = `
          <div class="text-center">
            <h5>Thank You!</h5>
            <p>Your message has been sent successfully. I'll get back to you soon.</p>
          </div>
        `;
                // Close modal and reset form after a delay
                setTimeout(() => {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
                    modal.hide();
                    this.modalBody.innerHTML = this.form.outerHTML; // Restore form
                    this.form = document.querySelector('form[name="contact"]'); // Rebind form
                    this.initialize(); // Reattach event listener
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            this.modalBody.innerHTML = `
        <div class="text-center">
          <p class="text-danger">Failed to send message. Please try again later.</p>
        </div>
      `;
        }
    }
}