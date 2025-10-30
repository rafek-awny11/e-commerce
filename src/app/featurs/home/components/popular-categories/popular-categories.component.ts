import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Category } from '../../../../core/models/product.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule , TranslatePipe ],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  categoriesList: Category[] = [];

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    rtl:true,
    margin: 10,
    navSpeed: 7000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1200: {
        items: 6
      },

    },
    nav: true
  }

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
