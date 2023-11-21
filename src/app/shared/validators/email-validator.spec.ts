import { emailValidator } from './email-validator';
import { FormControl } from '@angular/forms';

describe(emailValidator, () => {
    it('should validate positive if value is null', () => {
        // given
        const control = new FormControl();

        // when then
        expect(emailValidator()(control)).toBeNull();
    });

    it('should validate positive if value is blank', () => {
        // given
        const control = new FormControl('');

        // when then
        expect(emailValidator()(control)).toBeNull();
    });

    ['r', 'r@', 'r@o', 'r@o.', '@o', '@o.', '@o.pl'].forEach((value) => {
        it(`should return error if value is not proper email: ${value}`, () => {
            // given
            const control = new FormControl(value);

            // when then
            expect(emailValidator()(control)).toEqual({ invalidEmail: { value } });
        });
    });

    ['r@o.p', 'email@o2.pl'].forEach((value) => {
        it(`should validate positive if value is a proper email: ${value}`, () => {
            // given
            const control = new FormControl(value);

            // when then
            expect(emailValidator()(control)).toBeNull();
        });
    });
});
