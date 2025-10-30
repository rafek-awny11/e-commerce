import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class MyTranslateService {

  private readonly renderer2 = inject (RendererFactory2).createRenderer(null, null);
  constructor(private translateService:TranslateService , @Inject(PLATFORM_ID) private id:object) {
   if( isPlatformBrowser(this.id)){
     //1- set default lang 
    this.translateService.setDefaultLang('en');
    //2- get lang local
    const savedLang = localStorage.getItem('lang');
    //3- use lang
    if(savedLang){
      this.translateService.use(savedLang !)

    } 

   }
  }

  changeDirection(): void{
    if( localStorage.getItem('lang')=== 'en'){
      this.renderer2.setAttribute(document.documentElement, 'dir' , 'ltr')
      this.renderer2.setAttribute(document.documentElement, 'lang', 'en')

    }
    else if (localStorage.getItem('lang')=== 'ar' ){
      this.renderer2.setAttribute(document.documentElement, 'dir' , 'rtl')
      this.renderer2.setAttribute(document.documentElement, 'lang' , 'ar')
    }
  }
  

  changeLangTranslate(lang:string):void{
    localStorage.setItem('lang' , lang),
    this.translateService.use(lang),

    this.changeDirection()

  }
}
