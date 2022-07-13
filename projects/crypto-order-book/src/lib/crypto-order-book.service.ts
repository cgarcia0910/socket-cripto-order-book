import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { SOCKET_CONFIG, ISocketConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CryptoOrderBookService {
  subMessage = {
    action: 'SubAdd',
    subs: ['0~Coinbase~BTC~USD', '0~Coinbase~BTC~EUR']
  }
  constructor(
    @Inject(SOCKET_CONFIG) private config: ISocketConfig,
  ) { }
  socket$: any;
  socketBS: BehaviorSubject<any> = new BehaviorSubject(undefined);
  connect() {
    if(!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(`${this.config.url}${this.config.apiKey}`)
      this.socket$.next(this.subMessage);
      this.socket$.subscribe((msg: any) => this.socketBS.next(msg))
    }
  }
  disconect() {
    if(this.socket$) {
      this.socket$.complete();
      this.socket$ = undefined;
    }
  }
}
