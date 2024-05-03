import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an SVG element', () => {
    const svgElement: HTMLElement = fixture.nativeElement.querySelector('svg');
    expect(svgElement).toBeTruthy();
  });

  it('should contain a span element with text "Wallet Exchange"', () => {
    const spanElement: HTMLElement =
      fixture.nativeElement.querySelector('span');
    expect(spanElement.textContent).toContain('Wallet Exchange');
  });

  it('should have correct attributes in the SVG element', () => {
    const svgElement: HTMLElement = fixture.nativeElement.querySelector('svg');
    expect(svgElement.getAttribute('width')).toBe('20');
    expect(svgElement.getAttribute('height')).toBe('20');
    expect(svgElement.getAttribute('viewBox')).toBe('0 0 14 14');
    expect(svgElement.getAttribute('fill')).toBe('none');
  });
});
