import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormComponent } from './sign-up-form.component';
import { ChangeDetectorRef } from '@angular/core';

describe(SignUpFormComponent, () => {
    let component: SignUpFormComponent;
    let fixture: ComponentFixture<SignUpFormComponent>;
    let changeDetectorRef: ChangeDetectorRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignUpFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SignUpFormComponent);
        component = fixture.componentInstance;
        changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should match snapshot', () => {
        expect(fixture).toMatchSnapshot();
    });

    describe('check ui state', () => {
        it('should have submit button disabled', () => {
            // given
            const formGroup = component.signupForm;

            // when
            changeDetectorRef.detectChanges();

            // then
            expect(formGroup.valid).toBeFalsy();
            const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
            expect(submitButton.disabled).toBeTruthy();
        });

        it('should enable the submit button when the form is valid', () => {
            // given
            const formGroup = component.signupForm;
            formGroup.controls.firstName.setValue('John');
            formGroup.controls.lastName.setValue('Doe');
            formGroup.controls.email.setValue('johndoe@example.com');
            formGroup.controls.password.setValue('StrongPassword123');

            // when
            changeDetectorRef.detectChanges();

            // then
            expect(formGroup.valid).toBeTruthy();
            const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
            expect(submitButton.disabled).toBeFalsy();
        });

        it('should enable the submit button only when all required form controls are valid', () => {
            const formGroup = component.signupForm;

            // Set first name
            formGroup.controls.firstName.setValue('John');
            changeDetectorRef.detectChanges();

            expect(formGroup.valid).toBeFalsy();
            let submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
            expect(submitButton.disabled).toBeTruthy();

            // Set last name
            formGroup.controls.lastName.setValue('Doe');
            changeDetectorRef.detectChanges();

            expect(formGroup.valid).toBeFalsy();
            submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
            expect(submitButton.disabled).toBeTruthy();

            // Set email
            formGroup.controls.email.setValue('johndoe@example.com');
            changeDetectorRef.detectChanges();

            expect(formGroup.valid).toBeFalsy();
            submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
            expect(submitButton.disabled).toBeTruthy();

            // Set password
            formGroup.controls.password.setValue('StrongPassword123');
            changeDetectorRef.detectChanges();

            expect(formGroup.valid).toBeTruthy();
            submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
            expect(submitButton.disabled).toBeFalsy();
        });
    });

    describe('check validation', () => {
        it('should not execute submit button', function () {
            // when
            component.onSubmit();

            // then todo gkr
        });
    });
});
