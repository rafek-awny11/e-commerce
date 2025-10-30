import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent, TranslatePipe],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit {
private readonly productsService = inject(ProductsService);

  productsList:Product[] = [];

  ngOnInit(): void {
    this.getAllProductsData();
  }


  getAllProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res);

        this.productsList = res.data


        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
