import { Component } from '@angular/core';
import { ListDocument } from 'src/app/models/doc.model';
import { ListDocumentService } from 'src/app/services/rad-listofdoc';
import { ConfirmationService, MenuItem, SortEvent } from 'primeng/api';
import { take } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import {TableModule,} from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import {ContextMenuModule} from 'primeng/contextmenu';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {DialogModule} from 'primeng/dialog';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  standalone:true,
  providers: [ListDocumentService,ConfirmationService],
  imports:[ConfirmDialogModule,TableModule,InputTextModule,ButtonModule,SplitButtonModule,RippleModule,RouterModule,BadgeModule,ContextMenuModule,PdfViewerModule,DialogModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  is_preview: boolean = false;



  items: MenuItem[] = [];
  ListDocument: ListDocument[] = [];
  first = 0
  rows = 10
  loading: boolean = true;
  queryParams:any = {

  }




  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  



  constructor(
    private confirmationService: ConfirmationService,
    private ListDocumentService: ListDocumentService,
    private router:Router
    

    ) {}

  ngOnInit(): void {
    this.fetchAllData()
    this.items = [
      {label: 'แก้ไข', icon: 'pi pi-pencil', command: () => {
        this.router.navigate(['/form']);
      },
    },
      {label: 'Preview เอกสาร ', icon: 'pi pi-eye', command: () => {
        this.showPreview();
      },
    },
      {label: 'ลบเอกสาร', icon: 'pi pi-trash', command:()=>{
        this.confirmDelete()
      }
    },
   
  ];
   

  
  }



  confirmDelete() {
    this.confirmationService.confirm({
        message: 'เลือก ตกลง เพื่อลบ หรือ ย้อนกลับ เพื่อกลับไปหน้าเดิม',
        header:"คุณต้องการลบรายการนี้หรือไม่”",
        acceptLabel:"ตกลง",
        rejectLabel:"ยกเลิก",
        accept: () => {
            console.log("delete...")
        }
    });
}


  showPreview() {
    this.is_preview = true;
}

  onSortColumn(event:SortEvent){
    let order = (event.order == 1) ? "asc" : "desc"
    this.queryParams["s"+event.field!] = order;
    this.fetchDataWhenSortOrFilter()
}

onFilterColumn(key:string,event:Event){
  let filterValue = (event.target as HTMLInputElement).value;

  if (filterValue == ""){
    delete this.queryParams[key]
  }else{
    this.queryParams[key] = filterValue;
  }

  this.fetchDataWhenSortOrFilter()
}



fetchAllData(){
  this.loading = true;
  this.ListDocumentService
  .getListOfDoc$().pipe(take(1))
  .subscribe((res) => {
      this.ListDocument = res.doc;
      console.log('xx',res)
      this.loading = false;
  });
}


fetchDataWhenSortOrFilter(){
  this.loading = true;
  const params = new HttpParams({fromObject: this.queryParams})
  this.ListDocumentService.getSortOrFilterListOfDoc$(params)
  .subscribe((res) =>{
    this.ListDocument = res.data;
    this.loading = false;
  })
}



onClearFilter(key:string) {
  console.log("clear",key)
}





}
