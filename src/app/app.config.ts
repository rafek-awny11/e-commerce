import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay() ),
    provideHttpClient(withFetch() , withInterceptors([headersInterceptor , errorInterceptor , loadingInterceptor]) ),
    provideAnimations(),
    importProvidersFrom(CookieService , NgxSpinnerModule),
    provideToastr({
      preventDuplicates:true,
    }
    ),
    


  ]
};
