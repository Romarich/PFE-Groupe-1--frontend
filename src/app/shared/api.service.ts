import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Exchange} from '../model/Exchange';
import {User} from '../model/User';
import {Item} from '../model/Item';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = environment.api_url;
  private EXCHANGE_CREATE_URL = '/api/exchanges/create';
  private ITEM_FIND_URL = '/api/items/find';
  private ALL_ITEMS_URL = '/api/items/all';

  constructor(private http: HttpClient) {
  }

  // Exchange
  sendExchange(exchange: Exchange): Observable<any> {
    console.log("°°°Service api send exchange");
    const url = this.API_URL + this.EXCHANGE_CREATE_URL;
    return this.http.post(url, exchange, {responseType: 'text'});
  }

  takeItem(exchange: Exchange): Observable<Item> {
    return this.http.post<Item>(this.API_URL + '/api/exchanges/takeItem', exchange);
  }

  giveItem(exchange: Exchange): Observable<Item> {
    return this.http.post<Item>(this.API_URL + '/api/exchanges/giveItem', exchange);
  }

  // Item
  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.API_URL + this.ALL_ITEMS_URL);
  }

  getAllValidatedItems() : Observable<Item[]> {
    return this.http.get<Item[]>(this.API_URL + '/api/items/allValidated');
  }

  findItemByCode(item: Item): Observable<any> {
    console.log(environment.api_url);
    console.log("$$$$ find Item " + item.title);
    return this.http.post(this.API_URL + this.ITEM_FIND_URL, item);
  }

  // User
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + '/api/users/all');
  }

  createNewUser(user: User): Observable<User> {
    console.log("Yooo Je passe dans le cretaUser dans api.service");
    return this.http.post<User>(this.API_URL + '/api/users/create', user);
  }

  findByLogin(user: User): Observable<any> {
    return this.http.post(this.API_URL + '/api/users/verificationLoginAndEmail', user);
  }

  getFavorites(): Observable<Item[]> {
    return this.http.get<Item[]>(this.API_URL + '/api/users/getFavorites');
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL + '/api/users/update', user);
  }

  removeFavorite(itemId: string): Observable<Item[]> {
    return this.http.post<Item[]>(this.API_URL + '/api/users/removeFavorite', itemId);
  }

  addFavorite(itemID: string): Observable<Item[]> {
    return this.http.post<Item[]>(this.API_URL + '/api/users/addFavorite', itemID);
  }

  modifyUserInformation(user: User): Observable<any> {
    return this.http.post(this.API_URL + '/api/users/modify', user, {responseType: 'text'});
  }

  validateAnItem(itemId: string): Observable<any> {
    return this.http.post(this.API_URL + '/api/items/validationItem', itemId);
  }

  deleteAnItem(itemId: string): Observable<any> {
    return this.http.post(this.API_URL + '/api/items/deleteItem', itemId);
  }

  banAUser(userLogin: string): Observable<any> {
    return this.http.post(this.API_URL + '/api/users/banUser', userLogin);
  }

  getUserPicture(): Observable<any> {
    return this.http.get(this.API_URL + '/api/users/picture', {responseType: 'text'});
  }

  addUserPicture(imageSrc: string): Observable<any> {
    return this.http.post(this.API_URL + '/api/users/addPicture', imageSrc, {responseType: 'text'});
  }

  getMyExchanges(): Observable<Exchange[]> {
    return this.http.get<Exchange[]>(this.API_URL + '/api/exchanges/exchanged');
  }

  upgradeUserRole(userLogin: string): Observable<any> {
    return this.http.post(this.API_URL + '/api/users/upgradeUserRole', userLogin);
  }
}
