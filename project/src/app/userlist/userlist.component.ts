import { Component, OnInit } from '@angular/core';
import {UserlistService} from'./userlist.service';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  providers:[ContactService]
})
export class UserlistComponent implements OnInit {
userlist: any[];
contacts: Contact[]
  selectedContact: Contact

  constructor(private userService:UserlistService, private router:Router, private contactService: ContactService) { }

  ngOnInit(){
    
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
logout(){
  localStorage.removeItem('TOKEN_NUMBER');
  localStorage.removeItem('ROLE_TYPE');
  this.router.navigate(['./login']);

}

Back():void{
  this.router.navigate(['./profile']);

}
private getIndexOfContact = (contactId: String) => {
  return this.contacts.findIndex((contact) => {
    return contact._id === contactId;
  });
}

selectContact(contact: Contact) {
  this.selectedContact = contact
  console.log(this.selectContact)
}

createNewContact() {
  var contact: Contact = {
    username: '',
    name: '',
    firstname:'',
    lastname:'',
    email: '',
    password:'',
    fulltime: true,
    gender: '',
    codelang: '',
    type:'',
    role:'',
    work: '',
    mobile: ''
  };

  // By default, a newly-created contact will have the selected state.
  this.selectContact(contact);
}

deleteContact = (contactId: String) => {
  var idx = this.getIndexOfContact(contactId);
  if (idx !== -1) {
    this.contacts.splice(idx, 1);
    this.selectContact(null);
  }
    return this.contacts;
}

addContact = (contact: Contact) => {
  this.contacts.push(contact);
  this.selectContact(contact);
  return this.contacts;
}

updateContact = (contact: Contact) => {
  var idx = this.getIndexOfContact(contact._id);
  if (idx !== -1) {
    this.contacts[idx] = contact;
    this.selectContact(contact);
  }
  return this.contacts;
}
}
