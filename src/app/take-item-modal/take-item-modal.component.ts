import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TakeItemData} from "./TakeItemData";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-take-item-modal',
  templateUrl: './take-item-modal.component.html',
  styleUrls: ['./take-item-modal.component.css']
})
export class TakeItemModalComponent implements OnInit {

  public relay = new FormControl('', Validators.required);
  public invalid: boolean;

  constructor(
    public dialogRef: MatDialogRef<TakeItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public takeItemData: TakeItemData) { }

  ngOnInit() {
    this.invalid = false;
  }

  public confirmClick() : void {
    if (this.relay.valid)
      this.dialogRef.close({'confirm': true, 'relay': this.relay.value.toLocaleString()});
    else
      this.invalid = true;
  }

  public cancelClick(): void {
    this.dialogRef.close({"confirm": false});
  }
}
