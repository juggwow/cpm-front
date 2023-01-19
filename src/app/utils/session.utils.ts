export class SessionUtils {
    static getToken() {
        return window.sessionStorage.getItem('token');
    }

    static setToken(token: string) {
        window.sessionStorage.setItem('token', token);
    }

    static clearSession() {
        window.sessionStorage.clear();
    }
}
