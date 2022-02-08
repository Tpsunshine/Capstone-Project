import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {ILogin} from './loginforms.model'
import {Router} from '@angular/router'

@Injectable()

export class LoginFormPosterService {

    private url = 'https://infinite-everglades-58692.herokuapp.com/api/auth/login';
    private userInfo = 'https://infinite-everglades-58692.herokuapp.com/api/auth/userinfo';

    constructor(private http: HttpClient, private router:Router) {}


    loginUser(user): Observable<ILogin[]> {
        return this.http.post<ILogin[]>(this.url, user);
    }
    getUserInfo(token){
        localStorage.setItem('TOKEN_NUMBER', token);
        return this.http.get(this.userInfo,{headers:{'x-access-token':token}})
    }
    
}