import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CryptoOrderBookModule } from 'crypto-order-book';
import { ISocketConfig, SOCKET_CONFIG } from 'crypto-order-book';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_CONFIG } from './app.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CryptoOrderBookModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: SOCKET_CONFIG, useValue: APP_CONFIG }],
  bootstrap: [AppComponent]
})
export class AppModule { }
