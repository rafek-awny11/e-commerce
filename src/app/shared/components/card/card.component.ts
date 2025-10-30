import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../featurs/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  imports: [RouterLink , TranslatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) product: Product = {} as Product;
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  addProductItemToCart(id: string): void {
    this.cartService.addProductsToCart(id).subscribe({
      next: (res) => {
        console.log(res);

        this.cartService.countNumber.set(res.numOfCartItems);  
        console.log(this.cartService.countNumber);
        


        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
