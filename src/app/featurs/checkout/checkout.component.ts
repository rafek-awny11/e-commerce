import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
 private readonly fb = inject(FormBuilder);
 private readonly activatedRoute = inject(ActivatedRoute);
 private readonly cartService = inject(CartService);
private readonly router = inject(Router);

 checkOutForm!:FormGroup;

 id:string | null =null;

ngOnInit(): void {
  this.initForm();
  this.getCartId();
}

getCartId(): void{
  this.activatedRoute.paramMap.subscribe({
    next:(urlParams)=>{
     this.id = urlParams.get('id');
      console.log(this.id);
      

    },
  })
}

 initForm():void{
  this.checkOutForm = this.fb.group({
    shippingAddress: this.fb.group({
      details: [null , [Validators.required]],
      phone: [null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null ,[Validators.required]],
    }),
  });
 }


 submitForm(method: 'vis' | 'cash'): void{
  if (this.checkOutForm.valid){
   
    if (method === 'vis'){
      this.cartService.checkOutSession(this.id,this.checkOutForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success') {
           
          window.open(res.session.url, '_self');
        }
      },
      error:(err)=>{
        console.log(err);
        
      }

    })
    } else if (method === 'cash'){
      this.cartService.cashPayment(this.id,this.checkOutForm.value).subscribe({
        next:(res)=>{
        console.log(res);
        if(res.status === 'success') {
         
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        }
      },
      })
    }

    
  }

 }







//  submitForm(): void{
//   if (this.checkOutForm.valid){
   
//     this.cartService.checkOutSession(this.id,this.checkOutForm.value).subscribe({
//       next:(res)=>{
//         console.log(res);
//         if(res.status === 'success') {
//           window.open(res.session.url, '_self');
//         }
//       },
//       error:(err)=>{
//         console.log(err);
        
//       }

//     })
    
//   }
//  }
}
