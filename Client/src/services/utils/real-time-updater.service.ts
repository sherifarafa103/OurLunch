import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { INotification } from '../../interfaces/INotification';
import { MealService } from '../meal.service';
import { OrderService } from '../order.service';
import { OrderItemService } from '../orderItem.service';
import { RestaurantService } from '../restaurant.service';
import { UserService } from '../user.service';
import { IResourceApiParser } from '../../interfaces/IResource';
import { Meal } from '../../models/meal.model';
import { Order } from '../../models/order.model';
import { Restaurant } from '../../models/restaurant.model';
import { OrderItem } from '../../models/orderItem.model';
import { User } from '../../models/user.model';

@Injectable()
export class RealTimeUpdaterService {
    constructor(
        private _websocketService: WebsocketService,
        private _mealService: MealService,
        private _orderService: OrderService,
        private _orderItemService: OrderItemService,
        private _restaurantService: RestaurantService,
        private _userService: UserService
    ) { }

    public initService() {

        this._websocketService.messageBus
            .filter(message => message !== null)
            .subscribe(message => {
                switch (message.path) {
                    case 'meals':
                        this._handleCall(message, this._mealService, Meal.importFromApi);
                        break;
                    case 'orders':
                        this._handleCall(message, this._orderService, Order.importFromApi);
                        break;
                    case 'restaurants':
                        this._handleCall(message, this._restaurantService, Restaurant.importFromApi);
                        break;
                    case 'orderItems':
                        this._handleCall(message, this._orderItemService, OrderItem.importFromApi);
                        break;
                    case 'users':
                        this._handleCall(message, this._userService, User.importFromApi);
                        break;
                    default:
                        break;
                }
            });
    }

    private _handleCall(message: INotification, service: any, parser: IResourceApiParser): void {
        switch (message.method) {
            case 'post':
                service.add.bind(service, parser(message), true);
                break;
            case 'put':
                service.update.bind(service, parser(message), true);
                break;
            case 'delete':
                service.delete.bind(service, parser(message), true);
                break;
            default:
                break;
        }
    }
}
