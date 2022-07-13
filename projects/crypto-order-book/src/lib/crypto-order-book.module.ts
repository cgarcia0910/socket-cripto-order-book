import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CryptoOrderBookComponent } from './crypto-order-book.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    CryptoOrderBookComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [
    CryptoOrderBookComponent
  ]
})
export class CryptoOrderBookModule { }
