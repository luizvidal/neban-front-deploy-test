import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService } from 'primeng/api';
import NebanBankAccountListComponent from './neban-bank-account-list.component';

describe('NebanBankAccountListComponent', () => {
  let component: NebanBankAccountListComponent;
  let fixture: ComponentFixture<NebanBankAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NebanBankAccountListComponent,
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [ConfirmationService],
    }).compileComponents();

    fixture = TestBed.createComponent(NebanBankAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
