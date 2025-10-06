import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { InputComponent } from "../input/input.component";
import { AuthService } from '../../../core/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [InputComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
    private readonly router = inject(Router);


  verifyEmail! : FormGroup;
  verifyCode! : FormGroup;
  resetPassword! : FormGroup;

  step: number = 1
  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void{
    this.verifyEmail = this.fb.group({
      email:[null, [Validators.required , Validators.email]],

    });

    this.verifyCode = this.fb.group({
      resetCode: [null , [Validators.required]],
    });

    this.resetPassword = this.fb.group({
      email:[null, [Validators.required , Validators.email]],
      newPassword: [null , [Validators.required ,Validators.pattern(/^\w{6,}$/) ] ],
    });

  }

  formStep1(): void{
    if(this.verifyEmail.valid){
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
        next:(res) =>{
          console.log(res);
          this.step = 2;
          
        }
      })
    }
  }

   formStep2(): void{
    if(this.verifyCode.valid){
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
        next:(res) =>{
          console.log(res);
          this.step = 3;
          
        }
      })
    }
  }

   formStep3(): void{
    if(this.resetPassword.valid){
      this.authService.submitResetPassword(this.resetPassword.value).subscribe({
        next:(res) =>{
          console.log(res);
          this.cookieService.set('token' , res.token);
          this.router.navigate(['/home']);
          
        }
      })
    }
  }

}
