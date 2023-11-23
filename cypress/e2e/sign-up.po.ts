export class SignUpPage {
    firstNameInput;
    firstNameInvalidFeedback;
    lastNameInput;
    lastNameInvalidFeedback;
    emailInput;
    emailInvalidFeedback;
    passwordInput;
    passwordInvalidFeedback;
    submitButton;
    alertDiv;

    constructor() {
        this.firstNameInput = () => cy.get('[data-test="firstName-input"]');
        this.firstNameInvalidFeedback = () => cy.get('[data-test="invalid-feedback-firstName"]');
        this.lastNameInput = () => cy.get('[data-test="lastName-input"]');
        this.lastNameInvalidFeedback = () => cy.get('[data-test="invalid-feedback-lastName"]');
        this.emailInput = () => cy.get('[data-test="email-input"]');
        this.emailInvalidFeedback = () => cy.get('[data-test="invalid-feedback-email"]');
        this.passwordInput = () => cy.get('[data-test="password-input"]');
        this.passwordInvalidFeedback = () => cy.get('[data-test="invalid-feedback-password"]');
        this.submitButton = () => cy.get('[data-test="submit-button"]');
        this.alertDiv = () => cy.get('[data-test="alert-div"]');
    }
}
