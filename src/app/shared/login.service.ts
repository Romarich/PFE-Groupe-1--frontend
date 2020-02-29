import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../model/User';
import {environment} from '../../environments/environment';


// Ajouté directement lorsque l'on crée un serivce, permet d'éviter de faire des new dans les components
@Injectable({
  providedIn: 'root' // Angular creates a single, shared instance of HeroService and injects into any class that asks for it
                     // notion de Provider, cad un service accesible partout et crée avant que les composant ne le use
})
export class LoginService {

  private API_URL = environment.api_url;
  private LOGIN_URL =  '/api/users/login';
  private isConnected : boolean = false;
  private isAdmin : boolean = false;
  public nbPoint = new Subject<number>();
  public pointValue = 0;
  public login = new Subject<string>();

  //private loggedIn = new BehaviorSubject<boolean>(false);

  /*
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  setLoggedIn(){
    this.loggedIn.next(true);
  }
  */
  giveRole () : string {
    return localStorage.getItem("role");
  }
  // Les services ont également un constructeur, on peut leur passé d'autre service = "service-in-service"
  constructor(public http: HttpClient) {}

  /** POST : make a connexion for the user who's bieng logged
   * @Parameter user : the user from the form
   * @Return : an observable to make this function asynchronus
   */
  signIn(user: User): Observable<any> {
    return this.http.post<User>(this.API_URL + this.LOGIN_URL, user);
  }

  getIsConnected () : boolean {
    return this.isConnected;
  }

  setIsConnected (bool : boolean) : void {
    this.isConnected = bool;
  }

  getIsAdmin () : boolean {
    return this.isAdmin;
  }

  setIsAdmin (bool : boolean) : void {
    this.isAdmin = bool;
  }

  getNbPoint() : Observable<any>{
    return this.http.get(this.API_URL + '/api/users/nbPoint', {responseType: 'text'});
  }

  getPoint(): Observable<number>{
    return this.nbPoint.asObservable();
  }

  setPoint(point:number):void{
    this.nbPoint.next(point);
    this.pointValue = point;
    console.log(point);
  }

  getPointValue() : number{
    return this.pointValue;
  }

  getLoginDb(): Observable<any> {
    return this.http.get(this.API_URL + '/api/users/loginUserName', {responseType: 'text'});
  }

  getLogin(): Observable<string> {
    return this.login.asObservable();
  }

  setLogin(login: string): void {
    this.login.next(login);

  }



}
