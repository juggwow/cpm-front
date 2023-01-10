import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadHomeComponent } from './components/rad-home/rad-home.component';

const routes: Routes = [
  { path: 'receive-and-damage', component: RadHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
