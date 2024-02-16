import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ApiUrls} from "../shared/api-url";
import {Member} from "../models/member.model";
import {AddressService} from "./adress-service";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient,
              private addressService: AddressService) { }

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

  signIn(member: Member): Observable<any> {
    const signInUrl = environment.apiHost + ApiUrls.members.inscription;
    const body = JSON.stringify({
      id: 'aupif',
      nom: member.name,
      prenom: member.firstname,
      adresse: this.addressService.addressToString(member.address),
      typeMembre: member.memberType,
      idGroupe: member.groupId,
      idCommande: '',
      email: member.email,
      password: member.password
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(signInUrl, body, {headers: headers});
  }


}
