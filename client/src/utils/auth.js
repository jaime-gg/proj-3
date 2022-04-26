import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        // CHECKS IF THERE IS A SAVED TOKEN AND IT'S STILL VALID
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
                if (decoded.exp < Date.now() / 1000) {
                    return true;
                } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // RETRIEVES THE USER TOKEN FROM LOCAL-STORAGE
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        // SAVES USER TOKEN TO LOCAL-STORAGE
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        // CLEAR USER TOKEN AND PROFILE DATA FROM LOCAL-STORAGE
        localStorage.removeItem('id_token');
        // THIS WILL RELOAD THE PAGE AND RESET THE STATE OF THE APPLICATION
        window.location.assign('/');
    }
}

export default new AuthService();
