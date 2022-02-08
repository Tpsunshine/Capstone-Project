import { Component, OnInit, OnDestroy } from '@angular/core';
import {Contact} from './../contact';
import { Http, Response } from '@angular/http';
import { ContactService } from './../contact.service';
import {UserlistService} from'./../userlist/userlist.service';
import {Router} from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

import { map} from 'rxjs/operators';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
  providers:[ContactService]
})
export class TeachersComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  userlist: any[];
  contacts: Contact[];
    selectedContact: Contact;
    //dtTrigger: Subject<any> = new Subject();
  
    constructor(private http:HttpClient,private userService:UserlistService, private router:Router, private contactService: ContactService) { }
  

  ngOnInit(): void {
    const that = this;
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 2, 
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'https://infinite-everglades-58692.herokuapp.com',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.contacts = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'firstname' }, { data: 'lastname' },{data:'email'},{ data: 'type' }, { data: 'role' }]
    };


    


    this.userService.getUsers()
        .subscribe((res) => this.userlist = res);
    console.log("this user list", this.userlist);
    this.contactService
    .getContacts()
    .then((contacts: Contact[]) => {
      this.contacts = contacts.map((contact) => {
        if (!contact.mobile) {
          contact.mobile = ""
        }
     
        console.log("contacts", this.contacts);
        return contact;
      });
    });
  }

}
