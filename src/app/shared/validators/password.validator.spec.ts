import { passwordContainsFirstLasNameMsg, passwordTooShortMsg, passwordWrongCaseMsg, passwordValidator } from './password.validator';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SignUpForm } from '../../models/sign-up-form';

describe(passwordValidator, () => {
    const fb = new FormBuilder();

    [null, ''].forEach((value) => {
        it(`should validate positive when no value: '${value}'`, () => {
            // given
            const formGroup = new FormGroup<SignUpForm>({} as SignUpForm);
            const formControl = new FormControl(value);

            // when
            expect(passwordValidator(formGroup)(formControl)).toBeNull();
        });
    });

    describe('wrong password provided', () => {
        ['t', 't s', 'RtYu09', '1234567'].forEach((value) => {
            it(`password too short: ${value}`, () => {
                // given
                const formGroup = new FormGroup<SignUpForm>({} as SignUpForm);
                const formControl = new FormControl(value);

                // when
                expect(passwordValidator(formGroup)(formControl)).toEqual({ invalidPassword: { value, message: passwordTooShortMsg } });
            });
        });

        ['tdsrtydf', 'ts1234567', 'RTY$&*09--45', '12345678'].forEach((value) => {
            it(`password missing upper/lowe case letters: ${value}`, () => {
                // given
                const formGroup = new FormGroup<SignUpForm>({} as SignUpForm);
                const formControl = new FormControl(value);

                // when
                expect(passwordValidator(formGroup)(formControl)).toEqual({ invalidPassword: { value, message: passwordWrongCaseMsg } });
            });
        });

        [
            { password: 'tdsRtydf-lastName', firstName: null, lastName: 'lastName' },
            { password: 'tdsRtydf-firstName', firstName: 'firstName', lastName: null },
            { password: 'tds_lastname_Rtydf-firstname', firstName: 'firstName', lastName: 'lastName' },
            { password: 'tds__Rtydf-firstname', firstName: 'firstName  ', lastName: 'lastName' },
            { password: 'tds__Rtydf-firstname', firstName: '   firstName  ', lastName: 'lastName' },
        ].forEach((value) => {
            it(`password contains first/last name: ${value.password}`, () => {
                // given
                const formGroup = fb.group<SignUpForm>(value as any);

                // when
                expect(passwordValidator(formGroup)(formGroup.controls.password)).toEqual({
                    invalidPassword: { value: formGroup.controls.password.value, message: passwordContainsFirstLasNameMsg },
                });
            });
        });
    });

    [
        { password: 'iuGH09..', firstName: null, lastName: 'lastName' },
        { password: 'ffsdlfjsdDSADAs9897', firstName: 'firstName', lastName: null },
        { password: 'tds_lastRname_Rtydf-firstYYYname', firstName: 'firstName', lastName: 'lastName' },
    ].forEach((value) => {
        it(`should validate positive for passwords: ${value.password} `, () => {
            // given
            const formGroup = fb.group<SignUpForm>(value as any);

            // when
            expect(passwordValidator(formGroup)(formGroup.controls.password)).toBeNull();
        });
    });
});
