import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimePipe } from './time.pipe';
import { StockListComponent } from './stock-list/stock-list.component';
import { DataService } from "./data.service"; 
import { WebSocketService } from "./web-socket.service";

@NgModule({
  declarations: [
    AppComponent,
    TimePipe,
    StockListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WebSocketService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
