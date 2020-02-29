import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {User} from '../model/User';
import {LoginService} from '../shared/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    modelUser: User = {
      objectID: '',
      login: '',
      email:'',
      password:'',
      name:'',
      firstname:'',
      address:'',
      roles: 'USER',
      roleList: ['USER'],
      nbPoints:0,
      banned:false,
      favoriteItems:[],
      givenItems:[],
      takenItems: []
    };
    checkMdp:''
    loginNotExistInDB:''
    emailNotExistInDB:''
    goodMessage: string;
    badMessage: string;

    loginUser: User = {objectID: '',
      login: '',
      email:'',
      password:'',
      name:'',
      firstname:'',
      address:'',
      roles: '',
      roleList: [''],
      nbPoints:0,
      banned:false,
      favoriteItems:[],
      givenItems:[],
      takenItems: []
    };

    htmlToAdd : string = '';

    constructor(private api: ApiService,
                public loginService: LoginService,
                private router : Router) {

    }

    ngOnInit() {
      this.goodMessage = '',
        this.badMessage = '',
        this.loginService.getNbPoint().subscribe(
          res => {
            this.loginService.setPoint(res);
          }
        )

    }

  register(): void {
    this.goodMessage = "";
    this.badMessage = "";
    if (this.checkMdp === this.modelUser.password) {
      this.api.findByLogin(this.modelUser).subscribe(
        res => {
          if(res.login!=undefined){
            this.loginNotExistInDB = res.login;
          }else{
            this.loginNotExistInDB = "";
          }
          if(res.email!=undefined){
            this.emailNotExistInDB = res.email;
          }else{
            this.emailNotExistInDB = "";
          }
          if(this.loginNotExistInDB && this.emailNotExistInDB){
            this.api.createNewUser(this.modelUser).subscribe(
              res => {
                this.goodMessage = 'Vous venez de vous inscrire.';
              },
              err => {
                this.badMessage = 'Erreur au niveau de l\'inscription';
              }
            );
          }
        },
        err => {
          this.badMessage = 'La requête n\'a pas aboutie';
        }
      );
    } else {
      this.badMessage = 'Le mot de passe n\'est pas bon';
    }
  }



    /** Send the information about the user, trying to connect to the app
    */
   connexion(): void {
      this.goodMessage = "";
      this.badMessage = "";
      this.loginService.signIn(this.loginUser).subscribe(
        res=>{
          if(res.banned == true) {
            alert("Vous êtes banni car vous êtes une mauvaise personne ! Ne soyez pas comme Lissy ");
            return;
          }
          localStorage.setItem('token',res.token);
          localStorage.setItem('role',res.role);
          localStorage.setItem('login', this.loginUser.login);
          this.loginService.setIsConnected(true);
          if(res.role == "ADMIN"){
            this.loginService.setIsAdmin(true);
          }
          //this.loginService.setLoggedIn();
          this.router.navigate(['/']);
          this.loginService.setLogin(this.loginUser.login);
        },
        err=> {
          this.htmlToAdd = "<div class='alert alert-danger text-center'><strong>Erreur d'authentification</strong></div> ";
        }
    )
      // Le .subscribe permet de s'adapté au observable renvoyé par le login.service.ts
      //user => console.log('valeur du login ' + user.login
   }

}
