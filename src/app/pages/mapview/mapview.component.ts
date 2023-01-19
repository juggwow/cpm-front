import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';

@Component({
    selector: 'app-mapview',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        CardModule,
        CarouselModule,
    ],
    templateUrl: './mapview.component.html',
    styleUrls: ['./mapview.component.scss'],
})
export class MapviewComponent {
    responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    carouselItems = [
        { label: 'test', img: 'assets/images/coffee.jpg' },
        { label: 'test', img: 'assets/images/coffee.jpg' },
    ];
}
