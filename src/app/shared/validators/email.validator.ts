import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (!value) {
            return null;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? null : { invalidEmail: { value: control.value } };
    };
}
