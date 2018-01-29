import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class BaseService {
    constructor(private _toastController: ToastController) { }

    public get baseUrl(): string {
        return 'http://localhost:55014/api';
    }

    public showErrorToast(message: string): void {
        this._toastController
            .create({ message: message, duration: 5000, showCloseButton: true })
            .present();
    }
}
