import { Component, OnInit, isDevMode } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = false;
        if (isDevMode()) {
            console.log('Development!');
          } else {
            console.log('Production!');
          }
          console.log(environment.apiUrl);
    }
}
