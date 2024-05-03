import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsiveComponent } from './responsive.component';

@Component({
  template: ``,
  standalone: true,
  imports: [],
})
class TestComponet extends ResponsiveComponent {}

describe('ResponsiveComponent', () => {
  let component: ResponsiveComponent;
  let fixture: ComponentFixture<ResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponet],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isDesktop, isTablet and isMobile variables', () => {
    expect(component.isDesktop).toBeDefined();
    expect(component.isTablet).toBeDefined();
    expect(component.isMobile).toBeDefined();
  });
});
