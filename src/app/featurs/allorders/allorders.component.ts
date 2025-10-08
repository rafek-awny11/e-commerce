import { Order } from './../cart/models/order.interface';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart/services/cart.service';
import { CommonModule, } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { STORED_KEYS } from '../../core/constants/storedKeys';


@Component({
  selector: 'app-allorders',
  imports: [CommonModule,],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {
private readonly cartService = inject(CartService);
private readonly cookieService = inject(CookieService);


orderDetails: Order [] = [];

ngOnInit(): void {
 
  this.getAllOrders();
}



getUserId():string {
   return this.cookieService.get(STORED_KEYS.userId) || ''  
}

 getAllOrders(): void {
  
  this.cartService.getUserOrders(this.getUserId()).subscribe({
      next: (res) => {
        console.log('Raw data', res);
        this.orderDetails = Array.isArray(res) ? res : [];
       
        
     
        console.log('Orders after mapping', this.orderDetails);
        
    },
     error: (err) => {
      console.error('Error fetching orders:', err);
    }
  });
  
}




}
