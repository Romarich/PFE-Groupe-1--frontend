import {Component, OnInit} from '@angular/core';
import {Exchange} from '../model/Exchange';
import {ApiService} from '../shared/api.service';
import {Item} from '../model/Item';
import {LoginService} from "../shared/login.service";

@Component({
    selector: 'app-exchange',
    templateUrl: './exchange.component.html',
    styleUrls: ['./exchange.component.css']
    })
    export class ExchangeComponent implements OnInit {

        imageSrc: string;

        model: Exchange = {
            exchangeId: '',
            item: {} as Item,
            relais: false,
            giver: null,
            taker: null,
            date:null,
            validate:false
        };
        error: boolean;
        objectExist: false;
        goodMessage: string;
        badMessage: string;
        show : boolean;

        constructor(private api: ApiService,
                    public loginService: LoginService) {
        }

        ngOnInit() {
          this.show = this.loginService.getIsConnected();
          this.model.item.type = 'Book';
          this.model.relais = false;
          this.error = false;
          this.goodMessage = '';
          this.badMessage = '';
          this.imageSrc = "";
          this.loginService.getNbPoint().subscribe(
            res => {
              this.loginService.setPoint(res);
            }
          )

        }

    public sendExchange(): void {
      this.goodMessage = "";
      this.badMessage = "";
      if ((this.model.item.title != '' && this.model.item.title != undefined) && this.model.item.objectID != undefined
        && this.model.item.objectID != '' && this.model.item.description != '' && this.model.item.description != undefined
        && (this.model.item.type == 'Book' || this.model.item.type == 'Game')) {
        if(this.imageSrc==="" ){
          this.model.item.picture = "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";
        }
        this.api.findItemByCode(this.model.item).subscribe(
          res => {
            this.objectExist = res;
            if (this.objectExist) {
              this.api.sendExchange(this.model).subscribe(
                res2 => {
                  if (res2 === "OK") {
                    this.goodMessage = "Votre objet a bien été déposé";
                  }else{
                    this.badMessage = "Il y a eu un problème";
                  }
                },
                err => {
                  console.log(err);
                  alert('KO');
                }
              );
            }
          }
        );
      }
    }
    handleInputChange(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e) {
      let reader = e.target;
      this.imageSrc = reader.result;
      this.model.item.picture = this.imageSrc.slice(23,this.imageSrc.length);
    }
}
