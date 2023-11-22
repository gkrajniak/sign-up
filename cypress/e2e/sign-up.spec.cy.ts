describe('Sign Up', () => {
    it('should submit the sign up form with valid data and receive success notification', () => {
        cy.visit('/');

        // Fill in the form
        cy.get('[data-test="firstName-input"]').type('John');
        cy.get('[data-test="lastName-input"]').type('Doe');
        cy.get('[data-test="email-input"]').type('johndoe@example.com');
        cy.get('[data-test="password-input"]').type('passworD123');

        // Click the submit button
        cy.get('[data-test="submit-button"]').click();

        // Check if the alert div is displayed with success message
        cy.get('[data-test="alert-div"]').should('have.class', 'alert-success');
        cy.get('[data-test="alert-div"]').should('contain', 'User John Doe has been signed up!');

        // Wait for the alert to disappear
        cy.wait(5000);
        cy.get('[data-test="alert-div"]').should('not.exist');
    });

    it('should validate sign up form inputs and keep submit button disabled', () => {
        cy.visit('http://localhost:4200/');

        // Click the first name input to trigger validation
        cy.get('[data-test="firstName-input"]').click();

        // Verify invalid feedback for first name
        cy.get('[data-test="invalid-feedback-firstName"]').should('have.text', 'First Name is required.');

        // Click the last name input to trigger validation
        cy.get('[data-test="lastName-input"]').click();

        // Verify invalid feedback for last name
        cy.get('[data-test="invalid-feedback-lastName"]').should('have.text', 'Last Name is required.');

        // Click the email input to trigger validation
        cy.get('[data-test="email-input"]').click();

        // Verify invalid feedback for email
        cy.get('[data-test="invalid-feedback-email"]').should('have.text', 'Email is required and must be a valid email address.');

        // Click the password input to trigger validation
        cy.get('[data-test="password-input"]').click();
        cy.get('[data-test="togglePassword-button"]').click();

        // Verify invalid feedback for password
        cy.get('[data-test="invalid-feedback-password"]').should('have.text', ' Password is required. ');

        // Check that the submit button remains disabled
        cy.get('[data-test="submit-button"]').should('be.disabled');
    });

    it('should display an error alert when sign up fails', () => {
        cy.visit('/');

        // Mock the HTTP call to return an error
        cy.intercept('POST', '/users', {
            statusCode: 500,
            body: {
                message: 'Internal Server Error',
            },
        });

        // Fill in the sign up form data
        cy.get('[data-test="firstName-input"]').type('John');
        cy.get('[data-test="lastName-input"]').type('Doe');
        cy.get('[data-test="email-input"]').type('johndoe@example.com');
        cy.get('[data-test="password-input"]').type('passworD123');

        // Submit the sign up form
        cy.get('[data-test="submit-button"]').click();

        // Verify that the alert div is displayed with an error message
        cy.get('[data-test="alert-div"]').should('have.class', 'alert-danger');
        cy.get('[data-test="alert-div"]').should('contain', 'Could not sign up the user!');

        // Wait for the alert to disappear
        cy.wait(5000);
        cy.get('[data-test="alert-div"]').should('not.exist');
    });
});
