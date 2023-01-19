import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SessionUtils } from '../utils/session.utils';

@Injectable()
export class LoginCallbackService {
    canActivate(route: ActivatedRouteSnapshot) {
        const token = SessionUtils.getToken();

        if (token || (!route.queryParams['token'] && !token)) {
            return true;
        }

        SessionUtils.setToken(route.queryParams['token']);

        return true;
    }
}
