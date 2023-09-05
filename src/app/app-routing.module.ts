import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'**', component: NopageFoundComponent}
]

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
