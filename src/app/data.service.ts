import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { WebSocketService } from "./web-socket.service";
import { map, catchError, retry } from 'rxjs/operators';


const WEB_SOCKET_URL = "ws://stocks.mnet.website";

@Injectable({
  providedIn: 'root'
})

export class DataService {
	public messages;
	public webSocketData = {};
  	constructor(webSocketService: WebSocketService) { 
  		this.messages = <Subject<any>>webSocketService.connect(WEB_SOCKET_URL).pipe(
  			map(response => {
  				if(response.data) {
					this.updateStockDataObj(response.data);
  					return this.webSocketData;
  				}
  			})
		);
  	}

  	private updateStockDataObj(responseData) {
	  	JSON.parse(responseData).forEach(([name, price]) => {
	  		if (this.webSocketData[name]) {
	  			this.webSocketData[name].demand = this.webSocketData[name].price < price ? ">" : "<" ;
	  			this.webSocketData[name].price = price;
	  			this.webSocketData[name].updatedTime = Math.abs(new Date().getTime() - this.webSocketData[name].updatedTime);
	  			this.webSocketData[name].time = new Date();
	  		} else {
				this.webSocketData[name] = {
					"price" : price,
					"name" : name,
					"updatedTime": new Date().getTime(),
					"time": new Date()
				}  			
	  		}
	  	 });
  	}
}
