import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {ItemDataComponent} from '../item-data/item-data.component';
import {LoginService} from "../shared/login.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @ViewChildren(ItemDataComponent) dataItems: QueryList<ItemDataComponent>;
  public exchanges = [];
  public search = '';
  private login = '';

  public showGive = true;
  public showTake = true;

  constructor(private api: ApiService, public loginService: LoginService) {
  }

  ngOnInit() {
    this.login = localStorage.getItem('login');
    this.getItems();
    this.loginService.getNbPoint().subscribe(
      res => {
        this.loginService.setPoint(res);
      }
    )
  }

  public getItems(): void {
    this.api.getMyExchanges().subscribe(
      res => {
        res.sort((a, b) => {
          const t1 = (new Date(a.date)).getTime();
          const t2 = (new Date(b.date)).getTime();
          return t1 > t2 ? -1 : t1 < t2 ? 1 : 0;
        });
        this.exchanges = res;

      },
      err => {
        alert(err.toString());
        console.log(err);
      }
    );
  }

  public toggleOne(): void {
    this.dataItems.forEach((element) => {
      element.toggle = false;
    });
  }

  public onKeyInput(event: any) {
    this.search = event.target.value;
    this.filter();
  }

  public showGiveCheck(elem) {
    this.showGive = elem.target.checked;
    if (this.showGive && this.showTake) {
      this.showAll();
    } else if (this.showGive) {
      this.showGiven();
         } else {
      this.showTaken();
    }
  }

  public showTakeCheck(elem) {
    this.showTake = elem.target.checked;
    if (this.showGive && this.showTake) {
      this.showAll();
    } else if (this.showTake) {
      this.showTaken();
    } else {
      this.showGiven();
    }
  }

  private showAll() {
    this.dataItems.forEach(e => e.display = true);
  }

  private showTaken() {
    this.dataItems.forEach(e => e.display = (e.exchange.taker !== null && e.exchange.taker.login === this.login));
  }

  private showGiven() {
    this.dataItems.forEach(e => e.display = (e.exchange.giver !== null && e.exchange.giver.login === this.login));
  }

  private filter(): void {
    this.dataItems.forEach( e => e.display = (e.exchange.item.title.toLowerCase().includes(this.search.toLowerCase())));
  }

}
