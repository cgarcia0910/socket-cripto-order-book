import { Component, OnInit } from '@angular/core';
import { CryptoOrderBookService } from './crypto-order-book.service';
import { filter } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export interface TradeStockTick {
  F: string
  FSYM: string
  ID: string
  M: string
  P: number
  Q: number
  RTS: number
  RTSNS: number
  TOTAL: number
  TS: number
  TSNS: number
  TSYM: string
  TYPE: string
}

export class SlideWindow<T>{
  private _window: T[]= [];
  private windowSize: number;
  constructor(windowSize: number) {
    this.windowSize = windowSize;
  }
  push(item:T) {
    if(this._window.length >= this.windowSize) {
      this._window.pop();
    }
    this._window.unshift(item);
  }
  get window() {
    return this._window;
  }
}

@Component({
  selector: 'lib-crypto-order-book',
  template: `
    <p (click)="close()">
      crypto-order-book works!
    </p>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="FSYM">
        <th mat-header-cell *matHeaderCellDef> FSYM. </th>
        <td mat-cell *matCellDef="let element"> {{element.FSYM }} </td>
      </ng-container>
      <ng-container matColumnDef="ID">
        <th mat-header-cell *matHeaderCellDef> ID. </th>
        <td mat-cell *matCellDef="let element"> {{element.ID }} </td>
      </ng-container>
      <ng-container matColumnDef="M">
        <th mat-header-cell *matHeaderCellDef> M. </th>
        <td mat-cell *matCellDef="let element"> {{element.M }} </td>
      </ng-container>
      <ng-container matColumnDef="P">
        <th mat-header-cell *matHeaderCellDef> P. </th>
        <td mat-cell *matCellDef="let element"> {{element.P }} </td>
      </ng-container>
      <ng-container matColumnDef="Q">
        <th mat-header-cell *matHeaderCellDef> Q. </th>
        <td mat-cell *matCellDef="let element"> {{element.Q }} </td>
      </ng-container>
      <ng-container matColumnDef="RTS">
        <th mat-header-cell *matHeaderCellDef> RTS. </th>
        <td mat-cell *matCellDef="let element"> {{element.RTS }} </td>
      </ng-container>
      <ng-container matColumnDef="RTSNS">
        <th mat-header-cell *matHeaderCellDef> RTSNS. </th>
        <td mat-cell *matCellDef="let element"> {{element.RTSNS }} </td>
      </ng-container>
      <ng-container matColumnDef="TS">
        <th mat-header-cell *matHeaderCellDef> TS. </th>
        <td mat-cell *matCellDef="let element"> {{element.TS }} </td>
      </ng-container>
      <ng-container matColumnDef="TSNS">
        <th mat-header-cell *matHeaderCellDef> TSNS. </th>
        <td mat-cell *matCellDef="let element"> {{element.TSNS }} </td>
      </ng-container>
      <ng-container matColumnDef="TSYM">
        <th mat-header-cell *matHeaderCellDef> TSYM. </th>
        <td mat-cell *matCellDef="let element"> {{element.TSYM }} </td>
      </ng-container>
      <ng-container matColumnDef="TYPE">
        <th mat-header-cell *matHeaderCellDef> TYPE. </th>
        <td mat-cell *matCellDef="let element"> {{element.TYPE }} </td>
      </ng-container>
      <ng-container matColumnDef="TOTAL">
        <th mat-header-cell *matHeaderCellDef> TOTAL. </th>
        <td mat-cell *matCellDef="let element"> {{element.TOTAL}} </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    `,
  styleUrls: ['./crypto-order-book.css']
})
export class CryptoOrderBookComponent implements OnInit {
  apiKey = "a77ef3b2b6604d4e644f0062cf15499cc5f61afd2759af42772f06eb9aa6c6e4";
  ws = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=' + ${this.apiKey}`);
  window: SlideWindow<TradeStockTick> = new SlideWindow(20);
  displayedColumns = ['FSYM', 'ID', 'M', 'P', 'Q', 'RTS', 'RTSNS', 'TOTAL', 'TS', 'TSNS', 'TSYM', 'TYPE'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  constructor(
    private service: CryptoOrderBookService
  ) { }

  ngOnInit(): void {
    const elem = this;
    this.service.connect()
    this.service.socketBS.pipe(filter(resp => {
      const { TYPE = undefined } = resp as TradeStockTick || {};
      return TYPE === '0';
    })).subscribe( function(e: any) {
      elem.window.push(e)
      elem.dataSource = new MatTableDataSource(elem.window.window);
    })        
  }

  ngOnDestroy() {
    this.close();
  }

  close() {
    this.service.disconect();
  }

}
