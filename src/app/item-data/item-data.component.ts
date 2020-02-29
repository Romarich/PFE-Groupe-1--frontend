import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exchange} from '../model/Exchange';
import {LoginService} from "../shared/login.service";

@Component({
  selector: 'app-item-data',
  templateUrl: './item-data.component.html',
  styleUrls: ['./item-data.component.css']
})
export class ItemDataComponent implements OnInit {
  @Input() public exchange: Exchange;
  @Output() public toggleEvent = new EventEmitter();
  public display;
  public toggle;
  public datatype = 'none'; // Set datatype to whatever to show card header
  public file;
  private type;

  constructor(public loginService: LoginService) {
  }

  ngOnInit() {
    this.toggle = false;
    this.display = true;
    this.file = 'data:image/png;base64,' + this.exchange.item.picture;

    this.type = (this.exchange.item.type === 'Game') ? 'Code barre' : 'ISBN';
    this.loginService.getNbPoint().subscribe(
      res => {
        this.loginService.setPoint(res);
      }
    )
  }

  private onClick(): void {
    if (!this.toggle) {
      this.toggleEvent.emit();
    }
    this.toggle = !this.toggle;
  }
}
