import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.interface';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-cart',
  imports: [RouterLink , TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

   
  cartDetails: Cart = {} as Cart;

  ngOnInit(): void {
    this.getLoggedUserData();
  }
  getLoggedUserData(): void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=> {
        console.log(res.data);
        
        this.cartDetails = res.data; 
        
        
      },
      error:(err)=> {
        console.log(err);
        
      }
    })
  }
 
trackBy(index: number, track:any): number {
  return index;
}

  removeItem(id:string):void{
    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartService.countNumber.set(res.numOfCartItems);
        this.cartDetails = res.data;
        if(res.status === "success"){
        this.toastrService.success(res.message , 'FreshCart Deleted')
      }
        
      },
      error:(err)=>{
        console.log(err);
        
      }

    })
  }

 updateCount(id:string , count:number): void{
  this.cartService.updateCartCount(id, count).subscribe({
    next:(res) =>{
      console.log(res);
      this.cartDetails =res.data;
      
    },
    error:(err) => {
      console.log(err);
      
    }

  });
}

clearCart(){
  this.cartService.clearCart().subscribe({
    next: (res) =>{
      this.toastrService.success(res.message);
      this.cartDetails = [] as any;   
    }
  })
}
 
}





