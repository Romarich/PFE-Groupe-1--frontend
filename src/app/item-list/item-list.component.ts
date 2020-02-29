import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../model/Item";
import {ApiService} from "../shared/api.service";
import {MatDialog} from "@angular/material";
import {GiveItemModalComponent} from "../give-item-modal/give-item-modal.component";
import {TakeItemModalComponent} from "../take-item-modal/take-item-modal.component";
import {Exchange} from "../model/Exchange";
import {LoginService} from "../shared/login.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() public item: Item;
  @Input() public isFavorite: boolean;
  @Output() public toggleEvent = new EventEmitter();
  @Output() public favoriteEvent = new EventEmitter();
  public display: boolean;
  public toggle: boolean;
  private type: string;

  public exchange: Exchange = {
    exchangeId: '',
    item: {} as Item,
    relais: false,
    giver: null,
    taker: null,
    date: null,
    validate: true
  };

  public file: string;
  public point: number;
  public insuffisentStock: boolean;
  public toMuchStock: boolean;

  constructor(private api: ApiService, public loginService: LoginService, public takeItemDialog: MatDialog, public addStockDialog: MatDialog) {
  }

  ngOnInit() {
    this.display = true;
    this.toggle = false;
    this.type = (this.item.type == "GAME") ? "Code barre" : "ISBN";
    this.insuffisentStock = this.item.stock <= 0;
    this.toMuchStock = this.item.stock >= 200;

    this.file = 'data:image/png;base64,' + this.item.picture;
    this.point = 0;
    this.loginService.getNbPoint().subscribe(
      res => {
        this.loginService.setPoint(res);
        this.point = res;
      }
    );
    this.loginService.getPoint().subscribe(
      res => {
        this.point = res;
      }
    )
  }

  private onItemListClick(): void {
    if (!this.toggle)
      this.toggleEvent.emit();
    this.toggle = !this.toggle;
  }

  private takeItemOpen(): void {
    const dialogRef = this.takeItemDialog.open(TakeItemModalComponent,
      {
        width: '50%',
        data: {item: this.item}
      }
    );
    dialogRef.afterClosed().subscribe(
      result => {
        if (result.confirm && !this.insuffisentStock && this.point > 0) {
          this.exchange.item = this.item;
          this.exchange.relais = result.relay;
          this.api.takeItem(this.exchange).subscribe(
            res => {
              this.item = res;
              this.insuffisentStock = this.item.stock <= 0;
              this.toMuchStock = this.item.stock >= 200;
              this.loginService.getNbPoint().subscribe(
                res => {
                  this.loginService.setPoint(res);
                }
              )
            }, err => {
              console.log(err);
            }
          )
        }
      }
    );
  }

  private giveItemOpen(): void {
    const dialogRef = this.addStockDialog.open(GiveItemModalComponent,
      {
        width: '50%',
        data: {item: this.item}
      }
    );
    dialogRef.afterClosed().subscribe(
      result => {
        if (result.confirm && !this.toMuchStock) {
          this.exchange.item = this.item;
          this.exchange.relais = result.relay;
          this.api.giveItem(this.exchange).subscribe(
            res => {
              this.item = res;
              this.insuffisentStock = this.item.stock <= 0;
              this.toMuchStock = this.item.stock >= 200;
              this.loginService.getNbPoint().subscribe(
                res => {
                  this.loginService.setPoint(res);
                }
              )
            }, err => {
              console.log(err);
            }
          );
        }
      }
    );
  }

  private onModifyFavorite(): void {
    this.favoriteEvent.emit({'item': this.item, 'isFavorite': this.isFavorite});
  }
}
