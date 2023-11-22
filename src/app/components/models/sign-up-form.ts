import { FormControl } from '@angular/forms';

export interface SignUpForm {
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
}

export type FormField = keyof SignUpForm;
