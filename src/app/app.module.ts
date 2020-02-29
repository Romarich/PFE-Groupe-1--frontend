import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgAisModule} from "angular-instantsearch";

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExchangeComponent} from './exchange/exchange.component';
import {HomeComponent} from './home/home.component';
import {ItemListComponent} from './item-list/item-list.component';
import {InformationComponent} from './information/information.component';
import {GiveItemModalComponent} from './give-item-modal/give-item-modal.component';
import {TakeItemModalComponent} from './take-item-modal/take-item-modal.component';
import {AdministrationComponent} from './administration/administration.component';
import {AuthInterceptor} from "./interceptors/auth.service";
import { HistoryComponent } from './history/history.component';
import { ItemDataComponent } from './item-data/item-data.component';
import {ItemListAdminTabComponent} from './item-list-admin-tab/item-list-admin-tab.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'exchange', component: ExchangeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'information', component: InformationComponent},
    {path: 'administration', component: AdministrationComponent},
    {path: 'history', component: HistoryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ExchangeComponent,
    RegisterComponent,
    HomeComponent,
    ItemListComponent,
    InformationComponent,
    GiveItemModalComponent,
    TakeItemModalComponent,
    AdministrationComponent,
    HistoryComponent,
    ItemDataComponent,
    AdministrationComponent,
    ItemListAdminTabComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    ReactiveFormsModule,
    NgAisModule
  ],
  entryComponents: [
    GiveItemModalComponent,
    TakeItemModalComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
