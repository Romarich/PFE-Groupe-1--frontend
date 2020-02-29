import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../model/Item";
import {User} from "../model/User";
import {ApiService} from "../shared/api.service";
import {isNullOrUndefined} from "util";
import {LoginService} from "../shared/login.service";


@Component({
  selector: 'app-item-list-admin-tab',
  templateUrl: './item-list-admin-tab.component.html',
  styleUrls: ['./item-list-admin-tab.component.css']
})
export class ItemListAdminTabComponent implements OnInit {
  @Input() public item: Item;
  @Input() public user: User;
  @Output() public toggleEvent = new EventEmitter();
  @Output() public getPicture = new EventEmitter();

  public display: boolean;
  public toggle: boolean;

  public isItem: boolean;

  // fields name
  private labelOne: string;
  private labelTwo: string;
  private labelThree: string;
  private labelFour: string;
  // data
  public fieldOne: string;
  public fieldTwo: string;
  public fieldThree: string;
  public fieldFour: string;
  public gotImage: boolean;

  constructor(private api: ApiService, public loginService: LoginService) {
  }

  ngOnInit() {
    this.display = true;
    this.toggle = false;
    this.isItem = !isNullOrUndefined(this.item);
    // Data to show
    if (this.isItem) {
      this.labelOne = "Titre: ";
      this.labelTwo = "Description: ";
      this.labelThree = "Stock: ";
      this.labelFour = (this.item.type == "GAME") ? "Code barre" : "ISBN";
      this.gotImage = true;

      this.fieldOne = this.item.title;
      this.fieldTwo = this.item.description;
      this.fieldThree = this.item.stock.toString();
      this.fieldFour = this.item.type == "GAME" ? "jeu" : "livre";
    } else {
      this.labelOne = "Login: ";
      this.labelTwo = "Nom et prénom: ";
      this.labelThree = "Email: ";
      this.labelFour = "Rôle: ";
      this.gotImage = false;

      this.fieldOne = this.user.login;
      this.fieldTwo = this.user.firstname + " " + this.user.name;
      this.fieldThree = this.user.email;
      this.fieldFour = "USER" === this.user.roleList[0] ? "utilisateur" : "administrateur";
    }
    this.loginService.getNbPoint().subscribe(
      res => {
        this.loginService.setPoint(res);
      }
    )

  }

  banUser() {
    this.api.banAUser(this.user.login).subscribe(
      res => {
        this.user.banned = true;
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  upgradeUserRole() {
    this.api.upgradeUserRole(this.user.login).subscribe(
      res => {
        this.user.roles = "ADMIN";
        this.user.roleList[0] = "ADMIN";
        console.log(this.user.objectID);
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteItem() {
    this.api.deleteAnItem(this.item.objectID).subscribe(
      res => {
        console.log(res);
        this.display = false;
      },
      error => {
        console.log(error);
      }
    );
  }

  validateItem() {
    this.api.validateAnItem(this.item.objectID).subscribe(
      res => {
        this.item.validate = true;
        this.item.stock += 1;
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  private onItemListClick(): void {
    if (!this.toggle)
      this.toggleEvent.emit();
    if (this.isItem) {
      if (isNullOrUndefined(this.item.picture) || this.item.picture === '')
        this.getPicture.emit(this.item);
    }
    this.toggle = !this.toggle;

  }

}
