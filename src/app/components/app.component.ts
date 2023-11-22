import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { HttpClientModule } from '@angular/common/http';
import { SignUpService } from '../service/sign-up.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, SignUpFormComponent, HttpClientModule],
    providers: [SignUpService],
})
export class AppComponent {}
