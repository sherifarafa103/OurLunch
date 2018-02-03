import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable()
export class RealTimeUpdaterService {
    constructor(private _websocketService: WebsocketService) { }

    public initService() {

        this._websocketService.messageBus.subscribe(message => {
            console.log(message);
        });
    }
}
