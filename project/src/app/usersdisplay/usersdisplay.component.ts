import { Component, OnInit, OnDestroy } from '@angular/core';
import {Contact} from '../contact';
import { Http, Response } from '@angular/http';
import { ContactService } from '../contact.service';
import {UserlistService} from'../userlist/userlist.service';
import {Router} from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

//import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-usersdisplay',
  templateUrl: './usersdisplay.component.html',
  styleUrls: ['./usersdisplay.component.css'],
  providers:[ContactService]
})
export class UsersDisplayComponent implements OnInit,OnDestroy {
  userlist: any[];
   dtOptions: DataTables.Settings = {};
  contacts: Contact[] = [];
  selectedContact: Contact
    
    dtTrigger: Subject<Contact> = new Subject();
  
    constructor(private http:Http,private userService:UserlistService, private router:Router, private contactService: ContactService) { }
  

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };
    this.userService.getUsers()
    .subscribe(persons => {
      this.contacts = persons;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }
  selectContact(contact: Contact) {
    this.selectedContact = contact
    console.log("este contacto",this.selectContact)
  }

  logoutUser(){
    localStorage.removeItem('TOKEN_NUMBER');
    localStorage.removeItem('ROLE_TYPE');
    this.router.navigate(['./login']);
  
  }
}
