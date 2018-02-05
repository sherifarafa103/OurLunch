import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Restaurant } from '../models/restaurant.model';

@Pipe({
    name: 'restaurantNameAsync'
})
export class RestaurantNameAsyncPipe implements PipeTransform {
    transform(restaurantId: number, restaurants: Observable<Restaurant[]>): Observable<string> {
        return restaurants.map(restaurants => restaurants.find(r => r.id === restaurantId))
            .filter(restaurant => restaurant !== undefined)
            .map(restaurant => restaurant.name);
    }
}
