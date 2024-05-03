import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let confirmationService: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfirmDialogModule,
        ConfirmDialogComponent,
        NoopAnimationsModule,
      ],
      providers: [ConfirmationService],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    confirmationService = TestBed.inject(ConfirmationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all necessary properties', () => {
    expect(component).toHaveProperty('message');
    expect(component).toHaveProperty('header');
    expect(component).toHaveProperty('icon');
    expect(component).toHaveProperty('acceptButtonStyleClass');
    expect(component).toHaveProperty('rejectButtonStyleClass');
    expect(component).toHaveProperty('acceptIcon');
    expect(component).toHaveProperty('rejectIcon');
    expect(component).toHaveProperty('acceptLabel');
    expect(component).toHaveProperty('rejectLabel');
    expect(component).toHaveProperty('acceptCb');
    expect(component).toHaveProperty('rejectCb');
  });

  it('should call confirmationService.confirm when showDialog is called', () => {
    jest.spyOn(confirmationService, 'confirm');

    component.showDialog();

    expect(confirmationService.confirm).toHaveBeenCalled();
  });

  it('should call acceptCb when accept', () => {
    jest.spyOn(component, 'acceptCb');

    component.showDialog();

    fixture.detectChanges();

    const acceptButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('.p-confirm-dialog-accept')
    ).nativeNode;

    acceptButton.click();

    expect(component.acceptCb).toHaveBeenCalled();
  });

  it('should call rejectCb when reject', () => {
    jest.spyOn(component, 'rejectCb');

    component.showDialog();

    fixture.detectChanges();

    const rejectButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('.p-confirm-dialog-reject')
    ).nativeNode;

    rejectButton.click();

    expect(component.rejectCb).toHaveBeenCalled();
  });
});
