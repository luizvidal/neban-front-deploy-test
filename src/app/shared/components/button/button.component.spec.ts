import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a primeng p-button element', () => {
    expect(
      fixture.elementRef.nativeElement.querySelector('p-button')
    ).toBeTruthy();
  });

  it('should have all necessary properties', () => {
    expect(component).toHaveProperty('label');
    expect(component).toHaveProperty('styleClass');
    expect(component).toHaveProperty('icon');
    expect(component).toHaveProperty('loadingIcon');
    expect(component).toHaveProperty('iconPos');
    expect(component).toHaveProperty('severity');
    expect(component).toHaveProperty('id');
    expect(component).toHaveProperty('rounded');
    expect(component).toHaveProperty('outlined');
    expect(component).toHaveProperty('disabled');
    expect(component).toHaveProperty('loading');
    expect(component).toHaveProperty('onClick');
  });

  it('should emit on click', () => {
    const spy = jest.spyOn(component.onClick, 'emit');
    component.onClick.emit();
    expect(spy).toHaveBeenCalled();
  });
});
