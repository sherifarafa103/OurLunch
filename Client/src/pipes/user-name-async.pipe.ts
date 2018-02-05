import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Pipe({
    name: 'userNameAsync'
})
export class UserNameAsyncPipe implements PipeTransform {
    transform(userId: number, users: Observable<User[]>): Observable<string> {
        return users.map(users => users.find(u => u.id === userId))
            .filter(user => user !== undefined)
            .map(user => `${user.firstName} ${user.lastName}`);
    }
}
