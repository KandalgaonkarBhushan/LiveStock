import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  	private webSocketSubject: Rx.Subject<MessageEvent>;
  	public webSocket;

  	constructor() { }

 	private create(url: string): Rx.Subject<MessageEvent> {
	    this.webSocket = new WebSocket(url);
	    const observable = Rx.Observable.create(
	        (obs: Rx.Observer<MessageEvent>) => {
	            this.webSocket.onmessage = obs.next.bind(obs);
	            this.webSocket.onerror = obs.error.bind(obs);
	            this.webSocket.onclose = obs.complete.bind(obs);
	            return this.webSocket.close.bind(this.webSocket);
	        });

	    const observer = {};
	    return Rx.Subject.create(observer, observable);
	}

  	public connect(url: string): Rx.Subject<MessageEvent> {
        if (!this.webSocketSubject) {
            this.webSocketSubject = this.create(url);
        }
        return this.webSocketSubject;
 	}

	public close() {
	    if (this.webSocket) {
	        this.webSocket.close();
	        this.webSocketSubject = null;
	    }
	}
}
