import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CrudService } from '@common/services/crud.service';
import { CustomerInterface } from '@core/interfaces/customer.interface';

@Injectable()
class TestClass extends CrudService<CustomerInterface> {
  constructor() {
    super('/customer');
  }
}

describe('CustomerService', () => {
  let service: CrudService<CustomerInterface>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [TestClass],
    });
    service = TestBed.inject(TestClass);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
