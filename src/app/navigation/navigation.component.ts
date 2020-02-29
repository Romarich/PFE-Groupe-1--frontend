import {Compiler, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from "../shared/login.service";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  login: string;
  title: string;
  bookExchange: string;
  register: string;
  information: string;
  administration: string;
  show : boolean;
  constSecret : string = 'ADMIN';
  nbPoint:number;

  //isLoggedIn$: Observable<boolean>;
  history: string;

  ngOnInit() {
    this.login = localStorage.getItem("login");
    this.title = 'Switch Book';
    this.bookExchange = 'Déposer';
    this.register = 'Inscription (Temporaire !!!)';
    this.information = 'Mes Informations';
    this.history = 'Mes échanges';
    this.administration = 'Page d\'administration';
    //this.constSecret = "ADMIN";
    //this.show = this.loginService.getIsConnected();

    //this.isLoggedIn$ = this.loginService.isLoggedIn;
    this.nbPoint = 0;
    this.loginService.getNbPoint().subscribe(
      res => {
        this.loginService.setPoint(res);
        this.nbPoint = res;
      }
    )
    this.loginService.getPoint().subscribe(
      res => {
        this.nbPoint = res;
      }
    );

    this.loginService.getLogin().subscribe(
      res => {
        this.login = res;
      }
    );

  }

  constructor(private router : Router,
              public loginService: LoginService, public _compiler: Compiler) {
  }

  /** disconect the user
   */
  logout(): void {
    localStorage.clear();
    this.loginService.setIsConnected(false);
    this.router.navigate(['/register']);
    this._compiler.clearCache();
  }

}
