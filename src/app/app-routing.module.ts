import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadFormComponent } from './components/rad-form/rad-form.component';
import { RadHomeComponent } from './components/rad-home/rad-home.component';

const routes: Routes = [
  { path: 'receive-and-damage', component: RadHomeComponent },
  { path: 'form', component: RadFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
