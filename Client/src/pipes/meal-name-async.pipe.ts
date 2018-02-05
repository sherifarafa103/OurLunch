import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Meal } from '../models/meal.model';

@Pipe({
    name: 'mealNameAsync'
})
export class MealNameAsyncPipe implements PipeTransform {
    transform(mealId: number, meals: Observable<Meal[]>): Observable<string> {
        return meals.map(meals => meals.find(m => m.id === mealId))
            .filter(meal => meal !== undefined)
            .map(meal => meal.name);
    }
}
