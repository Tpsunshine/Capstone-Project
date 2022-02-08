import { Component, Input } from '@angular/core';
import { Contact } from '../contact';
import {UserlistService} from '../userlist/userlist.service';
import { HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'
import { Observable} from 'rxjs';
import {Role} from './../role';
import {Gender} from './../gender';
import {Type} from './../typeofuser';
@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
 
export class ContactDetailsComponent {
  @Input()
  contact: Contact;
 contacto="";
  

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;
  private userurl = 'https://infinite-everglades-58692.herokuapp.com/api/auth/users';
  private editurl = 'https://infinite-everglades-58692.herokuapp.com/api/auth/edituser';


    

  constructor (private contactService: UserlistService, private http: HttpClient, private router:Router) {}
  selectedGender:Gender = new Gender('1', 'Male');
  gender = [
     new Gender('1', 'Male' ),
     new Gender('2', 'Female' ),
     new Gender('3', 'Other' )
  ];

  selectedType:Type = new Type('3', 'student');
  type = [
     new Type('1', 'admin' ),
     new Type('2', 'teacher' ),
     new Type('3', 'student' )
  ];

  selectedRole:Role = new Role('2', 'user');
  role = [
     new Role('1', 'admin' ),
     new Role('2', 'teacher' ),
     new Role('3', 'user' ),
  ];
  onSelectGender(genderId) { 
    this.selectedGender = null;
    for (var i = 0; i < this.gender.length; i++)
    {
      if (this.gender[i].id == genderId) {
        this.selectedGender = this.gender[i];
        this.contact.gender = this.gender[i].name;
      }
    }
}
onSelectType(typeId) { 
  this.selectedType = null;
  for (var i = 0; i < this.type.length; i++)
  {
    if (this.type[i].id == typeId) {
      this.selectedType = this.type[i];
      this.contact.type = this.type[i].name;
    }
  }
}
onSelectRole(roleId) { 
  this.selectedRole = null;
  for (var i = 0; i < this.role.length; i++)
  {
    if (this.role[i].id == roleId) {
      this.selectedRole= this.role[i];
      this.contact.role = this.role[i].name;
    }
  }
}
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
      console.log("email  ",contact.email);
    console.log("gender  ",contact.gender);
    this.contactService.updateContact(contact).then((updatedContact: Contact) => {
      this.updateContact(updatedContact);
      window.location.reload();
      //this.router.navigate(['/admin']);
    });
    
    
  }

  deleteContact(contactId: Contact): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: Contact) => {
      this.deleteContact(deletedContactId);
    });
    
  }
}
