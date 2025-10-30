import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../core/models/product.interface';
import { CartService } from '../cart/services/cart.service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-details',
  imports: [TranslatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService = inject(CartService);

  id:string | null = null;
  productDetails:Product = {} as Product;



  ngOnInit(): void {
    this.getProductId();

    
  }

  getProductId():void {
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=>{
        this.id =urlParams.get('id');
        if( this.id) {
          this.getProductDetailsData();
        }
      }
    })
  }

  getProductDetailsData():void{
    this.productDetailsService.getProductDetalis(this.id).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productDetails = res.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


 addProductItemToCart(id: string): void {
    this.cartService.addProductsToCart(id).subscribe({
      next: (res) => {
        console.log(res);

        this.cartService.countNumber.set(res.numOfCartItems);  
        console.log(this.cartService.countNumber)
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
