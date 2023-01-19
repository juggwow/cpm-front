import { Component } from '@angular/core';
import {
    EditJobAreaBody,
    JobArea,
    JobAreaType,
} from '../../models/job-area.model';
import { MenuItem } from 'primeng/api';
import { JobAreaService } from '../../services/job-area-list.service';
import { PageOption } from 'src/app/models/response-page.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

import { take } from 'rxjs';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CMDC_Job } from 'src/app/models/cmdc-job.model';

@Component({
    providers: [JobAreaService],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        CardModule,
        TabMenuModule,
        BreadcrumbModule,
        PaginatorModule,
        DialogModule,
        DropdownModule,
        InputTextareaModule,
    ],
    selector: 'app-status-of-job',
    templateUrl: './job-area-list.component.html',
    styleUrls: ['./job-area-list.component.scss'],
})
export class JobAreaComponent {
    jobAreaTypes: JobAreaType[] = [];
    jobAreaType: JobAreaType | null = null;

    jobsDetail: CMDC_Job | null = null;

    areaSeq: number | null = null;
    areaSeqList: number[] = [];
    detail: string = '';

    jobAreaList: JobArea[] = [];

    constructor(
        private jobAreaService: JobAreaService,
        private route: ActivatedRoute,
        private primengConfig: PrimeNGConfig,
        private router: Router
    ) {}

    first = 0;
    rows = 10;
    totalRecords = 10;

    items: MenuItem[] = [];

    scrollableItems: MenuItem[] = [];

    activeItem: MenuItem | undefined;

    activeItem2: MenuItem | undefined;

    menuitems: MenuItem[] = [];

    editDialogShow: boolean = false;
    dialogTitle = '';
    editJobAreaId = 0;

    ngOnInit() {
        this.primengConfig.ripple = true;

        const page = this.first / this.rows + 1;
        this.getTableData({ page: page, limit: this.rows });
        this.getJobAreaTypes();
        this.getCMDC_Job();

        this.items = [
            { label: 'พัสดุติดตั้งใหม่' },
            { label: 'พัสดุรื้อถอน' },
            { label: 'ภาพรวม' },
        ];

        this.menuitems = [
            { label: 'ตรวจสอบมาตรฐาน' },
            { label: 'จัดการตรวจนับ' },
            { label: 'พัสดุติดตั้งใหม่' },
        ];

        this.scrollableItems = Array.from({ length: 50 }, (_, i) => ({
            label: `Tab ${i + 1}`,
        }));

        this.activeItem = this.items[0];

        this.activeItem2 = this.scrollableItems[0];
    }

    showModalDialog(event: MouseEvent, jobArea?: JobArea) {
        event.stopImmediatePropagation();
        this.editDialogShow = true;
        let total = this.totalRecords;

        if (jobArea) {
            this.dialogTitle = `แก้ไขรายละเอียดพื้นที่ตรวจนับ | พื้นที่ ${jobArea.areaSeq}`;
            this.jobAreaType =
                this.jobAreaTypes.find(
                    (value) => value.id === jobArea.jobAreaTypeId
                ) || null;
            this.areaSeq = jobArea.areaSeq;
            this.detail = jobArea.detail;
            this.editJobAreaId = jobArea.id;
        } else {
            this.dialogTitle = 'เพิ่มเสา / พื้นที่ตรวจนนับ';
            total += 1;
            this.jobAreaType = null;
            this.areaSeq = total;
            this.detail = '';
            this.editJobAreaId = 0;
        }

        this.areaSeqList = [];
        for (let i = 1; i <= total; i++) {
            this.areaSeqList.push(i);
        }
    }

    getTableData(option: PageOption): void {
        const jobId = this.route.snapshot.params['id'];
        this.jobAreaService
            .getJobArea$(jobId, option)
            .pipe(take(1))
            .subscribe((res) => {
                this.jobAreaList = res.data;
                this.totalRecords = res.total;
            });
    }

    getJobAreaTypes() {
        this.jobAreaService
            .getJobAreaType$()
            .pipe(take(1))
            .subscribe((res) => {
                this.jobAreaTypes = res;
            });
    }

    getCMDC_Job() {
        const jobId = this.route.snapshot.params['id'];
        this.jobAreaService
            .getCMDC_Job$(jobId)
            .pipe(take(1))
            .subscribe((res) => {
                this.jobsDetail = res;
            });
    }

    createTableData(JobId: number, body: EditJobAreaBody) {
        this.jobAreaService
            .createJobArea$(JobId, body)
            .pipe(take(1))
            .subscribe(() => {
                const page = this.first / this.rows + 1;
                this.getTableData({ page: page, limit: this.rows });
            });
    }

    editTableData(jobId: number, jobAreaId: number, body: EditJobAreaBody) {
        this.jobAreaService
            .editJobArea$(jobId, jobAreaId, body)
            .pipe(take(1))
            .subscribe(() => {
                const page = this.first / this.rows + 1;
                this.getTableData({ page: page, limit: this.rows });
            });
    }

    deleteJobArea() {
        const jobId = this.route.snapshot.params['id'];
        this.jobAreaService
            .deleteJobArea$(jobId, this.editJobAreaId)
            .pipe(take(1))
            .subscribe(() => {
                const page = this.first / this.rows + 1;
                this.getTableData({ page: page, limit: this.rows });
                this.editDialogShow = false;
            });
    }

    submitJobArea() {
        if (!this.jobAreaType || !this.areaSeq) {
            return;
        }
        let body: EditJobAreaBody = {
            areaSeq: this.areaSeq,
            detail: this.detail,
            jobAreaTypeID: this.jobAreaType?.id,
        };

        const jobId = this.route.snapshot.params['id'];
        if (this.editJobAreaId) {
            this.editTableData(jobId, this.editJobAreaId, body);

            this.editDialogShow = false;
        } else {
            this.createTableData(jobId, body);

            this.editDialogShow = false;
        }
    }

    routesToDetail(jobAreaId: number) {
        this.router.navigate([`/jobs/daily/${jobAreaId}`]);
    }

    paginate(event: {
        page: number;
        first: number;
        rows: number;
        pageCount: number;
    }) {
        this.first = event.first;
        this.rows = event.rows;
        const page = event.first / event.rows + 1;
        this.getTableData({ page: page, limit: event.rows });
    }
}
