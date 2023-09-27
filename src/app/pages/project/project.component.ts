import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  imports: [
    CardModule
  ],
})
export class ProjectComponent {
  test = "test"

}
