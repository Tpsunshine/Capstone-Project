import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {IRegister} from './register-forms.model'

@Injectable()

export class RegisterFormPosterService {

    private url = 'https://infinite-everglades-58692.herokuapp.com/api/auth/register';

    constructor(private http: HttpClient) {}

    registerUser(user): Observable<IRegister[]> {
        return this.http.post<IRegister[]>(this.url, user);
    }

}