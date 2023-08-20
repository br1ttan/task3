import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '@features/users';
import { ReposComponent } from './repos.component';
import { ReposRouting } from './repos.routing';

@NgModule({
  declarations: [
    ReposComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReposRouting
  ],
  providers: [
    UsersService
  ]
})
export class ReposModule { }
