import { Pipe, PipeTransform } from '@angular/core';
import { Contact} from '../contact'

@Pipe({
  name: 'filter'
})
export class userDisplayPipe implements PipeTransform {

  transform(items: Contact[], filter: string): any {
    if(!items || !filter) {
      return items;
    }
    // To search values only of "name" variable of your object(item)
    //return items.filter(item => item.type.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

    // To search in values of every variable of your object(item)
    return items.filter(item => JSON.stringify(item).toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

}