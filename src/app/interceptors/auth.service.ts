import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {LoginService} from "../shared/login.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router : Router,private loginService: LoginService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if( localStorage.getItem('role') == null || localStorage.getItem('role') == ''){
      this.loginService.setIsConnected(false);
      localStorage.clear();
      this.router.navigate(['/register']);
    }

    if (localStorage.getItem('token') == null) {
      console.log("!!!!! PAs de token car il est null")
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer `
        }
      });
    }
    else {
      console.log("Intercept activé, le token n'est pas null")
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
    return next.handle(req);
  }
}
