import { authGuard } from './core/guardes/auth-guard';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { register } from 'module';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './featurs/home/home.component';
import { CartComponent } from './featurs/cart/cart.component';
import { ProductsComponent } from './featurs/products/products.component';
import { BrandsComponent } from './featurs/brands/brands.component';
import { CategoriesComponent } from './featurs/categories/categories.component';
import { DetailsComponent } from './featurs/details/details.component';
import { CheckoutComponent } from './featurs/checkout/checkout.component';
import { NotfoundComponent } from './featurs/notfound/notfound.component';
import { isLoggedGuard } from './core/guardes/is-logged-guard';
import { AllordersComponent } from './featurs/allorders/allorders.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path: '' , component: AuthLayoutComponent , canActivate:[isLoggedGuard], children:[
        {path: 'login' , loadComponent:()=>import('./core/auth/login//login.component').then((c)=>c.LoginComponent), title:"Login Page"},
        {path: 'register' , loadComponent:()=>import('./core/auth/register/register.component').then((c)=>c.RegisterComponent) , title: "Register Page"},
         {path: 'forgot' , loadComponent:()=>import('./shared/components/forgot-password/forgot-password.component').then((c)=>c.ForgotPasswordComponent) , title: "Forgot Page"}

    ]},
    {path: '', component: BlankLayoutComponent , canActivate:[authGuard], children:[
        {path:'home', loadComponent:()=>import('./featurs/home/home.component').then((c)=>c.HomeComponent), title:"Home Page"},
        {path: 'cart', loadComponent:()=>import('./featurs/cart/cart.component').then((c)=>c.CartComponent) , title:"Cart Page"},
        {path: 'products', loadComponent:()=>import('./featurs/products/products.component').then((c)=>c.ProductsComponent) , title:"Products Page"},
        {path: 'brands' , loadComponent:()=>import('./featurs/brands/brands.component').then((c)=>c.BrandsComponent), title:"Brands Page"},
        {path: 'categories', loadComponent:()=>import('./featurs/categories/categories.component').then((c)=>c.CategoriesComponent), title:"Categories Page"},
         {path: 'allorders', loadComponent:()=>import('./featurs/allorders/allorders.component').then((c)=>c.AllordersComponent), title:"AllOrders Page"},
        {path:'details/:slug/:id', loadComponent:()=>import('./featurs/details//details.component').then((c)=>c.DetailsComponent), title:"Details Page"},
        {path:'details/:id', loadComponent:()=>import('./featurs/details//details.component').then((c)=>c.DetailsComponent), title:"Details Page"},
        {path: 'checkout/:id', component:CheckoutComponent, title:"Checkout Page"},
        

    ]},
    {path:'**', component: NotfoundComponent, title:"NotFound Page"},
];
