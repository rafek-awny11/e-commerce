import { CartService } from './../../../featurs/cart/services/cart.service';
import { Component, computed, HostListener, inject, Input, OnInit, PLATFORM_ID,  Signal,  signal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
constructor(private flowbiteService: FlowbiteService) {}

private readonly authService = inject(AuthService);
private readonly cartService = inject(CartService);
private readonly id = inject(PLATFORM_ID);


isScrolling: boolean = false;

@Input({required:true}) isLogin!:boolean;
@HostListener('window:scroll',[])
onwindowScroll(){
  this.isScrolling = window.scrollY > 50;
}

count:Signal<number> = computed(() => this.cartService.countNumber());
  ngOnInit(): void {    
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    
    if (isPlatformBrowser(this.id)){
      this.getAllDataCart();

    }
  }

 
  getAllDataCart(): void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res) =>{
        this.cartService.countNumber.set(res.numOfCartItems);
      }
    })

  }

  signOut(): void{
    this.authService.logOut();
  }
}

