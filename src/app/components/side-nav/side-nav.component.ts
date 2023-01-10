import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(public userService: UserService) {
    // Set the user's role to 'admin'
    this.userService.setRole('admin');
  }

  ngOnInit(): void {
  }

}
