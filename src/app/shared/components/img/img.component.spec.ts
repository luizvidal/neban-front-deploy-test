import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImgComponent } from './img.component';

describe('ImgComponent', () => {
  let component: ImgComponent;
  let fixture: ComponentFixture<ImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set src based on input', () => {
    const src = 'example.jpg';
    component._src = src;
    fixture.detectChanges();
    expect(component.src()).toContain('assets/images/example.jpg');
  });

  it('should set width and height based on input', () => {
    const width: string = '50px';
    const height: string = '50px';
    component.width = width;
    component.height = height;
    fixture.detectChanges();
    fixture.nativeElement.querySelector('img');
    expect(component.width).toEqual(width);
    expect(component.height).toEqual(height);
  });
});
