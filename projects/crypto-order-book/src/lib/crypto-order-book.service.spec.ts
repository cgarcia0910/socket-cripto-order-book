import { TestBed } from '@angular/core/testing';

import { CryptoOrderBookService } from './crypto-order-book.service';

describe('CryptoOrderBookService', () => {
  let service: CryptoOrderBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoOrderBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
