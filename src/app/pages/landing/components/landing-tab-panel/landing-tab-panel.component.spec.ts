import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingTabPanelComponent } from './landing-tab-panel.component';

describe('LandingTabPanelComponent', () => {
  let component: LandingTabPanelComponent;
  let fixture: ComponentFixture<LandingTabPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingTabPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingTabPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
