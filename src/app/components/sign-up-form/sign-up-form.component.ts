import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validators/email.validator';
import { FormField, SignUpForm } from '../../models/sign-up-form';
import { passwordValidator } from '../../shared/validators/password.validator';
import { Subject, takeUntil } from 'rxjs';
import { SignUpService } from '../../service/sign-up.service';
import { User } from '../../models/user';

@Component({
    selector: 'app-sign-up-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './sign-up-form.component.html',
    styleUrl: './sign-up-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit, OnDestroy {
    signupForm!: FormGroup<SignUpForm>;
    private destroy$: Subject<void> = new Subject<void>();
    protected showPassword = false;
    protected singUpResult: SingUpResult = { status: null };

    constructor(
        private fb: FormBuilder,
        private signUpService: SignUpService,
        private changeDetectorRef: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.signupForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, emailValidator()]],
            password: ['', Validators.required],
        });

        this.signupForm.controls.password.addValidators(passwordValidator(this.signupForm));

        this.signupForm.controls.firstName.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
            this.signupForm.controls.password.updateValueAndValidity();
        });
        this.signupForm.controls.lastName.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
            this.signupForm.controls.password.updateValueAndValidity();
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSubmit() {
        if (this.signupForm.valid) {
            const user = this.signupForm.getRawValue() as User;
            this.signUpService.signUp(user).subscribe({
                next: (response) => {
                    this.signupForm.reset();
                    this.handleSingUpResult('success', `User ${user.firstName} ${user.lastName} has been signed up!`);
                },
                error: () => {
                    this.handleSingUpResult('danger', 'Could not sign up the user!');
                },
            });
        }
    }

    private handleSingUpResult(status: SingUpResultStatus, message: string) {
        this.singUpResult = { status, message };
        this.changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.singUpResult = { status: null };
            this.changeDetectorRef.detectChanges();
        }, 5000);
    }

    protected isFieldInvalid(fieldName: FormField): boolean {
        const control = this.signupForm.get(fieldName);
        return control ? control.invalid && control?.touched : false;
    }

    protected getPasswordErrorMsg() {
        const ctrl = this.signupForm.controls.password;
        if (ctrl.hasError('required')) {
            return 'Password is required.';
        }

        const invalidPassword = ctrl.getError('invalidPassword');
        if (invalidPassword) {
            return invalidPassword.message;
        }
    }

    protected togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    protected formNotValid() {
        return !this.signupForm.valid;
    }
}

interface SingUpResult {
    message?: string;
    status: SingUpResultStatus;
}

type SingUpResultStatus = 'danger' | 'success' | null;
