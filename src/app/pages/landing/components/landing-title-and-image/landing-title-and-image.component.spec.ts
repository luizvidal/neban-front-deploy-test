import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingTitleAndImageComponent } from './landing-title-and-image.component';

describe('LandingTitleAndImageComponent', () => {
  let component: LandingTitleAndImageComponent;
  let fixture: ComponentFixture<LandingTitleAndImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingTitleAndImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingTitleAndImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the template correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should display correct data', () => {
    const compiled = fixture.nativeElement;
    const items = compiled.querySelectorAll('p');
    expect(items.length).toBe(3); // Assuming there are 3 items in the data

    const expectedData = [
      'Pagamento com Pix',
      'Envio de dolar e peso argentino em minutos',
      'Empresa brasileira com atendimento em português',
    ];

    items.forEach((item: any, index: number) => {
      expect(item.textContent.trim()).toBe(expectedData[index]);
    });
  });
});
