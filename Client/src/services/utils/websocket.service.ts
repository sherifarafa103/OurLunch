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
    private _connString: string;
    private readonly _hubName: string = 'realTimeNotifier';
    private readonly _serverMethodName: string = 'send';
    private readonly _clientMethodName: string = 'send';

    private _connection: SignalR.Hub.Connection;
    private _hubProxy: SignalR.Hub.Proxy;
    private _response: BehaviorSubject<INotification> = new BehaviorSubject(null);
    private _isReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
     * Invokes a server call to the web socket hub.
     *
     * @param {number} id A unique caller id to identify the message.
     */
    public invokeCall(id: number): void {
        this._isReady
            .asObservable()
            .first()
            .filter(status => status)
            .subscribe(status => this._hubProxy.invoke(this._serverMethodName, id));
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
        const serverResponse: INotification = { path: message.Path, method: message.Method };
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
        connection.onmessage = m => console.log(m);
    }
}
