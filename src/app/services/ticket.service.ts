import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Ticket } from '../model/ticket.model';
import { HELPDESK_API } from './helpdesk.api';

@Injectable()
export class TicketService {

  constructor(private http: HttpClient) { }

  createOrUpdate(ticket: Ticket) {
    if (ticket.id != null && ticket.id != '') {
      return this.http.put(`${HELPDESK_API}/api/ticket`, ticket);
    } else {
      ticket.id = null;
      return this.http.post(`${HELPDESK_API}/api/ticket`, ticket);
    }
  }

  findAll(page: number, count: number) {
    return this.http.get(`${HELPDESK_API}/api/ticket/${page}/ ${count}`);
  }

  finndById(id: string) {
    return this.http.get(`${HELPDESK_API}/api/ticket/${id}`);
  }
  
  delete(id: string) {
    return this.http.delete(`${HELPDESK_API}/api/ticket/${id}`);
  }
  
  findByParams(page: number, count: number, assignedToMe: boolean, t: Ticket) {
    t.number = t.number == null ? 0 : t.number;
    t.title = t.title == '' ? 'uninformed' : t.title;
    t.status = t.status == '' ? 'uninformed' : t.status;
    t.priority = t.priority == '' ? 'uninformed' : t.priority;
    return this.http.get(`${HELPDESK_API}/api/ticket/${page}/ ${count}/ ${t.number}/ ${t.title}/ ${t.status}/ ${t.priority}/ ${assignedToMe}`);
  }
  
  changeTicketStatus(status:string, ticket:Ticket){
    return this.http.put(`${HELPDESK_API}/api/ticket/${ticket.id}/${status}`, ticket);
  }
  
  
  sumarry(){
    return this.http.get(`${HELPDESK_API}/api/ticket/summary`);
  }

}
