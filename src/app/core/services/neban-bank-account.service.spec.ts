import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { NebanBankAccountService } from './neban-bank-account.service';

describe('NebanBankAccountService', () => {
  let service: NebanBankAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(NebanBankAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
