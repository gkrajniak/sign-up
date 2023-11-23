import { SignUpPage } from './sign-up.po';

describe('Sign Up', () => {
    const signUpPage = new SignUpPage();

    it('should submit the sign up form with valid data and receive success notification', () => {
        cy.visit('/');

        // Fill in the form
        signUpPage.firstNameInput().type('John');
        signUpPage.lastNameInput().type('Doe');
        signUpPage.emailInput().type('johndoe@example.com');
        signUpPage.passwordInput().type('passworD123');

        // Click the submit button
        signUpPage.submitButton().click();

        // Check if the alert div is displayed with success message
        signUpPage.alertDiv().should('have.class', 'alert-success');
        signUpPage.alertDiv().should('contain', 'User John Doe has been signed up!');

        // Wait for the alert to disappear
        cy.wait(5000);
        signUpPage.alertDiv().should('not.exist');
    });

    it('should validate sign up form inputs and keep submit button disabled', () => {
        cy.visit('http://localhost:4200/');

        // Click the first name input to trigger validation
        signUpPage.firstNameInput().click();
        signUpPage.firstNameInvalidFeedback().should('have.text', 'First Name is required.');

        // Click the last name input to trigger validation
        signUpPage.lastNameInput().click();
        signUpPage.lastNameInvalidFeedback().should('have.text', 'Last Name is required.');

        // Click the email input to trigger validation
        signUpPage.emailInput().click();
        signUpPage.emailInvalidFeedback().should('have.text', 'Email is required and must be a valid email address.');

        // Click the password input to trigger validation
        signUpPage.passwordInput().click();
        signUpPage.passwordInvalidFeedback().should('not.exist');

        // Check that the submit button remains disabled
        signUpPage.submitButton().should('be.disabled');
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

        // Fill in the sign up form
        signUpPage.firstNameInput().type('John');
        signUpPage.lastNameInput().type('Doe');
        signUpPage.emailInput().type('johndoe@example.com');
        signUpPage.passwordInput().type('passworD123');

        // Submit the sign up form
        signUpPage.submitButton().click();

        // Verify that the alert div is displayed with an error message
        signUpPage.alertDiv().should('have.class', 'alert-danger');
        signUpPage.alertDiv().should('contain', 'Could not sign up the user!');

        // Wait for the alert to disappear
        cy.wait(5000);
        signUpPage.alertDiv().should('not.exist');
    });

    it('should validate password correctness once the first name is changed', () => {
        cy.visit('http://localhost:4200/');

        // Fill in the password
        signUpPage.passwordInput().type('passworD123Tom');
        signUpPage.passwordInvalidFeedback().should('not.exist');

        // Change the first name
        signUpPage.firstNameInput().clear().type('Tom');
        signUpPage.passwordInvalidFeedback().should('have.text', ' Password can not contain user’s first or last name. ');

        // Fill in the password input
        signUpPage.passwordInput().clear().type('passworD123Som');
        signUpPage.passwordInvalidFeedback().should('not.exist');

        // Change the last name
        signUpPage.lastNameInput().clear().type('Som');
        signUpPage.passwordInvalidFeedback().should('have.text', ' Password can not contain user’s first or last name. ');
    });
});
