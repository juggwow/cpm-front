import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-report-pdf',
  standalone: true,
  templateUrl: './report-pdf.component.html',
  styleUrls: ['./report-pdf.component.scss'],
  providers: [ReportService]
})
export class ReportPdfComponent implements OnInit {

  fileId?: number;
  srcfile?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private r: ReportService
  ) { }

  ngOnInit(): void {
    this.srcfile = "";
    // console.log(this.route.snapshot)
    this.fileId = Number(this.route.snapshot.paramMap.get('id'));

    this.r.getFileAttachDownload(this.fileId).subscribe((response) => {
      // let file = new Blob([response], { type: 'application/pdf' });
      // var fileURL = URL.createObjectURL(file);
      // (window as Window).location = fileURL;
      // var theScript = document.createElement('script');
      // theScript.innerHTML = `window.onload = window.print();`;
      // document.body.appendChild(theScript);
      // this.blob2Base64(response).then(res => document.write("<object width='100%' height='100%' data='" + res + "'></object>"))
      // this.blob2Base64(response).then(res => document.write(`<a href='${res}' download="123.pdf">download</a>`))
      this.blob2Base64(response).then(res => this.downloadPDF(res,`${this.fileId}.pdf`))
    })
  }

  downloadPDF(pdfBase64: string, fileName: string) {
    const linkSource = pdfBase64;
    const downloadLink = document.createElement("a");
    // const fileName = "vct_illustration.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  blob2Base64 = (blob: Blob): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result!.toString());
      reader.onerror = error => reject(error);
    })
  }

}
