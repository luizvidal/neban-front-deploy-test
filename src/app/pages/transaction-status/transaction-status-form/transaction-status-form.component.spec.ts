import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionStatusFormComponent } from './transaction-status-form.component';

describe('TransactionStatusFormComponent', () => {
  let component: TransactionStatusFormComponent;
  let fixture: ComponentFixture<TransactionStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionStatusFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
