import {Item} from './Item';
import {User} from "./User";

export interface Exchange {
    exchangeId: string;
    item: Item;
    relais: boolean;
    giver: User;
    taker: User;
    date: Date;
    validate: boolean;
}
