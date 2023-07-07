import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [CardModule]
})


export class CardComponent {
  @Input() title!: string;
  @Input() bgcolor: string = "#E9E9E9"; //#7718bc
  @Input() textcolor: string = "#454545";
  @Input() display: string = "flex";
  @Input() amount1: number = 0;
  @Input() amount2: number = 0;
  @Input() amount3: number = 0;
  @Input() detail1!: string;
  @Input() detail2!: string;
  @Input() icon1!: string;
  @Input() icon2!: string ;

  active: boolean = true;

}
