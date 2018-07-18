import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { HELPDESK_API } from './helpdesk.api';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  login(user:User){
    return this.http.post(`${HELPDESK_API}/api/auth`, user);
  }

  createOrUpdate(user:User){
    if(user.id != null && user.id != ''){
      return this.http.put(`${HELPDESK_API}/api/user`, user);
    } else {
      user.id = null;
      return this.http.post(`${HELPDESK_API}/api/user`, user);
    }
  }
  
  findAll(page:number, count: number){
    return this.http.get(`${HELPDESK_API}/api/user/${page}/ ${count}`);
  }
  
  finndById(id: string){
    return this.http.get(`${HELPDESK_API}/api/user/${id}`);
  }  
  
  delete(id:string){
    return this.http.delete(`${HELPDESK_API}/api/user/${id}`);
  }
}
