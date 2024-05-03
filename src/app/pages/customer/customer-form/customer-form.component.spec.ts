import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({ template: ``, standalone: true, imports: [] })
class TestClass {}

describe('CustomerFormComponent', () => {
  let component: TestClass;
  let fixture: ComponentFixture<TestClass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestClass],
    }).compileComponents();

    fixture = TestBed.createComponent(TestClass);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
