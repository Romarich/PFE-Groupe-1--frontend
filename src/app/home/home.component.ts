import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Item} from '../model/Item';
import {ItemListComponent} from '../item-list/item-list.component';
import {ApiService} from '../shared/api.service';
import {isNullOrUndefined} from 'util';
import {LoginService} from "../shared/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChildren(ItemListComponent) itemList: QueryList<ItemListComponent>;
  public items: Item[];
  public favorites: Item[];
  private input: string;
  public isFavorite: boolean;
  public isBook: boolean;
  public isGame: boolean;

  constructor(private api: ApiService, public loginService: LoginService) {
  }

  ngOnInit() {
    this.input = '';
    this.isFavorite = false;
    this.isBook = false;
    this.isGame = false;
    this.getAllValidatedItems();
    this.getFavorites();
    this.loginService.getNbPoint().subscribe(
      res => {
        this.loginService.setPoint(res);
      }
    )
  }

  public getAllValidatedItems(): void {
    this.api.getAllValidatedItems().subscribe(
      res => {
        this.items = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  public getFavorites(): void {
    if (null != localStorage.getItem('token')) {
      this.api.getFavorites().subscribe(
        res => {
          this.favorites = res;
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.favorites = [];
    }
  }

  public onKeyInput(event: any) {
    this.input = event.target.value.toLowerCase();
    this.showItem();
  }

  public checkIsFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.showItem();
  }

  public checkIsBook(): void {
    this.isBook = !this.isBook;
    this.showItem();
  }

  public checkIsGame(): void {
    this.isGame = !this.isGame;
    this.showItem();
  }

  private checkFavorite(item: Item): boolean {
    if (!isNullOrUndefined(this.favorites) && 0 < this.favorites.length) {
      for (const favoriteItem of this.favorites) {
        if (favoriteItem.objectID == item.objectID) {
          return true;
        }
      }
    }
    return false;
  }

  private showItem(): void {
    this.itemList.forEach((element) => {
      element.display = element.item.title.toLowerCase().includes(this.input.toLowerCase());
      if (element.display && this.isBook) {
        element.display = element.item.type == 'Book';
      }
      if (element.display && this.isGame) {
        element.display = element.item.type == 'Game';
      }
      if (element.display && this.isFavorite) {
        element.display = element.isFavorite;
      }
    });
  }

  private toggleChildren(): void {
    this.itemList.forEach((element) => {
      element.toggle = false;
    });
  }

  private modifyFavorite(event: any): void {
    if (event.isFavorite) {
      this.api.removeFavorite(event.item.objectID).subscribe(
        res => {
          this.favorites = res;
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.api.addFavorite(event.item.objectID).subscribe(
        res => {
          this.favorites = res;
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
