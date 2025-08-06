import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService : AuthService
    

  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

onSubmit() {
  this.errorMessage = null;
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }
  this.loading = true;

  const { username, password } = this.loginForm.value;
  this.authService.login(username, password, 'admin').subscribe({
    next: res => {
      this.loading = false;
      // Optionally check response for success, or role-based routing, etc.
      // For now: just navigate to dashboard or home
      this.router.navigate(['/dashboard']); // update path as needed
    },
    error: err => {
      this.loading = false;
      // If backend sends { message: "error" }
      this.errorMessage = err?.error?.message || 'Login failed. Please try again.';
    }
  });
}

}