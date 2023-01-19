import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ActivatedRoute } from '@angular/router';
import { map, of } from 'rxjs';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-job-area-daily-detail',
    standalone: true,
    imports: [
        CommonModule,
        CheckboxModule,
        ButtonModule,
        BreadcrumbModule,
        CardModule,
        CarouselModule,
        FormsModule,
        InputNumberModule,
        TableModule,
    ],
    templateUrl: './job-area-daily-detail.component.html',
    styleUrls: ['./job-area-daily-detail.component.scss'],
})
export class JobAreaDailyDetailComponent {
    jobId$ = this.activatedRoute.params.pipe(map((params) => params['id']));

    breadcumbItems$ = this.jobId$.pipe(
        map((jobId) => [
            { label: 'ตรวจสอบมาตรฐาน', routerLink: [`/jobs/${jobId}`] },
            { label: 'ตรวจนับพัสดุอุปกรณ์' },
        ])
    );

    jobAreaCarouselItems$ = of([
        {
            areaSeq: 1,
            areaType: 'DDE',
        },
        {
            areaSeq: 2,
            areaType: 'SP',
        },
        {
            areaSeq: 3,
            areaType: 'DDE',
        },
        {
            areaSeq: 4,
            areaType: 'CCB',
        },
        {
            areaSeq: 5,
            areaType: 'CCB',
        },
        {
            areaSeq: 6,
            areaType: 'CCB',
        },
        {
            areaSeq: 7,
            areaType: 'BA',
        },
    ]);

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

    constructor(private activatedRoute: ActivatedRoute) {}

    mapJobAreaImage(jobAreaType: string) {
        return `assets/img/job_area_type/${jobAreaType}.png`;
    }

    showExpandedText(expanded: boolean, text: string) {
        return expanded ? text : '';
    }
}
