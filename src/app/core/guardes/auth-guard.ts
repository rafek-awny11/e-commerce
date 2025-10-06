import { STORED_KEYS } from './../constants/storedKeys';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';


export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const authService = inject(AuthService);
   const platform = inject(PLATFORM_ID);




//  if (!isPlatformBrowser(platform)) {
//     return router.parseUrl('/login');
//   }

//   const token = cookieService.get('token');
//   if (!token) {
//     return router.parseUrl('/login'); // يمنع الدخول بدون توكن
//   }

//   try {
//     const userData = jwtDecode(token) as { id: string };
//     if (!userData.id) throw new Error('User ID missing in token');
//     // لو عايز تخزن في كوكيز:
//     cookieService.set(STORED_KEYS.userId, userData.id);
//     return true;
//   } catch (error) {
//     console.error('Invalid token', error);
//     authService.logOut();
//     return router.parseUrl('/login');
//   }
// };



 if (isPlatformBrowser(platform)){
  const token = cookieService.get("token");

  if (token){
    jwtDecode(token);
    try{
      const userData = jwtDecode(token) as {id:string};
      cookieService.set(STORED_KEYS.userId,userData.id);
    }catch{
      authService.logOut();
    }
  }
 
return true;
 } else {
     return router.parseUrl('/login'); 
    }

  };



  // if (cookieService.get('token')){
  //   return true;
  // } else {
  //    return router.parseUrl('/login'); 
  //   }

