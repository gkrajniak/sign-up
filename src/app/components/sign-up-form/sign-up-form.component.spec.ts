import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormComponent } from './sign-up-form.component';
import { ChangeDetectorRef } from '@angular/core';
import { SignUpService } from '../../service/sign-up.service';
import { of } from 'rxjs';

describe(SignUpFormComponent, () => {
    let component: SignUpFormComponent;
    let fixture: ComponentFixture<SignUpFormComponent>;
    let changeDetectorRef: ChangeDetectorRef;
    let signUpService: SignUpService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignUpFormComponent],
            providers: [{ provide: SignUpService, useValue: { signUp: jest.fn().mockReturnValue(of({})) } }],
        }).compileComponents();

        fixture = TestBed.createComponent(SignUpFormComponent);
        component = fixture.componentInstance;
        changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
        signUpService = TestBed.inject(SignUpService);
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

    describe('signUp', () => {
        it('should submit the form to server', function () {
            // given
            const u = { firstName: 'testUser', lastName: 'lastName', email: 'test@example.com', password: 'testPassword' };
            component.signupForm.setValue(u);

            // when
            component.onSubmit();

            // then
            expect(signUpService.signUp).toHaveBeenCalledWith(u);
        });

        it('should not submit the form to server, the form is invalid', function () {
            // given
            const u = { firstName: null, lastName: 'lastName', email: 'test@example.com', password: 'testPassword' };
            component.signupForm.setValue(u);

            // when
            component.onSubmit();

            // then
            expect(signUpService.signUp).not.toHaveBeenCalled();
        });
    });
});
