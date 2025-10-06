import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { timer } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent , NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');

  private readonly ngxSpinnerService = inject(NgxSpinnerService); 


  ngOnInit(): void {
   
    this.ngxSpinnerService.show()

    timer(1500).subscribe(() =>{
      this.ngxSpinnerService.hide();
    })
  }

 
}

