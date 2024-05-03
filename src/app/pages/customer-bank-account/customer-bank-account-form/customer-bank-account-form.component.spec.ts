import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import CustomerBankAccountFormComponent from './customer-bank-account-form.component';

describe('NebanBankAccountFormComponent', () => {
  let component: CustomerBankAccountFormComponent;
  let fixture: ComponentFixture<CustomerBankAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomerBankAccountFormComponent,
        RouterTestingModule,
        HttpClientModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerBankAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
