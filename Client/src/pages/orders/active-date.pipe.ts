import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'activeDate'
})
export class ActiveDatePipe implements PipeTransform {
    constructor(private _datePipe: DatePipe) { }

    transform(orderDate: Date): any {
        if (orderDate > new Date()) {
            return `${this._diffMinutes(orderDate, new Date())} minutes remaining`;
        }
        else {
            return this._datePipe.transform(orderDate, 'medium');
        }
    }

    private _diffMinutes(later: Date, earlier: Date) {
        let diff = (later.getTime() - earlier.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    }
}
