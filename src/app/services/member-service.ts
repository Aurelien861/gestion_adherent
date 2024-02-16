import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ApiUrls} from "../shared/api-url";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getMembers(groupId: string): Observable<any> {
    const getAllMembersUrl = environment.apiHost + ApiUrls.members.getAll;
    let params = new HttpParams().set('groupId', groupId);
    return this.http.get<any>(getAllMembersUrl, {params: params});
  }

  login(email: string, password: string): Observable<any> {
    const loginUrl = environment.apiHost + ApiUrls.members.login;
    const body = JSON.stringify({email: email, password: password});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(loginUrl, body, {headers: headers});
  }

}
