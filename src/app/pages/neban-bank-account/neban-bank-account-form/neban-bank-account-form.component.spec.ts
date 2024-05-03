import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import NebanBankAccountFormComponent from './neban-bank-account-form.component';

describe('NebanBankAccountFormComponent', () => {
  let component: NebanBankAccountFormComponent;
  let fixture: ComponentFixture<NebanBankAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NebanBankAccountFormComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NebanBankAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
