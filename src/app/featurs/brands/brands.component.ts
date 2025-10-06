import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';

import { Brands } from '../../core/models/brands.interface';


@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
private readonly brandsService = inject(BrandsService);

brandesList:WritableSignal<Brands[]> = signal([]);


ngOnInit(): void {
  this.getAllBrandesData();
}

getAllBrandesData(): void {
  this.brandsService.getAllBrands().subscribe({
    next:(res) =>{
      console.log(res.data);
      this.brandesList.set(res.data);
    },
    error:(err) =>{
      console.log(err);
      
    }
  })

}
}
