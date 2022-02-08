import { Component, Input } from '@angular/core';
import { Contact } from '../contact';
import {UserlistService} from '../userlist/userlist.service';
import { HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'
import { Observable} from 'rxjs';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./../all.component.css']
})

export class ContactDetailsComponent {
  @Input()
  contact: Contact;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;
  private userurl = 'http://localhost:5000/api/auth/users';
  private editurl = 'http://localhost:5000/api/auth/edituser';


    

  constructor (private contactService: UserlistService, private http: HttpClient, private router:Router) {}

  createContact(contact: Contact) {
    this.contactService.createContact(contact).then((newContact: Contact) => {
      this.createHandler(newContact);
    });
    
  }
 // updateContact(_id: string,contact:Contact): Observable<Object> {
 //   console.log("contact id ",`${contact}`)
 //       console.log("id: `${_id}`",_id["_id"], "url: ", this.editurl+"/"+_id["_id"]);
//
 //   return this.http.put(`${this.editurl}`, _id);
 // }
  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact).then((updatedContact: Contact) => {
      this.updateHandler(updatedContact);
    });
    
    
  }

  deleteContact(contactId: Contact): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: Contact) => {
      this.deleteHandler(deletedContactId);
    });
    
  }
}
