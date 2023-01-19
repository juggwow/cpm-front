import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
    selector: 'app-picture-of-work',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        BreadcrumbModule,
        ImageModule,
        DialogModule,
        ButtonModule,
        FileUploadModule,
    ],
    templateUrl: './picture-of-work.component.html',
    styleUrls: ['./picture-of-work.component.scss'],
})
export class PictureOfWorkComponent {
    constructor(private primengConfig: PrimeNGConfig) {}

    activeItem: MenuItem | undefined;
    menuitems: MenuItem[] = [];

    displayModalDelete: boolean | undefined;
    displayModalUpload: boolean | undefined;

    ngOnInit() {
        this.primengConfig.ripple = true;

        // TODO getDataGallery

        this.menuitems = [
            { label: 'ตรวจสอบมาตรฐาน' },
            { label: 'จัดการตรวจนับ' },
            { label: 'พัสดุติดตั้งใหม่' },
            { label: 'ภาพงานทั้งหมด' },
        ];
    }

    items = [
        {
            id: '1',
            type: 'DDE',
            img: 'https://res.cloudinary.com/dk7xxtqnj/image/upload/v1661276882/ogtrz18mjymmedecfenb.jpg',
            detail: 'เสา ครอ. ขนาด 12 เมตร',
        },
        {
            id: '2',
            type: 'DDE',
            img: 'https://res.cloudinary.com/dk7xxtqnj/image/upload/v1649405352/vtgldp15qpndrxo2j6es.jpg',
            detail: 'เสา ครอ. ขนาด 12 เมตร',
        },
        {
            id: '3',
            type: 'DDE',
            img: 'https://res.cloudinary.com/dk7xxtqnj/image/upload/v1650446701/nfow9szalaaakwaocrvy.jpg',
            detail: 'เสา ครอ. ขนาด 12 เมตร',
        },
        {
            id: '4',
            type: 'DDE',
            img: 'https://res.cloudinary.com/dk7xxtqnj/image/upload/v1648797607/ikgvavpr9o7clue6aimh.jpg',
            detail: 'เสา ครอ. ขนาด 12 เมตร',
        },
        {
            id: '5',
            type: 'DDE',
            img: 'https://res.cloudinary.com/dk7xxtqnj/image/upload/v1645436472/h6qrdjajwmim5b9hbstu.jpg',
            detail: 'เสา ครอ. ขนาด 12 เมตร',
        },
    ];

    showModalConfirmDelete() {
        this.displayModalDelete = true;
    }

    showModalUploadImage() {
        this.displayModalUpload = true;
    }

    myUploader(evnet: any) {
        console.log('event upload file', evnet);
    }
}
