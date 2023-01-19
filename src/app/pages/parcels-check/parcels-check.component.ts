import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-parcels-check',
    standalone: true,
    imports: [CommonModule, ButtonModule, FormsModule, CardModule, TableModule],
    templateUrl: './parcels-check.component.html',
    styleUrls: ['./parcels-check.component.scss'],
})
export class ParcelsCheckComponent {
    parcels = [
        {
            no: 1,
            department: 'แผนกแรงสูง (ลงทุน)',
            detail: 'สายอลูมิเนียมแกนเหล็ก 50/8 ต.มม.',
            quantity: 22,
            installQuantity: 2000,
            diff: 100,
        },
        {
            no: 2,
            department: 'แผนกแรงสูง (ลงทุน)',
            detail: 'เหล็กประกับไม้คอน ขนาด 30x6 มม. ยาว 760 มม.',
            quantity: 22,
            installQuantity: 2000,
            diff: 100,
        },
        {
            no: 1,
            department: 'หม้อแปลง ภายใน',
            detail: 'สายอลูมิเนียมแกนเหล็ก 50/8 ต.มม.',
            quantity: 22,
            installQuantity: 2000,
            diff: 100,
        },
        {
            no: 2,
            department: 'หม้อแปลง ภายใน',
            detail: 'ฮอทไลน์แคล้มป์ สำหรับสายเมนอลูมิเนียม 35-70...',
            quantity: 22,
            installQuantity: 2000,
            diff: 100,
        },
    ];

    // [Optional]: use for iterating headers
    parcelQuantityHeaders = Array(12);
}
