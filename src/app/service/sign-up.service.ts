import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SignUpService {
    readonly url = 'https://demo-api.now.sh/users';

    constructor(private http: HttpClient) {}

    signUp(signUp: User): Observable<User[]> {
        return this.http.post<User[]>(this.url, signUp);
    }
}
