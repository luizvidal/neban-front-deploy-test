import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Injectable, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  template: `<router-outlet />`,
  standalone: true,
  imports: [RouterOutlet],
})
class TestClassComponent {
  primengConfig = inject(PrimeNGConfig);

  configurePrimeng() {
    this.primengConfig.setTranslation({});
  }
}

@Injectable()
class TestService {}

describe('AppComponent', () => {
  let component: TestClassComponent;
  let fixture: ComponentFixture<TestClassComponent>;
  let primeNGConfig: PrimeNGConfig;
  let customerService: TestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TestClassComponent,
        HttpClientTestingModule,
      ],
      providers: [TestService],
    }).compileComponents();

    primeNGConfig = TestBed.inject(PrimeNGConfig);
    customerService = TestBed.inject(TestService);
    fixture = TestBed.createComponent(TestClassComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should configure PrimeNG correctly', () => {
    const spy = jest.spyOn(primeNGConfig, 'setTranslation');
    component.configurePrimeng();
    expect(spy).toHaveBeenCalled();
  });
});
