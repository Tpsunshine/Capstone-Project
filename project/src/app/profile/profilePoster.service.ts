import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable,  BehaviorSubject} from 'rxjs';

@Injectable()

export class ProfileFormPosterService {

    private userInfo = 'https://infinite-everglades-58692.herokuapp.com/api/auth/userinfo';
    
    constructor(private http: HttpClient) {}

    getUserInfo(token){
        localStorage.setItem('TOKEN_NUMBER', token);
        return this.http.get(this.userInfo,{headers:{'x-access-token':token}})
    }



}