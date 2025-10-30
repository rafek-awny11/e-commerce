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




  // if (!isPlatformBrowser(platform)) {
  //   return true;
  // }

  // const token = cookieService.get('token');

  // // ⛔ لو مفيش توكن، نرجّع المستخدم للـ login
  // if (!token) {
  //   return router.parseUrl('/login');
  // }

  // try {
  //   // ✅ فك التوكن وتخزين userId
  //   const userData = jwtDecode(token) as { id: string };
  //   if (userData?.id) {
  //     cookieService.set(STORED_KEYS.userId, userData.id);
  //     return true;
  //   } else {
  //     throw new Error('Invalid token');
  //   }
  // } catch (error) {
  //   console.error('Invalid or expired token', error);
  //   authService.logOut();
  //   return router.parseUrl('/login');
  // }
// };