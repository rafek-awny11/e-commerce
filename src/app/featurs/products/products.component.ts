import { NgxSpinnerService } from 'ngx-spinner';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products/products.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-products',
  imports: [CardComponent,  NgxPaginationModule , SearchPipe , FormsModule , TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
private readonly productsService = inject(ProductsService);
private readonly ngxSpinnerService = inject(NgxSpinnerService);



  productsList:WritableSignal<Product[]> = signal([])
  text:string ='';

  pageSize!:number
  p!:number
  total!:number


  ngOnInit(): void {
    this.getAllProductsData();
  }


  getAllProductsData(pageNumber: number = 1):void{
    


    this.productsService.getAllProducts(pageNumber).subscribe({
      next:(res)=>{
        console.log(res);
        this.productsList.set(res.data);  

        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;

       
      },
      error:(err)=>{
        console.log(err);
       
      }
    })
  }

}


