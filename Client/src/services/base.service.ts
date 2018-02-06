import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class BaseService {
    constructor(private _toastController: ToastController) { }

    public get serverOrigin(): string {
        return '5688e7d1.ngrok.io';
    }

    public get baseUrl(): string {
        return `http://${this.serverOrigin}/api`;
    }

    public showErrorToast(message: string): void {
        this._toastController
            .create({ message: message, duration: 5000, showCloseButton: true })
            .present();
    }
}
