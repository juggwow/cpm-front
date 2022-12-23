import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRadComponent } from './components/page-rad/page-rad.component';

const routes: Routes = [
  {path: '', component: PageRadComponent},
  {path: 'rad', component: PageRadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
