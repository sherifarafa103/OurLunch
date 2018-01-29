import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {

    public get baseUrl(): string {
        return 'http://localhost:55013/api';
    }
}
