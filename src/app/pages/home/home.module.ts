import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '@features/users';
import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRouting,
  ],
  providers: [
    UsersService
  ]
})
export class HomeModule { }
