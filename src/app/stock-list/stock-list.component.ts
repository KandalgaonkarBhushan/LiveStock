import { Component, Input } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { DataService } from "./../data.service"; 

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent {

	public messages;
	public showData : boolean;
	@Input() loadingText: string = "loading";

  	constructor(private dataService: DataService) { 
		dataService.messages.subscribe(msg => {
			this.showData = true;
	  		this.messages = msg;
		},
		err => { 
			this.loadingText = "No Data Found";
			this.showData = false;
		});
  	}

  	public reloadPage() {
  		window.location.reload();
  	}
}
