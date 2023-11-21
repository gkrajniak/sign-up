import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validators/email-validator';

@Component({
    selector: 'app-sign-up-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './sign-up-form.component.html',
    styleUrl: './sign-up-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {
    protected signupForm!: FormGroup<SignupForm>;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.signupForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, emailValidator()]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });
    }
    onSubmit() {
        if (this.signupForm.valid) {
            console.log('Form submitted:', this.signupForm.value);
        }
    }

    protected isFieldInvalid(fieldName: FormField): boolean {
        const control = this.signupForm.get(fieldName);
        return control ? control.invalid && control?.touched : false;
    }
}

interface SignupForm {
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
}

type FormField = keyof SignupForm;
