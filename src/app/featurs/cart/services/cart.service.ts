import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  countNumber: WritableSignal<number> = signal(0); 
  private myHeaders(): object  {
    return{
      headers: {
      token: this.cookieService.get('token'),
    },
    };
    
  }

  addProductsToCart(id:string): Observable<any> {
    
     return this.httpClient.post(
      environment.baseUrl + 'cart',
      {
         productId: id
         
      },
      this.myHeaders()
     
    );
    
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart', this.myHeaders());
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(
      environment.baseUrl + `cart/${id}`,
      this.myHeaders()
    );
  }

  clearCart(): Observable<any>{
    return this.httpClient.delete<{message : string }>(environment.baseUrl + 'cart' );

  }

  updateCartCount(id:string , count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `cart/${id}`,
      {
      count: count,
    },
    this.myHeaders()
  );

  }

  checkOutSession(id:string | null , data:object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/checkout-session/${id}?url=http://localhost:4200` , data , this.myHeaders());
  }
  cashPayment(id:string | null , data:object ):Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/${id}` , data );
 }
 
getUserOrders(userId:string): Observable<any> {
  return this.httpClient.get(
    environment.baseUrl + `orders/user/${userId}` + userId,
    this.myHeaders()
  );
} 
}
