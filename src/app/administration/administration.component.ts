import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {LoginService} from '../shared/login.service';
import {ApiService} from '../shared/api.service';
import {environment} from '../../environments/environment';

import {ItemListAdminTabComponent} from '../item-list-admin-tab/item-list-admin-tab.component';

import * as algoliasearch from 'algoliasearch';
import {Item} from "../model/Item";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  @ViewChildren(ItemListAdminTabComponent) itemList: QueryList<ItemListAdminTabComponent>;
  show: boolean;
  public items: Item[];
  public point: number;

  // algolia
  private query = '';

  private searchClient = algoliasearch(environment.algolia.appId, environment.algolia.apiKey);

  public configUsers = {
    indexName: 'users',
    searchClient : this.searchClient
  };

  public configItems = {
    indexName: 'items',
    searchClient : this.searchClient,
  };


  constructor(private api: ApiService, public loginService: LoginService) {
  }

  ngOnInit() {
    this.show = this.loginService.getIsAdmin();
    this.getAllItems()
    this.loginService.getNbPoint().subscribe(
      res => {
        this.loginService.setPoint(res);
      }
    )

  }

  public getAllItems(): void {
    this.api.getAllItems().subscribe(
      res => {
        this.items = res;
      }
    );
  }

  onQuery($event) {
    this.query = $event.target.value;
  }

  get searchParameters() {
    return {
      query: this.query
    };
  }

  private toggleChildren(): void {
    this.itemList.forEach((element) => {
      element.toggle = false;
    });
  }

  private getImage(event): void {
    if (!isNullOrUndefined(this.items)) {
      this.items.forEach(function (item) {
        if (item.objectID == event.objectID) {
          console.log(item.picture);
          event.picture = 'data:image/png;base64,' + item.picture;
        }
      });
    }
  }
}
