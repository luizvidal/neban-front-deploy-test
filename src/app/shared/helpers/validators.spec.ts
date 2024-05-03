import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { blankStringValidator } from './validators';

@Component({
  template: `<input [formControl]="formControl" />`,
  standalone: true,
  imports: [ReactiveFormsModule],
})
class TestComponent {
  public formControl = new FormControl('', {
    nonNullable: true,
    validators: blankStringValidator(),
  });
}

describe('blankStringValidator', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return null if there is value', () => {
    component.formControl.patchValue('test');
    expect(component.formControl.errors).toBeNull();
  });

  it('should return {blankString: true} if there is just empty string', () => {
    component.formControl.setValue('       ');
    expect(component.formControl.errors).toEqual({ blankString: true });
  });
});
