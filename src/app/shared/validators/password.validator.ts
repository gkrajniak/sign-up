import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { SignUpForm } from '../../models/sign-up-form';

export const passwordTooShortMsg = 'Password needs to have at least 8 characters.';
export const passwordWrongCaseMsg = 'Password needs to contain lower and uppercase letters.';
export const passwordContainsFirstLasNameMsg = 'Password can not contain user’s first or last name.';

export function passwordValidator(form: FormGroup<SignUpForm>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value: string = control.value;
        if (!value) {
            return null;
        }

        const passwordLengthRegex = /^(?=.*[a-zA-Z0-9]).{8,}$/;
        if (!passwordLengthRegex.test(value)) {
            return { invalidPassword: { value: control.value, message: passwordTooShortMsg } };
        }

        const passwordCaseRegex = /^(?=.*[a-z]).+(?=.*[A-Z]).+$/;
        if (!passwordCaseRegex.test(value)) {
            return { invalidPassword: { value: control.value, message: passwordWrongCaseMsg } };
        }

        const firstName = (form.controls.firstName.value || '').toLowerCase().trim();
        const lastName = (form.controls.lastName.value || '').toLowerCase().trim();
        if ((firstName && value.toLowerCase().includes(firstName)) || (lastName && value.toLowerCase().includes(lastName))) {
            return { invalidPassword: { value: control.value, message: passwordContainsFirstLasNameMsg } };
        }

        return null;
    };
}
