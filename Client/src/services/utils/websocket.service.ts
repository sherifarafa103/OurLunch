import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { INotification } from '../../interfaces/INotification';
import { BaseService } from '../base.service';

/**
 * @class
 * @description
 * Represents a service that invokes websocket calls.
 */
@Injectable()
export class WebsocketService {
    private _response: BehaviorSubject<INotification> = new BehaviorSubject(null);

    constructor(private _baseService: BaseService) {
        this._initService();
    }

    /**
     * @method
     * @description
     * Gets an instance of the socket response bus.
     *
     * @returns {Observable<INotification>} The observable of the subject that receives the data.
     */
    public get messageBus(): Observable<INotification> {
        return this._response.asObservable();
    }

    /**
     * @method
     * @description
     * Helper function that casts the response into a concrete business logic interface (object)
     * that the rest of the application can use. It also adds that response to the server
     * responses queue (subject).
     *
     * @param {number} id The caller id that had made the call to the server that the server is now replying to.
     * @param {string} response The json response that returned from that call.
     */
    private _handleCallResponse(message: any): void {
        const serverResponse: INotification = { path: message.Path, method: message.Method, data: message.Data };
        this._response.next(serverResponse);
    }

    /**
     * @private
     * @description
     * Initializes the service. Starts up connection with the hub
     * and registers the callback function to the server responses.
     */
    private _initService(): void {
        let connection = new WebSocket(`ws://${this._baseService.serverOrigin}`);
        connection.onmessage = (m: MessageEvent) => this._handleCallResponse(JSON.parse(m.data));
    }
}
