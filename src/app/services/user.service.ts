import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class UserService {
    private userInfo$ = new BehaviorSubject<Employee>({
        employeeId: '',
    } as Employee);
    constructor(private http: HttpClient) {
    }

    // setUserInfo(token: string): Observable<Employee | null> {
    //     window.sessionStorage.setItem('token', token);
    //     const userInfo = jwt_decode<Employee>(token);
    //     window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    //     this.userInfo$.next(userInfo);
    //     return this.getUserInfo();
    // }

    getUserInfo$(): Observable<Employee> {
        return this.http.get<Employee>(`${environment.apiUrl}/employees/me`);
    }

    getCurrentUser$() {
        return this.http.get<Employee>(`${environment.apiUrl}/employees/me`);
    }

    logout(): Observable<{ redirect: string }> {
        const token = window.sessionStorage.getItem('token');
        return this.http.get<{ redirect: string }>(
            `${environment.authApiUrl}/logout/${token}`
        );
    }
}
