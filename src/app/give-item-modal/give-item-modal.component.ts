import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GiveItemData} from "./GiveItemData";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-stock-modal',
  templateUrl: './give-item-modal.component.html',
  styleUrls: ['./give-item-modal.component.css']
})
export class GiveItemModalComponent implements OnInit {

  public relay = new FormControl('', Validators.required);
  public invalid: boolean;

  constructor(
    public dialogRef: MatDialogRef<GiveItemData>,
    @Inject(MAT_DIALOG_DATA) public addStockData: GiveItemData) { }

  ngOnInit() {
    this.invalid = false;
  }

  public confirmClick() : void {
    if (this.relay.status === "VALID")
      this.dialogRef.close({'confirm': true, 'relay': this.relay.value.toLocaleString()});
    else
      this.invalid = true;
  }

  public cancelClick(): void {
    this.dialogRef.close({"confirm": false});
  }
}
