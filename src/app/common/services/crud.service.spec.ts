import { HttpClientModule, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { CrudService } from './crud.service';

interface TestInterface {
  id: string;
  name: string;
}

@Injectable()
class TestClass extends CrudService<TestInterface> {
  constructor() {
    super('test');
  }
}

describe('CrudService', () => {
  const apiUrl = environment.api.API_URL + '/test';
  let service: CrudService<TestInterface>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [TestClass],
    });
    service = TestBed.inject(TestClass);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to the correct URL for getAll()', () => {
    const queryParams = { page: 0, size: 10 };
    const mockData = [
      { id: 'e7894fb6-8aaf-4d20-9a22-0f3d2556802d', name: 'Item 1' },
      { id: 'bcb3650c-ca92-4666-b830-b03d6d99d948', name: 'Item 2' },
    ];

    service.getAll(queryParams).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`${apiUrl}?page=0&size=10`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockData);
  });

  it('should make a GET request to the correct URL for getOne()', () => {
    const id = 'e7894fb6-8aaf-4d20-9a22-0f3d2556802d';
    const mockData = {
      id,
      name: 'Item 1',
    };

    service.getOne(id).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${id}`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockData);
  });

  it('should make a POST request to the correct URL for create()', () => {
    const mockData = { name: 'Item 1' };
    const response = {
      id: 'e7894fb6-8aaf-4d20-9a22-0f3d2556802d',
      name: 'Item 1',
    };

    service.create(mockData).subscribe((data) => {
      expect(data).toEqual(response);
    });

    const req = httpTestingController.expectOne(apiUrl);

    expect(req.request.method).toEqual('POST');

    req.flush(response);
  });

  it('should make a PUT request to the correct URL for update()', () => {
    const id = 'e7894fb6-8aaf-4d20-9a22-0f3d2556802d';
    const mockData = { name: 'Item 1 Edited' };
    const response = {
      id: 'e7894fb6-8aaf-4d20-9a22-0f3d2556802d',
      name: 'Item 1 Edited',
    };

    service.update(mockData, id).subscribe((data) => {
      expect(data).toEqual(response);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${id}`);

    expect(req.request.method).toEqual('PUT');

    req.flush(response);
  });

  it('should make a DELETE request to the correct URL for delete()', () => {
    const id = 'e7894fb6-8aaf-4d20-9a22-0f3d2556802d';
    const response = new HttpResponse({ status: 204 });

    service.delete(id).subscribe();

    const req = httpTestingController.expectOne(`${apiUrl}/${id}`);

    expect(req.request.method).toEqual('DELETE');

    req.flush(response);
  });
});
