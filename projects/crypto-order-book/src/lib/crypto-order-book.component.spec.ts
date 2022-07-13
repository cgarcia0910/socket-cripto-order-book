import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoOrderBookComponent } from './crypto-order-book.component';

describe('CryptoOrderBookComponent', () => {
  let component: CryptoOrderBookComponent;
  let fixture: ComponentFixture<CryptoOrderBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoOrderBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoOrderBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
