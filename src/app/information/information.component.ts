import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {User} from "../model/User";
import {LoginService} from "../shared/login.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  @ViewChild('form') private form: NgForm;
  constructor(private api: ApiService, public loginService: LoginService) {
  }

  modelUser: User = {
    objectID: '',
    login: '',
    email:'',
    password:'',
    name:'',
    firstname:'',
    address:'',
    roles: '',
    roleList: [],
    nbPoints:0,
    banned:false,
    favoriteItems:[],
    givenItems:[],
    takenItems: []
  };
  checkMdp: string;
  loginNotExistInDB: boolean;
  emailNotExistInDB: boolean;
  goodMessage: string;
  badMessage: string;

  ngOnInit() {
    this.checkMdp = "";
    this.loginNotExistInDB = true;
    this.emailNotExistInDB = true;
    this.goodMessage = '';
    this.badMessage = '';
    this.loginService.getNbPoint().subscribe(
      res => {
        this.loginService.setPoint(res);
      }
    )
  }

  sendInformation() : void {
    this.goodMessage = "";
    this.badMessage = "";
    if(this.modelUser.password!==""){
      if(this.modelUser.password !==this.checkMdp){
        return;
      }
    }
    if (this.modelUser.address == '' && this.modelUser.email == '' && this.modelUser.password == '' && this.modelUser.firstname == '' && this.modelUser.name == '') {
    } else {
      this.api.modifyUserInformation(this.modelUser).subscribe(
        res => {
          console.log(res);
          if (res === "email") {
            console.log("JE RENTRE BIEN ICI");
            this.emailNotExistInDB = false;
          } else {
            this.emailNotExistInDB = true;
            this.goodMessage = "Vos informations ont bien été modifié";

          }

        },
        error1 => {
          console.log(error1);
          this.badMessage = "Votre requête n'a pas aboutie";
        }
      );
    }
  }
}
