import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../cart/models/cart.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
private readonly categoriesService = inject(CategoriesService);

  categoriesList: Category[] = [];


  ngOnInit(): void {
    this.getAllCategoriesData();
  }
  getAllCategoriesData():void {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res); [{}, {} , {}]

        this.categoriesList = res.data;
        
      },
      error:(err)=>{
        console.log(err);
        
      },
    })
  }

}

