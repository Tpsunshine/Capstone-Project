import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import { ProfileFormsComponent } from '../profile/profile-forms.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<ProfileFormsComponent>{

  constructor() { }

  canDeactivate(component: ProfileFormsComponent) {
    console.log("in desctibe Guard");
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
