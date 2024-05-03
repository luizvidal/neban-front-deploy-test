import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { CustomerBankAccountService } from './customer-bank-account.service';

describe('CustomerBankAccountService', () => {
  let service: CustomerBankAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CustomerBankAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
