import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Constants } from '../constant/Constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = `${environment.basePath}${Constants.SERVICES_PATH.ACCOUNTS}login`; // Update to your backend URL
  // role: string = 'Admin';
  constructor(private http: HttpClient) {}

  login(username: string, password: string, role: string ): Observable<any> {
    const body = { username, password, role  };
    // "withCredentials: true" is crucial!
    return this.http.post<any>(this.apiUrl, body, { withCredentials: true });
  }
}
