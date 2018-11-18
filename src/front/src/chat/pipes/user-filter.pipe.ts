import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models';

@Pipe({
  name: 'userFilter',
  pure: true
})
export class UserFilterPipe implements PipeTransform {

  transform(users: User[], search: string): any {
    console.log(users, search);
    if (search) {
      return users.filter(user => user.username.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()));
    }
    return users;
  }

}
