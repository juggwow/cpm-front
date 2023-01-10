// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  role: string;

  constructor(/*private http: HttpClient*/) {
    // Initialize the role variable with a default value
    this.role = 'guest';
  }

  // Method for setting the role
  setRole(role: string) {
    this.role = role;
  }

  // Method for checking if the user is an admin
  isAdmin() {
    return this.role === 'admin';
  }

  // Method for checking if the user is a regular user
  isUser() {
    return this.role === 'user';
  }

  isGuest() {
    return this.role === 'guest';
  }

  // Use HttpClient ^^

  // getRole() {
  //   // Make HTTP request to API to retrieve role
  //   this.http.get<{role: string}>('/api/user/role').subscribe(data => {
  //     this.role = data.role;
  //   });
  //   return this.role;
  // }
}
