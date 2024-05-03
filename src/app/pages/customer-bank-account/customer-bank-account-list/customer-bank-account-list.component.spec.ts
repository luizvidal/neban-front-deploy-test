import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService } from 'primeng/api';
import CustomerBankAccountListComponent from './customer-bank-account-list.component';

describe('CustomerBankAccountListComponent', () => {
  let component: CustomerBankAccountListComponent;
  let fixture: ComponentFixture<CustomerBankAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomerBankAccountListComponent,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [ConfirmationService],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerBankAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
